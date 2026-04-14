---
name: sheshams-bakers-workspace
description: "Workspace instructions for SheshamsBakers bakery website project. Routes all requests through the specialized project agent for consistent context and high-quality implementation."
---

# SheshamsBakers Workspace Instructions

This is the workspace for the **SheshamsBakers professional bakery website project**. All requests should be handled by the specialized **sheshams-bakers agent** which has full context of the implementation plan, tech stack, and architecture.

## Agent Routing

When you ask any question or request any task related to this repo:
- **Automatically routed to**: `sheshams-bakers` agent via `applyTo` patterns
- **Manual invocation**: Type `/sheshams-bakers` to explicitly invoke the specialized agent
- **Scope**: All phases (1-7), all file types (11ty, GitHub Actions, n8n, CSS, JS, Markdown)

## Project Overview

- **What**: Professional portfolio website for Sheshams Bakers
- **Hosting**: GitHub Pages (free)
- **Tech**: 11ty + GitHub Actions + n8n + Formspree
- **Status**: In active implementation
- **Timeline**: 13-19 hours to completion

## Available Resources

- **Complete Plan**: `.github/SHESHAMS_PLAN.md` (all 7 phases with detailed checklists)
- **Agent Details**: `.github/agents/sheshams-bakers.agent.md`
- **Templates**: `_includes/` (11ty Nunjucks)
- **Config**: `.eleventy.js`, `.github/workflows/sync-instagram.yml`
- **Content**: `pages/` (Markdown pages), `assets/` (CSS/JS)

## Quick Start

1. **See the plan**: Read `.github/SHESHAMS_PLAN.md` for all phases and tasks
2. **Start implementing**: Type "Phase 1", "Phase 2", etc. or describe what you want to build
3. **Ask for help**: Questions about GitHub Actions? Instagram sync? Gallery features? Just ask—the agent has full context

## When to Use This Agent

✅ **Always use for**:
- Implementing website features (11ty templates, CSS, JavaScript)
- Setting up GitHub Actions workflows
- Creating or debugging n8n tagging workflows
- Building the gallery with filters and search
- Contact form integration
- Performance optimization
- Responsive design issues
- Any file in `.github/`, `_includes/`, `pages/`, `assets/`

❌ **Don't use for**:
- General coding questions unrelated to this project
- Random debugging of external tools
- Non-project tasks

## Key Project Details

**Cake Categories** (all posts must be tagged with one):
- Birthday, Cupcakes, Tresletches, Fondant, Speciality, Whipped Cream, Butter cream

**Instagram Posts to Sync**: 104 existing + new daily

**Data Source**: Instagram Business Account (@sheshams_bakers)

**Contact Methods**: Form (Formspree) + WhatsApp CTA

**Tech Stack**:
- 11ty (static generation)
- GitHub Actions (daily sync)
- n8n (manual tagging)
- Fuse.js (client-side search)
- FormSpree (contact form)

---

All future questions about this project will be intelligently routed to the specialized agent. Happy building! 🚀🎂
