# Repository Guidelines

## Project Structure & Module Organization

This repository is currently a blank starting point. Keep future work organized so contributors can find code quickly:

- `src/` for application source code and reusable modules.
- `public/` or `assets/` for static images, fonts, icons, and other media.
- `tests/` or colocated `*.test.*` files for automated tests.
- `docs/` for design notes, architecture decisions, and contributor references.

Avoid committing generated build output unless the deployment workflow explicitly requires it.

## Build, Test, and Development Commands

No package manifest or build scripts are committed yet. When tooling is added, expose common workflows through package scripts and keep this section updated. Recommended script names:

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm test` runs the automated test suite.
- `npm run lint` checks formatting and code quality.

If a different package manager is chosen, document the exact command, for example `pnpm install` or `bun run dev`.

## Coding Style & Naming Conventions

Use consistent, readable formatting across the project. Prefer 2-space indentation for JavaScript, TypeScript, CSS, JSON, and Markdown. Use descriptive names: `kebab-case` for file and directory names, `PascalCase` for UI components, and `camelCase` for variables and functions.

When a formatter or linter is introduced, commit its configuration and run it before opening a pull request.

## Testing Guidelines

Add tests with new functionality once a test framework is selected. Name tests after the behavior being verified, such as `contact-form.test.ts` or `pricing-section.spec.ts`. Keep tests deterministic and avoid depending on external services unless they are mocked or explicitly marked as integration tests.

## Commit & Pull Request Guidelines

This directory is not currently a Git repository, so no existing commit convention can be inferred. Use clear, conventional-style commit messages such as `feat: add landing page hero` or `fix: correct mobile navigation`.

Pull requests should include a short summary, testing notes, screenshots for visual changes, and links to related issues or tasks. Call out configuration changes, migrations, or deployment steps clearly.

## Security & Configuration Tips

Do not commit secrets, API keys, `.env` files, or private customer data. Commit a `.env.example` when environment variables are needed, and document required values without exposing real credentials.
