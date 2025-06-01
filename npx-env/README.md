# npx-env

A cross-platform command runner that ensures system environment variables are properly passed to child processes, including `npx` commands.

## The Problem

Sometimes `npx` and other commands don't pick up system environment variables properly, especially in different execution contexts or CI/CD environments. This tool ensures all your system environment variables are explicitly passed through.

## Features

- 🌍 Cross-platform support (Windows, macOS, Linux)
- 🔄 Passes through all system environment variables
- 🚀 Works seamlessly with `npx` commands
- 🔧 Simple CLI interface
- 💼 No configuration required

## Installation

```bash
# Global installation
npm install -g npx-env

# Or use with npx (no installation required)
npx npx-env node server.js
```

## Usage

### Basic Usage

```bash
npx-env [options] <command> [args...]
```

### Options

- `-v, --verbose` - Show environment variables being passed
- `-h, --help` - Show help message

### Examples

```bash
# Basic usage - passes all system env vars
npx-env node server.js

# Use with npx commands
npx-env npx -y @modelcontextprotocol/server-memory

# Verbose mode to see what env vars are passed
npx-env -v npm start

# Complex commands with arguments
npx-env npx jest --watch --verbose
```

## Use Case: MCP Server Configuration

This package was specifically designed to solve issues with environment variables in MCP server configurations:

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx-env",
      "args": [
        "npx",
        "-y",
        "@modelcontextprotocol/server-memory"
      ]
    }
  }
}
```

Your system environment variable `MEMORY_FILE_PATH` will now be available to the npx command.

## Setting System Environment Variables

### Windows
```cmd
# Command Prompt
set MEMORY_FILE_PATH=C:\path\to\memory.json

# PowerShell
$env:MEMORY_FILE_PATH="C:\path\to\memory.json"
```

### macOS/Linux
```bash
export MEMORY_FILE_PATH=/path/to/memory.json
```

## Why npx-env?

- **Environment Issues**: Solves cases where `npx` doesn't pick up system environment variables
- **Cross-Platform**: Works consistently across Windows, macOS, and Linux
- **NPX Compatibility**: Specifically tested to work with `npx` commands
- **Zero Config**: No configuration files needed - uses your existing system environment

## Development

```bash
# Install dependencies
pnpm install

# Build for development
pnpm build:dev

# Run tests
pnpm test

# Build for production
pnpm build:prod
```

## License

MIT