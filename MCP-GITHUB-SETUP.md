# GitHub MCP Integration for SheshamsBakers

This project is configured with the GitHub Model Context Protocol (MCP) to enable AI agents to interact with the repository directly.

## Setup Instructions

### 1. Install MCP Server
```bash
npm install --save-dev @modelcontextprotocol/server-github
```

### 2. Set GitHub Token
Create a personal access token at https://github.com/settings/tokens with these scopes:
- `repo` (full repository access)
- `workflow` (for GitHub Actions)
- `read:org` (organization access)

Then add to your `.env` or shell environment:
```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### 3. Restart VS Code
Once the token is set and MCP is installed, restart VS Code for the extension to activate.

## Available Operations

With GitHub MCP enabled, agents can:
- ✅ Read repository files and structure
- ✅ Manage pull requests
- ✅ Manage issues
- ✅ Access GitHub Actions workflows
- ✅ Check deployment status
- ✅ Monitor GitHub Pages builds

## Configuration

The configuration is in `.vscode/settings.json` under the `modelContextProtocol.servers.github` section.

## Repository Info
- **Repository**: https://github.com/Sheshams-in/bakers
- **GitHub Pages**: https://sheshams-in.github.io/
- **Default Branch**: main
- **Deployment**: Automatic via GitHub Actions

## Usage Examples

Once MCP is set up, agents can:

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

1. **Check token**: Verify `GITHUB_TOKEN` is set in your environment
   ```bash
   echo $GITHUB_TOKEN
   ```

2. **Reinstall**: Remove node_modules and reinstall
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Check logs**: Look at VS Code's MCP server logs in the Output panel

4. **Verify permissions**: Ensure your GitHub token has the required scopes

## References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GitHub MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [Creating GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
