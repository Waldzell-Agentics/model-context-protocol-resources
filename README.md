# MCP Design Assistant Server

An MCP (Model Context Protocol) server that provides comprehensive reference information for building with MCP. This server exposes a single tool with multiple operations, each returning relevant documentation, examples, and best practices for MCP development.

## Overview

The MCP Design Assistant Server helps developers by providing quick access to:
- Implementation examples for servers and clients
- Web documentation references
- Framework and SDK information
- Server and client development basics
- Best practices and security guidelines
- Protocol details and specifications
- Troubleshooting guides

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. Build the TypeScript code:
```bash
npm run build
```

## Usage

### Running the Server

To start the MCP server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Configuring with MCP Clients

To use this server with an MCP client (like Claude Desktop), add the following to your MCP client configuration:

```json
{
  "mcpServers": {
    "mcp-design-assistant": {
      "command": "node",
      "args": ["/path/to/mcp-design-assistant-server/dist/index.js"]
    }
  }
}
```

### Using the Tool

The server exposes a single tool called `mcp-design-assistant` with the following operations:

#### 1. **examples** - Get implementation examples
```json
{
  "operation": "examples",
  "query": "optional search term"
}
```
Returns server and client implementation examples from the guides.

#### 2. **web-docs** - Get web documentation references
```json
{
  "operation": "web-docs"
}
```
Returns links to official MCP documentation, SDK repositories, and community resources.

#### 3. **frameworks** - Get framework and SDK information
```json
{
  "operation": "frameworks",
  "query": "typescript"
}
```
Returns information about available SDKs, transport layers, and framework-specific features.

#### 4. **server-basics** - Get server development fundamentals
```json
{
  "operation": "server-basics"
}
```
Returns core concepts for building MCP servers including architecture, setup, and capabilities.

#### 5. **client-basics** - Get client development fundamentals
```json
{
  "operation": "client-basics"
}
```
Returns essential information for building MCP clients and integrating with servers.

#### 6. **best-practices** - Get development best practices
```json
{
  "operation": "best-practices",
  "query": "security"
}
```
Returns security considerations and best practices for both server and client development.

#### 7. **protocol-details** - Get MCP protocol specifications
```json
{
  "operation": "protocol-details"
}
```
Returns detailed protocol information including transport layers, message formats, and standards.

#### 8. **troubleshooting** - Get debugging and troubleshooting help
```json
{
  "operation": "troubleshooting",
  "query": "connection"
}
```
Returns common issues, solutions, and debugging tips for MCP development.

## Example Usage in Claude

Once configured, you can ask Claude to use the MCP Design Assistant:

- "Show me examples of MCP server implementations"
- "What are the best practices for MCP security?"
- "How do I troubleshoot MCP connection issues?"
- "Explain the MCP protocol details"
- "Show me how to build a basic MCP client"

## Documentation Sources

This server aggregates information from the following guides in the `guides/` directory:
- `mcp-server-development-guide.md` - Comprehensive server development guide
- `mcp-client-development-guide.md` - Detailed client development guide
- `cyanheads-custom-mcp-llms-full.md` - Custom guide with practical examples

## Development

### Adding New Operations

To add new operations:
1. Add the operation name to the enum in `src/index.ts`
2. Implement the corresponding method in `src/documentation-loader.ts`
3. Add a case in the switch statement in `src/index.ts`

### Updating Documentation

The server reads documentation from the `guides/` directory. To update the information:
1. Edit the relevant guide files
2. Restart the server to load the updated content

## Future Enhancements

As mentioned, this server will be expanded with:
- More opinionated "best practices" information
- Additional example implementations
- Integration patterns and architectural guidance
- Performance optimization tips
- Testing strategies for MCP applications

## License

MIT
