import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Documentation {
  getExamples(query?: string): string;
  getWebDocs(query?: string): string;
  getFrameworks(query?: string): string;
  getServerBasics(query?: string): string;
  getClientBasics(query?: string): string;
  getBestPractices(query?: string): string;
  getProtocolDetails(query?: string): string;
  getTroubleshooting(query?: string): string;
}

class MCPDocumentation implements Documentation {
  private serverGuide: string = "";
  private clientGuide: string = "";
  private customGuide: string = "";

  async load(): Promise<void> {
    const guidesPath = join(__dirname, "..", "guides");
    
    this.serverGuide = await readFile(
      join(guidesPath, "mcp-server-development-guide.md"),
      "utf-8"
    );
    
    this.clientGuide = await readFile(
      join(guidesPath, "mcp-client-development-guide.md"),
      "utf-8"
    );
    
    this.customGuide = await readFile(
      join(guidesPath, "cyanheads-custom-mcp-llms-full.md"),
      "utf-8"
    );
  }

  private filterContent(content: string, query?: string): string {
    if (!query) return content;
    
    const lines = content.split('\n');
    const queryLower = query.toLowerCase();
    const relevantSections: string[] = [];
    let currentSection: string[] = [];
    let isRelevant = false;
    
    for (const line of lines) {
      if (line.startsWith('#')) {
        if (currentSection.length > 0 && isRelevant) {
          relevantSections.push(currentSection.join('\n'));
        }
        currentSection = [line];
        isRelevant = line.toLowerCase().includes(queryLower);
      } else {
        currentSection.push(line);
        if (line.toLowerCase().includes(queryLower)) {
          isRelevant = true;
        }
      }
    }
    
    if (currentSection.length > 0 && isRelevant) {
      relevantSections.push(currentSection.join('\n'));
    }
    
    return relevantSections.length > 0 
      ? relevantSections.join('\n\n---\n\n')
      : `No content found matching query: "${query}"`;
  }

  getExamples(query?: string): string {
    // Extract example implementations from all guides
    const sections: string[] = [];
    
    // From server guide
    const serverExamples = this.extractSections(this.serverGuide, [
      "## 8. Example Implementations",
      "### Complete TypeScript Server Example",
      "#### Example: File System Tool",
      "#### Example: Database Resource"
    ]);
    
    // From client guide
    const clientExamples = this.extractSections(this.clientGuide, [
      "### Complete Example: Multi-Tool Client with LLM Integration",
      "#### Example: OpenAI Integration",
      "#### Example: Anthropic Claude Integration"
    ]);
    
    // From custom guide
    const customExamples = this.extractSections(this.customGuide, [
      "## 12. Examples: Comprehensive Server Implementation",
      "### Complete Server Examples"
    ]);
    
    sections.push(
      "# MCP Implementation Examples\n\n",
      "## Server Examples\n",
      ...serverExamples,
      "\n## Client Examples\n",
      ...clientExamples,
      "\n## Additional Examples\n",
      ...customExamples
    );
    
    return this.filterContent(sections.join('\n'), query);
  }

  getWebDocs(query?: string): string {
    const content = [
      "# MCP Web Documentation References\n\n",
      "## Official Documentation\n",
      "- **Main Website**: [modelcontextprotocol.io](https://modelcontextprotocol.io/)\n",
      "- **Introduction**: [modelcontextprotocol.io/introduction](https://modelcontextprotocol.io/introduction)\n",
      "- **Quickstart**: [modelcontextprotocol.io/quickstart](https://modelcontextprotocol.io/quickstart)\n",
      "- **Specification**: [github.com/modelcontextprotocol/specification](https://github.com/modelcontextprotocol/specification)\n\n",
      
      "## SDK Repositories\n",
      "- **TypeScript SDK**: [github.com/modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)\n",
      "- **Python SDK**: [github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)\n",
      "- **Kotlin SDK**: [github.com/modelcontextprotocol/kotlin-sdk](https://github.com/modelcontextprotocol/kotlin-sdk)\n",
      "- **Java SDK**: [github.com/modelcontextprotocol/java-sdk](https://github.com/modelcontextprotocol/java-sdk)\n",
      "- **C# SDK**: [github.com/modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk)\n\n",
      
      "## Community Resources\n",
      "- **Discord Community**: Join the MCP Discord for discussions and support\n",
      "- **GitHub Discussions**: Check the main repository for community discussions\n",
      "- **Example Servers**: Browse the modelcontextprotocol organization for example implementations\n"
    ].join('');
    
    return this.filterContent(content, query);
  }

  getFrameworks(query?: string): string {
    const sections: string[] = [];
    
    // Extract SDK information from guides
    const sdkInfo = this.extractSections(this.customGuide, [
      "## 3. SDK Selection",
      "### TypeScript SDK",
      "### Python SDK"
    ]);
    
    // Extract transport information
    const transportInfo = this.extractSections(this.serverGuide, [
      "### Transport Mechanisms",
      "#### stdio Transport"
    ]);
    
    sections.push(
      "# MCP Frameworks and SDKs\n\n",
      "## Available SDKs\n",
      ...sdkInfo,
      "\n## Transport Layers\n",
      ...transportInfo,
      "\n## Framework Features\n",
      "- **TypeScript**: Full feature support, recommended for production\n",
      "- **Python**: Complete implementation, great for data science integrations\n",
      "- **Kotlin/Java**: Android and JVM ecosystem support\n",
      "- **C#**: .NET ecosystem integration\n"
    );
    
    return this.filterContent(sections.join('\n'), query);
  }

