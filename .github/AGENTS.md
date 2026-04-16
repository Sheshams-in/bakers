# VS Code Agents for SheshamsBakers

Custom agents for specialized workflows in this project.

## Available Agents

### Feane Design Sync Agent
**ID**: `feane-design-sync`  
**Purpose**: Apply exact Feane template styles to SheshamsBakers pages  
**When to use**: 
- Redesigning pages with Feane's premium restaurant aesthetic
- Updating CSS to match template colors, buttons, and card designs
- Converting existing layouts to use Feane's signature half white+black card design

**Key Capabilities**:
- Extracts and applies exact Feane color palette (`#ffbe33` gold, `#222831` dark, etc.)
- Replicates button styles (gold pill-shaped, smooth hover transitions)
- Implements half-white/half-black card gradient design
- Maps Feane navbar styling to SheshamsBakers navigation
- Preserves SheshamsBakers content and branding
- Maintains responsive design and accessibility

**Design System Includes**:
- Brand colors with exact hex values
- Typography (Dancing Script + Open Sans from Google Fonts)
- Component patterns (cards, buttons, navbar, sections)
- Spacing scale (90px/75px sections)
- Transition and hover effects
- SheshamsBakers customization guidelines

**Reference Files**:
- Template source: `/sample/feane-1.0.0/` (attached in workspace)
- Implementation guidelines: [feane-design-sync.agent.md](.github/agents/feane-design-sync.agent.md)

---

## How to Use Agents

Type `/` in the chat to open the command palette, then select an agent by name to activate it for specialized guidance.
