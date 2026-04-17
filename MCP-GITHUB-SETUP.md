# GitHub MCP Integration for SheshamsBakers

This project is configured with the official GitHub Model Context Protocol (MCP) to enable AI agents to interact with the repository directly.

## Setup Instructions

### 1. Create a GitHub Personal Access Token
Create a personal access token at https://github.com/settings/tokens with these scopes:
- `repo` (full repository access)
- `workflow` (for GitHub Actions)
- `read:org` (organization access)

**Important**: Copy the token immediately after creation (you won't be able to see it again).

### 2. Authenticate with VS Code
When you open this workspace in VS Code:
1. The MCP will prompt you for the GitHub Personal Access Token
2. Paste your token into the secure input when prompted
3. VS Code will store it securely in your keychain

Alternatively, you can provide it when Copilot requests GitHub access.

### 3. Ready to Use
No installation needed! The official GitHub MCP API is used via HTTP endpoint.

## Available Operations

With GitHub MCP enabled, agents can:
- ✅ Read repository files and structure
- ✅ Manage pull requests
- ✅ Manage issues
- ✅ Access GitHub Actions workflows
- ✅ Check deployment status
- ✅ Monitor GitHub Pages builds

## Configuration

The configuration is in `.vscode/settings.json` under `modelContextProtocol.servers.github`:

```json
{
  "modelContextProtocol": {
    "servers": {
      "github": {
        "type": "http",
        "url": "https://api.githubcopilot.com/mcp/",
        "headers": {
          "Authorization": "Bearer ${input:github_mcp_pat}"
        }
      }
    },
    "inputs": [
      {
        "type": "promptString",
        "id": "github_mcp_pat",
        "description": "GitHub Personal Access Token",
        "password": true
      }
    ]
  }
}
```

## Repository Info
- **Repository**: https://github.com/Sheshams-in/bakers
- **GitHub Pages**: https://sheshams-in.github.io/
- **Default Branch**: main
- **Deployment**: Automatic via GitHub Actions

## Usage Examples

Once MCP is authenticated, agents can:

### Check deployment status
- "What's the status of my GitHub Pages deployment?"
- "Are there any GitHub Actions failures?"

### Manage issues and PRs
- "Create an issue about..."
- "Check if there are any open pull requests"

### Monitor workflows
- "Show me the latest workflow run"
- "Did the build and deploy action succeed?"

## Troubleshooting

If the GitHub MCP isn't working:

1. **Token not set**: When opening the workspace, look for a prompt asking for your GitHub token
   - If you miss it, try running a command that needs GitHub access

2. **Check token scopes**: Make sure your token has the required permissions
   - Go to https://github.com/settings/tokens and verify scopes

3. **Regenerate token**: If the token isn't working
   - Delete the old token at https://github.com/settings/tokens
   - Create a new one with the required scopes

4. **Restart VS Code**: If you add a new token, restart VS Code

## References

- [Official GitHub MCP Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-in-vs-code)
- [Creating GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Model Context Protocol](https://modelcontextprotocol.io/)