  getServerBasics(query?: string): string {
    const sections = this.extractSections(this.serverGuide, [
      "## 1. Introduction to MCP Servers",
      "## 2. Core Server Architecture",
      "## 3. Building Your First MCP Server (TypeScript)",
      "## 4. Exposing Capabilities"
    ]);
    
    const content = [
      "# MCP Server Development Basics\n\n",
      ...sections
    ].join('\n');
    
    return this.filterContent(content, query);
  }

  getClientBasics(query?: string): string {
    const sections = this.extractSections(this.clientGuide, [
      "## 1. Introduction to MCP Clients",
      "## 2. Core Client Architecture",
      "## 3. Building Your First MCP Client",
      "## 4. Discovering and Using Server Capabilities"
    ]);
    
    const content = [
      "# MCP Client Development Basics\n\n",
      ...sections
    ].join('\n');
    
    return this.filterContent(content, query);
  }

  getBestPractices(query?: string): string {
    const sections: string[] = [];
    
    // From server guide
    const serverBestPractices = this.extractSections(this.serverGuide, [
      "## 6. Security and Best Practices",
      "### Security Considerations",
      "### Best Practices Checklist"
    ]);
    
    // From client guide
    const clientBestPractices = this.extractSections(this.clientGuide, [
      "## 7. Security and Best Practices",
      "### Security Considerations",
      "### Best Practices for Client Development"
    ]);
    
    // From custom guide
    const generalBestPractices = this.extractSections(this.customGuide, [
      "## 14. Best Practices",
      "### Server Development Best Practices"
    ]);
    
    sections.push(
      "# MCP Development Best Practices\n\n",
      "## Server Best Practices\n",
      ...serverBestPractices,
      "\n## Client Best Practices\n",
      ...clientBestPractices,
      "\n## General Best Practices\n",
      ...generalBestPractices
    );
    
    return this.filterContent(sections.join('\n'), query);
  }

  getProtocolDetails(query?: string): string {
    const sections: string[] = [];
    
    // Extract protocol information
    const protocolBasics = this.extractSections(this.customGuide, [
      "## 2. Core Concepts & Architecture",
      "## 5. MCP Protocol Standards",
      "### Transport Layer",
      "### Message Format"
    ]);
    
    const protocolAdvanced = this.extractSections(this.serverGuide, [
      "### Protocol Fundamentals",
      "### Message Types",
      "### Request-Response Pattern"
    ]);
    
    sections.push(
      "# MCP Protocol Details\n\n",
      ...protocolBasics,
      "\n## Advanced Protocol Information\n",
      ...protocolAdvanced
    );
    
    return this.filterContent(sections.join('\n'), query);
  }

  getTroubleshooting(query?: string): string {
    const sections: string[] = [];
    
    // From server guide
    const serverTroubleshooting = this.extractSections(this.serverGuide, [
      "## 7. Troubleshooting and Resources",
      "### Common Issues and Solutions",
      "### Debugging Tips"
    ]);
    
    // From client guide  
    const clientTroubleshooting = this.extractSections(this.clientGuide, [
      "## 8. Troubleshooting and Common Issues",
      "### Debugging MCP Clients",
      "### Common Problems and Solutions"
    ]);
    
    sections.push(
      "# MCP Troubleshooting Guide\n\n",
      "## Server Troubleshooting\n",
      ...serverTroubleshooting,
      "\n## Client Troubleshooting\n",
      ...clientTroubleshooting,
      "\n## General Debugging Tips\n",
      "- Enable debug logging in your MCP implementation\n",
      "- Use the MCP inspector tools for protocol debugging\n",
      "- Check transport layer connectivity first\n",
      "- Validate message schemas match the specification\n",
      "- Ensure proper error handling throughout the stack\n"
    );
    
    return this.filterContent(sections.join('\n'), query);
  }

  private extractSections(content: string, sectionHeaders: string[]): string[] {
    const sections: string[] = [];
    
    for (const header of sectionHeaders) {
      const startIndex = content.indexOf(header);
      if (startIndex === -1) continue;
      
      let endIndex = content.length;
      const headerLevel = header.match(/^#+/)?.[0].length || 0;
      
      // Find the next section at the same or higher level
      const nextHeaderRegex = new RegExp(`^#{1,${headerLevel}} `, 'm');
      const remainingContent = content.slice(startIndex + header.length);
      const match = remainingContent.match(nextHeaderRegex);
      
      if (match) {
        endIndex = startIndex + header.length + match.index!;
      }
      
      sections.push(content.slice(startIndex, endIndex).trim());
    }
    
    return sections;
  }
}

let documentationInstance: MCPDocumentation | null = null;

export async function loadDocumentation(): Promise<Documentation> {
  if (!documentationInstance) {
    documentationInstance = new MCPDocumentation();
    await documentationInstance.load();
  }
  return documentationInstance;
}