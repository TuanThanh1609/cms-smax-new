const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PAGE_NAME = 'all-in-one';
const KEY_PREFIX = 'automation-map';

function loadCatalog(rootDir) {
  const source = fs.readFileSync(path.join(rootDir, 'all-in-one-features.js'), 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: 'all-in-one-features.js' });
  return JSON.parse(JSON.stringify(sandbox.window.SMAX_FEATURES));
}

function groupKey(groupId, field) {
  return `${KEY_PREFIX}-group-${groupId}-${field}`;
}

function featureKey(featureId, field) {
  return `${KEY_PREFIX}-feature-${featureId}-${field}`;
}

function cardKey(featureId, cardIndex, field) {
  return `${KEY_PREFIX}-feature-${featureId}-card-${String(cardIndex + 1).padStart(2, '0')}-${field}`;
}

function fieldDefinitions(catalog) {
  const sections = [];

  catalog.groups.forEach((group, groupIndex) => {
    sections.push({
      title: `Nhóm ${String(groupIndex + 1).padStart(2, '0')} · ${group.title} · Giới thiệu`,
      fields: [
        { key: groupKey(group.id, 'title'), label: 'Tên nhóm tính năng', type: 'text', value: group.title },
        { key: groupKey(group.id, 'promise'), label: 'Thông điệp nổi bật', type: 'text', value: group.promise },
        { key: groupKey(group.id, 'description'), label: 'Mô tả nhóm', type: 'text', value: group.description },
        { key: groupKey(group.id, 'img'), label: 'Hình minh họa nhóm', type: 'image', value: group.hero }
      ]
    });

    group.features.forEach((feature, featureIndex) => {
      const fields = [
        { key: featureKey(feature.id, 'title'), label: 'Tên tính năng', type: 'text', value: feature.title },
        { key: featureKey(feature.id, 'headline'), label: 'Tiêu đề giới thiệu', type: 'text', value: feature.headline },
        { key: featureKey(feature.id, 'description'), label: 'Mô tả tính năng', type: 'text', value: feature.description }
      ];

      feature.cards.forEach((card, cardIndex) => {
        const number = String(cardIndex + 1).padStart(2, '0');
        fields.push(
          { key: cardKey(feature.id, cardIndex, 'title'), label: `Nội dung ${number} · Tiêu đề`, type: 'text', value: card.title },
          { key: cardKey(feature.id, cardIndex, 'description'), label: `Nội dung ${number} · Mô tả`, type: 'text', value: card.description },
          { key: cardKey(feature.id, cardIndex, 'img'), label: `Nội dung ${number} · Hình minh họa`, type: 'image', value: card.image }
        );
      });

      sections.push({
        title: `${String(groupIndex + 1).padStart(2, '0')}.${String(featureIndex + 1).padStart(2, '0')} · ${feature.title}`,
        fields
      });
    });
  });

  return sections;
}

function collectCatalogRows(catalog) {
  return fieldDefinitions(catalog).flatMap((section) => section.fields.map((field) => ({
    page_name: PAGE_NAME,
    content_key: field.key,
    content_value: field.value
  })));
}

function applyContentMap(catalog, contentMap = {}) {
  const result = JSON.parse(JSON.stringify(catalog));
  const valueFor = (key, fallback) => contentMap[key] !== undefined ? contentMap[key] : fallback;

  result.groups.forEach((group) => {
    group.title = valueFor(groupKey(group.id, 'title'), group.title);
    group.promise = valueFor(groupKey(group.id, 'promise'), group.promise);
    group.description = valueFor(groupKey(group.id, 'description'), group.description);
    group.hero = valueFor(groupKey(group.id, 'img'), group.hero);

    group.features.forEach((feature) => {
      feature.title = valueFor(featureKey(feature.id, 'title'), feature.title);
      feature.headline = valueFor(featureKey(feature.id, 'headline'), feature.headline);
      feature.description = valueFor(featureKey(feature.id, 'description'), feature.description);
      feature.cards.forEach((card, cardIndex) => {
        card.title = valueFor(cardKey(feature.id, cardIndex, 'title'), card.title);
        card.description = valueFor(cardKey(feature.id, cardIndex, 'description'), card.description);
        card.image = valueFor(cardKey(feature.id, cardIndex, 'img'), card.image);
      });
    });
  });

  return result;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildRegistryHtml(catalog) {
  return `\n<div class="automation-map-cms-registry" hidden aria-hidden="true">\n${fieldDefinitions(catalog).map((section) => `  <section>\n    <h3>${escapeHtml(section.title)}</h3>\n${section.fields.map((field) => field.type === 'image'
    ? `    <img data-cms-img="${escapeHtml(field.key)}" data-cms-label="${escapeHtml(field.label)}" src="${escapeHtml(field.value)}" alt="">`
    : `    <p data-cms="${escapeHtml(field.key)}" data-cms-label="${escapeHtml(field.label)}">${escapeHtml(field.value)}</p>`).join('\n')}\n  </section>`).join('\n')}\n</div>`;
}

module.exports = {
  PAGE_NAME,
  loadCatalog,
  collectCatalogRows,
  applyContentMap,
  buildRegistryHtml
};
