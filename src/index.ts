#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { loadDocumentation } from "./documentation-loader.js";

// Define the schema for the mcp-design-assistant tool
const MCPDesignAssistantSchema = z.object({
  operation: z.enum([
    "examples",
    "web-docs", 
    "frameworks",
    "server-basics",
    "client-basics",
    "best-practices",
    "protocol-details",
    "troubleshooting"
  ]).describe("The type of MCP documentation to retrieve"),
  query: z.string().optional().describe("Optional search query to filter the documentation")
});

// Create the MCP server instance
const server = new Server(
  {
    name: "mcp-design-assistant",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definition
const mcpDesignAssistantTool: Tool = {
  name: "mcp-design-assistant",
  description: "Access comprehensive MCP development documentation, examples, and best practices. This tool provides curated information from MCP guides to help you build MCP servers and clients effectively.",
  inputSchema: {
    type: "object",
    properties: {
      operation: {
        type: "string",
        enum: [
          "examples",
          "web-docs",
          "frameworks",
          "server-basics",
          "client-basics", 
          "best-practices",
          "protocol-details",
          "troubleshooting"
        ],
        description: "The type of MCP documentation to retrieve"
      },
      query: {
        type: "string",
        description: "Optional search query to filter the documentation"
      }
    },
    required: ["operation"]
  }
};

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [mcpDesignAssistantTool],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "mcp-design-assistant") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  try {
    const args = MCPDesignAssistantSchema.parse(request.params.arguments);
    const documentation = await loadDocumentation();
    
    let content: string;

    switch (args.operation) {
      case "examples":
        content = documentation.getExamples(args.query);
        break;
      case "web-docs":
        content = documentation.getWebDocs(args.query);
        break;
      case "frameworks":
        content = documentation.getFrameworks(args.query);
        break;
      case "server-basics":
        content = documentation.getServerBasics(args.query);
        break;
      case "client-basics":
        content = documentation.getClientBasics(args.query);
        break;
      case "best-practices":
        content = documentation.getBestPractices(args.query);
        break;
      case "protocol-details":
        content = documentation.getProtocolDetails(args.query);
        break;
      case "troubleshooting":
        content = documentation.getTroubleshooting(args.query);
        break;
      default:
        throw new Error(`Unknown operation: ${args.operation}`);
    }

    return {
      content: [
        {
          type: "text",
          text: content,
        },
      ],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid arguments: ${error.errors.map(e => e.message).join(", ")}`);
    }
    throw error;
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Design Assistant Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});