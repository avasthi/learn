# learn

[![video](assets/thumbnail.png)](https://www.youtube.com/watch?v=kzcI5F4tGiU)

An AI learning system, ported to **Claude Code**.

Originally created by [Amos Blomqvist](https://github.com/amosblomqvist/learn) as a [pi](https://github.com/earendil-works/pi) configuration, and explained in his video: [How I Use AI to Learn Things](https://www.youtube.com/watch?v=kzcI5F4tGiU). The teaching philosophy is his; this fork rebuilds the machinery around it for Claude Code. Shared as-is.

## What's in it

- `.claude/skills/teach/` — the philosophy and the process
- `.claude/skills/visualize/` — adds a correct, minimal diagram to a lesson when an idea is clearer as a picture
- `.claude/agents/researcher` — verifies facts before they are taught, and scopes a topic before planning
- `.claude/agents/mermaid-maker`, `.claude/agents/svg-maker` — author a diagram, render it, look at it, return verified source
- `.claude/tools/render.mjs` — renders diagram source to a PNG so a maker can check its own work

## Install

Copy `.claude/` into the project where you want to learn:

```bash
git clone https://github.com/avasthi/learn
cp -r learn/.claude your-learning-project/.claude
cd your-learning-project/.claude/tools
npm install
```

Then run Claude Code in that directory and ask to be taught something.

Everything is under `.claude/`, so it is **scoped to that project only** — the teach skill is opinionated and won't follow you into unrelated work.

## Requirements

- [Claude Code](https://claude.com/claude-code)
- **Node.js** — for the diagram renderer
- **Chrome or Edge** — already installed on most machines. The renderer drives it headlessly; it never downloads a browser and never opens a window.

Diagram rendering is optional. Without `npm install`, everything else works; you lose only the makers' ability to verify a diagram by looking at it.

## How lessons are delivered

Lessons are written to `lessons/<topic>.html` and published as a **Claude Artifact** — you get a link, and the page updates in place as the lesson continues. It renders the dependency map, diagrams, and math (as MathML) properly, which a terminal cannot.

Each page records its own Artifact URL in an HTML comment, so a lesson can span several days and keep one link.

`lessons/` is gitignored — your notes stay yours.

## Notes

The teaching skill is written for one learner. Edit `.claude/skills/teach/SKILL.md` to fit how you learn best.

### Differences from the pi original

The pi version relied on four custom extensions. Claude Code has no equivalent plug-in system, so each was replaced:

| pi extension | Replaced by |
|---|---|
| `ask-user-question` | Claude Code's built-in `AskUserQuestion` |
| `quiz` (graded, instant feedback) | `AskUserQuestion` + the teacher grading in its next message |
| `md-log` (mirror session to Obsidian) | The lesson page, published as a Claude Artifact |
| `visual-tools` (mermaid/svg render tools) | `.claude/tools/render.mjs` |

Two consequences worth knowing:

- **Obsidian is no longer needed.** Lessons are read in a browser instead, and math is MathML rather than LaTeX.
- **Quiz questions have exactly 3 options.** `AskUserQuestion` reserves a slot for free-text `Other`, which doubles as "I don't know". Fewer options per question, so the system asks more of them. Harder checks ("why", "predict") are typed answers in the chat instead — an idea added later from Jane Street's [socratic-tutor](https://github.com/janestreet/agent_skills/tree/master/socratic-tutor) skill, along with hints before answers, 0–5 levels per node, spaced review and a final test.
