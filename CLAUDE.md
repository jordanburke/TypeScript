# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo containing four TypeScript libraries:

- **nestjs-config-zod-validation**: A Zod validation shim for NestJS ConfigService
- **node-server-ssh**: A Node.js SSH server for debugging and interaction
- **sharepoint-graph-api**: A SharePoint API wrapper over Microsoft Graph API
- **npx-env**: Cross-platform command runner that ensures system environment variables are passed to child processes

## Development Commands

All projects use `pnpm` as the package manager and follow consistent script patterns:

### Build Commands
- `pnpm build:dev` - Development build with watch mode
- `pnpm build:prod` - Production build for publishing
- `pnpm build:watch` - Watch mode build
- `pnpm build:publish` - Build and publish to npm

### Development Commands
- `pnpm start` - Start development server (node-server-ssh only)
- `pnpm ts-types` - Type checking with TypeScript compiler

### Code Quality
- `pnpm lint` - Run linting and formatting (combines lint:format and lint:fix)
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm lint:format` - Format code with Prettier

### Testing
- `pnpm test` - Run Jest tests (nestjs-config-zod-validation and sharepoint-graph-api)
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage

### Project-Specific Commands
- To run a specific project: `cd <project-name> && pnpm <command>`
- To run tests for a single project: `cd <project-name> && pnpm test`

## Key Dependencies

- **functype**: Functional programming utilities (used in node-server-ssh)
- **Zod**: Schema validation (nestjs-config-zod-validation)
- **ssh2**: SSH server implementation (node-server-ssh)
- **Microsoft Graph**: SharePoint integration (sharepoint-graph-api)

## Environment Variables

For sharepoint-graph-api:
```
MS_APP_TENANT_ID
MS_APP_CLIENT_ID  
MS_APP_SECRET
```

## Build Configuration

All projects use:
- **tsup** for bundling with dual ESM/CommonJS output
- **TypeScript 5.8+** with strict mode
- **ESLint + Prettier** for code quality
- **Jest** for testing (where applicable)

## Important Notes

- This is a monorepo - navigate to individual project directories to run project-specific commands
- All projects follow consistent naming conventions and build patterns
- The `node-server-ssh` project has a `start` script for development with auto-restart
- Only `nestjs-config-zod-validation` and `sharepoint-graph-api` have test suites