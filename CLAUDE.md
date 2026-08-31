# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal AI **teaching system**, not an application. There is nothing to build, serve, or unit-test. The deliverable is the configuration itself: a skill that encodes a teaching philosophy, subagents it delegates to, and one Node script that renders diagrams.

Originally built by Amos Blomqvist as a [pi](https://github.com/earendil-works/pi) configuration ([video](https://www.youtube.com/watch?v=kzcI5F4tGiU)); ported to Claude Code. The pi extensions it used (`ask-user-question`, `quiz`, `md-log`, `visual-tools`) had no Claude Code equivalent and were deleted — each is now served by a native tool plus instructions in a skill. Understanding *that* substitution is the key to understanding the repo.

**`origin` is `amosblomqvist/learn` — the original author's repository, not ours. Never push to it.**

## Commands

```bash
# One-time: install the diagram renderer's dependencies.
# `npm install --prefix .claude/tools` looks like the right form but fails on
# this machine (npm hunts for a package.json at the repo root instead) —
# cd into the directory first.
cd .claude/tools && npm install

# Render a diagram to PNG (this is what the maker subagents call)
node .claude/tools/render.mjs mermaid <source.mmd> <out.png>
node .claude/tools/render.mjs svg     <source.svg> <out.png>
```

`render.mjs` prints the output path on success and exits non-zero with the render error on failure. It drives the Chrome or Edge already installed on the machine via `puppeteer-core` — it never downloads a browser, and it never opens a window.

Verify a change to it by rendering a source file and then `Read`ing the PNG — `Read` displays images, which is exactly how the subagents check their own work.

## Architecture

Everything lives under `.claude/`, which makes it **project-scoped**: these skills and agents load only when Claude Code runs in this directory (or a parent). That scoping is deliberate — the teach skill is opinionated and should not follow the user into unrelated projects.

```
.claude/skills/teach/       the philosophy and the session process
.claude/skills/visualize/   when a picture is worth it, and how to get a correct one
.claude/agents/researcher   fact verification and topic scoping (WebSearch/WebFetch)
.claude/agents/*-maker      author a diagram, render it, look at it, return source
.claude/tools/render.mjs    source -> PNG, for the makers' verification loop
lessons/                    generated lesson pages (gitignored)
```

### How the pieces fit

`teach` is the entry point and runs in the main session. It drives a three-phase session — **probe → plan → teach** — and delegates outward:

- **Facts it isn't certain of** → `researcher` subagent, before saying them aloud. The skill treats an unverified claim as worse than a slow answer, because a wrong foundation corrupts every node built on it.
- **Diagrams** → `visualize` skill, which dispatches a `mermaid-maker` or `svg-maker` subagent.
- **Questions** → `AskUserQuestion`.
- **The readable lesson** → an `Artifact`.

Both maker subagents follow the same loop: write source → render to PNG → `Read` the PNG to actually look at it → iterate → return **source text**, never an image. Source is what ships because the lesson page renders Mermaid and inline SVG natively, keeping the page self-contained.

### Three constraints that are easy to break

These are load-bearing, and each replaces something the deleted pi extensions used to enforce in code:

1. **Graded questions get exactly 3 real options — never 4.** `AskUserQuestion` appends its own free-text `Other` entry, and a 4th real option silently destroys it. `Other` is also the learner's only way to say "I don't know", which the system treats as a valuable located gap rather than a wrong answer. A 4th option therefore removes both the escape hatch and an honest-uncertainty signal at once.
2. **The main session grades its own questions.** There is no grading tool, so the skill's guards (rotate the correct slot; state the correct option verbatim before the verdict) are the only checks that exist. They read like style advice and are not.
3. **A lesson page's Artifact URL must be carried across sessions.** Re-publishing the same file path holds the URL only *within* one session. Because lessons legitimately span days, each page stores its own URL in an HTML comment in `<head>`, and later publishes must pass it as the tool's `url`. Skip this and the learner silently gets a second, divergent page.

### Diagram scratch files

Maker subagents are given a scratch directory in their brief and must write working files there, never into the repo. `lessons/` is gitignored; nothing else generated should reach the working tree.

## Editing the skills

`.claude/skills/teach/SKILL.md` is the heart of the system and is written as instructions to a teacher, in the second person. Two things about it are intentional and should survive edits:

- **The philosophy sections are not preamble.** The process only makes sense as a way of building a dependency graph in the learner's head, and edits that trim the "why" tend to produce a checklist that no longer produces understanding.
- **The tool-mechanics prose is a port, not a description of a stable API.** Where it explains *why* a rule exists (what the old graded-quiz tool used to guarantee), keep that reasoning — it is what lets a future editor tell a real constraint from an arbitrary one.

The skill's `description` deliberately does **not** trigger on every passing explanation; it fires when the user asks to be taught something. Widening it makes the skill fire during ordinary coding work.
