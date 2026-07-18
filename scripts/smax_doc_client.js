const https = require('https');
const url = require('url');

const targetUrl = 'https://smax.lhq.app/mcp';
const parsedUrl = url.parse(targetUrl);

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log(`
Smax Doc MCP Client CLI
Usage:
  node smax_doc_client.js search <query>
  node smax_doc_client.js get <docId>
  node smax_doc_client.js list-collections
  node smax_doc_client.js list-docs [collectionId]
`);
  process.exit(0);
}

// Map CLI commands to MCP tools
let toolName = '';
let toolArgs = {};

switch (command) {
  case 'search':
    toolName = 'outline_search';
    toolArgs = { query: args.slice(1).join(' ') };
    break;
  case 'get':
    toolName = 'outline_export_document';
    toolArgs = { id: args[1] };
    break;
  case 'list-collections':
    toolName = 'outline_list_collections';
    toolArgs = {};
    break;
  case 'list-docs':
    toolName = 'outline_list_documents';
    if (args[1]) {
      toolArgs.collectionId = args[1];
    }
    break;
  default:
    console.error('Unknown command:', command);
    process.exit(1);
}

// Perform direct HTTP POST MCP sequence
const initPayload = JSON.stringify({
  jsonrpc: '2.0',
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'smax-doc-cli', version: '1.0.0' }
  },
  id: 1
});

postRequest(initPayload, {}, (initStatus, initHeaders, initBody) => {
  const sessionId = initHeaders['mcp-session-id'];
  if (!sessionId) {
    console.error('Failed to initialize session');
    process.exit(1);
  }

  // Send the actual tools/call request
  const requestPayload = JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: toolArgs
    },
    id: 2
  });

  postRequest(requestPayload, { 'mcp-session-id': sessionId }, (status, headers, body) => {
    try {
      const response = JSON.parse(body);
      if (response.error) {
        console.error('MCP Error:', response.error);
        process.exit(1);
      }
      
      // Beautiful printing based on command
      const result = response.result;
      
      // MCP tools/call returns an array of content blocks
      if (result.content && Array.isArray(result.content)) {
        result.content.forEach(item => {
          if (item.type === 'text') {
            try {
              // Try parsing collection/document lists if they are returned as JSON strings
              const parsedResult = JSON.parse(item.text);
              if (command === 'list-collections' && parsedResult.collections) {
                console.log('\n=== COLLECTIONS ===');
                parsedResult.collections.forEach(c => {
                  console.log(`- [${c.id}] ${c.name} (${c.description || 'No description'})`);
                });
              } else if (command === 'list-docs' && parsedResult.documents) {
                console.log('\n=== DOCUMENTS ===');
                parsedResult.documents.forEach(d => {
                  console.log(`- [${d.id}] ${d.title} (Slug: ${d.urlId})`);
                });
              } else {
                console.log(item.text);
              }
            } catch (e) {
              console.log(item.text);
            }
          } else {
            console.log(JSON.stringify(item, null, 2));
          }
        });
      } else {
        console.log(JSON.stringify(result, null, 2));
      }
      process.exit(0);

    } catch (e) {
      console.error('Failed to parse response:', e.message);
      console.log('Raw body:', body);
      process.exit(1);
    }
  });
});

function postRequest(payload, headers, callback) {
  const postOptions = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.path,
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/event-stream',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      ...headers
    }
  };

  const req = https.request(postOptions, (res) => {
    let body = '';
    res.on('data', (chunk) => {
      body += chunk.toString('utf8');
    });
    res.on('end', () => {
      callback(res.statusCode, res.headers, body);
    });
  });

  req.on('error', (e) => {
    console.error('POST Error:', e.message);
    process.exit(1);
  });

  req.write(payload);
  req.end();
}
