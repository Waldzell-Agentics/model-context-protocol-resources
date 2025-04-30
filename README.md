# Model Context Protocol Resources & Guides

[![modelcontextprotocol.io](https://img.shields.io/badge/modelcontextprotocol.io-orange.svg)](https://modelcontextprotocol.io/)
[![MCP SDK - TypeScript](https://img.shields.io/badge/TypeScript-1.10.2-blue.svg)](https://github.com/modelcontextprotocol/typescript-sdk)
[![MCP SDK - Python](https://img.shields.io/badge/Python-1.6.0-blue.svg)](https://github.com/modelcontextprotocol/python-sdk)
[![MCP SDK - Kotlin](https://img.shields.io/badge/Kotlin-0.3.0-blue.svg)](https://github.com/modelcontextprotocol/kotlin-sdk)
[![MCP SDK - Java](https://img.shields.io/badge/Java-0.4.0-blue.svg)](https://github.com/modelcontextprotocol/java-sdk)
[![MCP SDK - C#](https://img.shields.io/badge/C%23-0.0.0-blue.svg)](https://github.com/modelcontextprotocol/csharp-sdk)
[![Guide Last Updated](https://img.shields.io/badge/Guide%20Last%20Updated-April%202025-brightgreen.svg)]()

Welcome! This repository is a collection of guides, utilities, and server implementations for the **Model Context Protocol (MCP)** that I've created as I'm learning everything MCP has to offer. It reflects ongoing exploration and development with this powerful standard for enhancing Large Language Model (LLM) Agent capabilities. Questions and feedback are welcome! 🚀

## 📋 Table of Contents

- [Introduction to MCP](#-introduction-to-mcp)
- [MCP TypeScript Template](#-mcp-typescript-template-repo)
- [MCP Guides](#-mcp-guides)
  - [MCP Client Development Guide](#mcp-client-development-guide)
  - [MCP Server Development Guide](#mcp-server-development-guide)
  - [Cyanhead's MCP 'llms.txt'](#cyanheads-mcp-llmstxt)
- [MCP Utilities](#-mcp-utilities)
- [MCP Servers](#-mcp-servers)
- [Getting Started](#-getting-started)
- [License](#-license)

## 🔍 Introduction to MCP

The **Model Context Protocol (MCP)** is an open standard designed to standardize how AI applications (clients/hosts) connect to and interact with external data sources and tools (servers). Think of it like USB-C for AI: a universal way to plug capabilities into LLM applications.

**Key Benefits:**

- **Consistent Interface**: Standardized methods for LLMs to access tools and resources.
- **Enhanced Capabilities**: Empowers LLMs to interact with databases, APIs, local systems, and more.
- **Security & Control**: Provides structured access patterns with built-in validation and clear boundaries.
- **Extensibility**: Easily add new capabilities via servers without modifying core LLM applications.
- **Modularity**: Develop and maintain specialized functionalities in isolated, reusable server components.

For a more in-depth introduction to MCP, including its design philosophy and technical details, visit the official site: [modelcontextprotocol.io](https://modelcontextprotocol.io/).

## 🚀 MCP TypeScript Template Repo

| Project                                                               | Description                                                                                                                                                                                             |
| :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**mcp-ts-template**](https://github.com/cyanheads/mcp-ts-template) | A beginner-friendly, production-ready TypeScript template for building MCP servers and clients. Includes essential utilities, examples, and type safety for a solid starting point. |

## 📚 MCP Guides

| Guide                                                                       | Description                                                                                                                                                                                             |
| :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**MCP Client Development Guide**](guides/mcp-client-development-guide.md)  | Learn how to build applications that consume MCP server capabilities. Covers core architecture, lifecycle, tools/resources, security, examples, and advanced topics.                                      |
| [**MCP Server Development Guide**](guides/mcp-server-development-guide.md)  | Learn how to create servers providing capabilities to MCP clients. Covers core architecture, building servers, exposing capabilities, advanced features, security, troubleshooting, and examples.        |
| [**Cyanhead's MCP 'llms.txt'**](guides/cyanheads-custom-mcp-llms-full.md) | A personal, condensed version of the official `llms-full.txt`, tailored for TypeScript server development workflow, focusing on building MCP servers.                                                    |
## 🔧 MCP Utilities

| Project                                                         | Description                                                                                                                                                                                   |
| :-------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**mcp-reporter**](https://github.com/cyanheads/mcp-reporter) | A streamlined utility that generates comprehensive capability reports for MCP servers. Helps developers understand available functionality across their MCP ecosystem for documentation and integration. |

## 🔌 MCP Servers

This repository hosts several example MCP server implementations, showcasing different capabilities:

| Project                                                                                               | Description                                                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**atlas-mcp-server**](https://github.com/cyanheads/atlas-mcp-server)                                 | ATLAS (Adaptive Task & Logic Automation System), a Neo4j-powered task management system designed for LLM Agents. It uses a three-tier architecture (Projects, Tasks, Knowledge) to manage complex workflows and includes Deep Research scaffolding. |
| [**filesystem-mcp-server**](https://github.com/cyanheads/filesystem-mcp-server)                       | Offers platform-agnostic file system capabilities for AI agents via MCP. Enables reading, writing, updating, and managing files/directories, featuring advanced search/replace and directory traversal.                                             |
| [**git-mcp-server**](https://github.com/cyanheads/git-mcp-server)                                     | Provides an enterprise-ready MCP interface for Git operations. Allows LLM agents to initialize, clone, branch, commit, and manage repositories via STDIO & Streamable HTTP.                                                                         |
| [**github-mcp-server**](https://github.com/cyanheads/github-mcp-server)                               | Integrates with the GitHub API via MCP, built in TypeScript. Provides a structured interface for LLM agents to manage repositories, issues, pull requests, code, files, and releases.                                                               |
| [**mcp-reporter**](https://github.com/cyanheads/mcp-reporter)                                         | A streamlined utility that generates comprehensive capability reports for MCP servers. Helps developers understand available functionality across their MCP ecosystem for documentation and integration.                                            |
| [**mcp-ts-template**](https://github.com/cyanheads/mcp-ts-template)                                   | A beginner-friendly, production-ready TypeScript template for building MCP servers and clients. Includes essential utilities, examples, and type safety for a solid starting point.                                                                 |
| [**mentor-mcp-server**](https://github.com/cyanheads/mentor-mcp-server)                               | Offers AI-powered mentorship via MCP using Deepseek-Reasoning R1 through the Deepseek API. Provides LLM agents with a 'second opinion' for code review, design critique, writing feedback, and brainstorming.                                       |
| [**model-context-protocol-resources**](https://github.com/cyanheads/model-context-protocol-resources) | Contains practical guides, clients, and servers built while exploring the Model Context Protocol (MCP). Serves as a learning resource and collection of tools developed during the exploration of this new protocol.                                |
| [**ntfy-mcp-server**](https://github.com/cyanheads/ntfy-mcp-server)                                   | Integrates with the ntfy.sh push notification service via MCP. Enables LLM agents to send highly customizable notifications to external devices.                                                                                                    |
| [**obsidian-mcp-server**](https://github.com/cyanheads/obsidian-mcp-server)                           | Enables LLMs to interact securely with Obsidian vaults via MCP. Offers token-aware tools for searching, navigating, and updating Obsidian notes, facilitating seamless knowledge base management with Properties management.                        |
| [**perplexity-mcp-server**](https://github.com/cyanheads/perplexity-mcp-server)                       | Unlocks Perplexity's search-augmented AI capabilities for LLM agents via MCP. Provides access to real-time web information with robust error handling, secure validation, and optional reasoning transparency (showThinking).                       |
| [**toolkit-mcp-server**](https://github.com/cyanheads/toolkit-mcp-server)                             | Provides essential system utilities and tools for LLM agents via MCP, including IP geolocation, network diagnostics, system monitoring, cryptographic operations, and QR code generation.                                                           |

## 🚀 Getting Started

1.  **Explore the Guides**: Understand MCP concepts and development approaches using the [Client](guides/mcp-client-development-guide.md) and [Server](guides/mcp-server-development-guide.md) guides.
2.  **Select a Server**: Choose one relevant to your needs from the [MCP Servers](#-mcp-servers) section and follow its specific setup instructions in its repository.
3.  **Connect a Client**: Use an existing MCP-compatible client (like Claude Desktop, Cline, etc.) or build your own using the [Client Development Guide](guides/mcp-client-development-guide.md).
4.  **Experiment & Contribute**: Try out the tools and consider contributing via issues or pull requests on the respective project repositories.

## 📄 License

[![Apache 2.0 License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This project and its components are licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details, and check individual component repositories for any specific licensing nuances.

---

<div align="center">
Created by <a href="https://github.com/cyanheads">cyanheads</a> with the Model Context Protocol
</div>
