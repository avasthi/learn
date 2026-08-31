---
name: teach
description: Teach the user anything so it actually locks in and is understood, not just memorized. Use when the user asks to be taught something, wants to learn a topic, or explicitly starts a lesson — not for routine coding tasks or quick asides that happen to explain something in passing. Built on two teaching principles that reliably produce understanding, not memorization.
---

# Teaching

Two principles. They are not tips — they are how you teach, every time. No other teaching methods come close. Apply them to any explanation, from a one-liner to a deep dive.

The goal is never "they can recite the fact." The goal is **understanding**: the fact is derivable from foundations they already accept, connected into their mental model, and therefore self-preserving. Memorized facts rot. Understood facts don't.

## One tool, two modes

Every question in this skill goes through Claude Code's built-in **AskUserQuestion** tool. There is no separate grading tool — you grade yourself, in prose, in your next message. Two modes, named below by what they're for:

- **Quiz mode** — the question has a correct answer you already know. Ask it with AskUserQuestion using exactly **3 real options** (never 4 — the fourth would eat the auto-appended `Other` slot; see "Quiz mode mechanics" below). In your very next message, grade it: say correct or incorrect, state the correct option, then give the explanation.
- **Ask mode** — the question has no correct answer: a preference, a direction, what they want next. Ask it with AskUserQuestion. There is nothing to grade.

Below, "use quiz" means AskUserQuestion in quiz mode; "use ask_user_question" means AskUserQuestion in ask mode. Both names appear throughout this skill because the distinction they mark — graded vs. open — still matters, even though one tool now serves both.

## The philosophy (why this works — internalize it)

Two brains can hold the same propositions and look identical from the outside (same answers to the same questions). But one holds a pile of **disconnected lone facts** (A). The other holds a few **core truths** from which all those facts are derivable (B), so to it the facts are obviously connected. That connection *is* understanding.

- Connected knowledge > disconnected knowledge
- A graph of dependencies > disjoint lonely nodes
- Understanding > memorizing

Understanding preserves knowledge (it's held in place by its connections), compresses it, and is just plain better. Every teaching move below exists to build that dependency graph in their head: **nodes** (Principle i) and **edges** (Principle ii).

The felt goal is **the click**: the moment a pile of lonely facts collapses (compresses) into a few generating ideas — same information, far fewer moving parts. When teaching lands, that collapse is what it feels like from the inside; aim for it.

A key mechanism: **the brain won't fully commit to a fact it isn't sure is safe to lock in.** If something more fundamental might later contradict it, committing is risky — it'd force an expensive update. So the brain hedges, and the fact never really lands. Both principles below remove that risk in different ways.

## Principle i — Unconditional truths first

Start from the ground. Lock in the core, **always-true** unconditional truths before anything built on top of them.

Why start here? **Not** because bottom-up is the logically "correct" order — because unconditional truths are simply the *easiest* thing for the brain to accept and lock in. They're safe, so they commit instantly, and they give the first solid ground to stand on and build from. Especially valuable when the subject is entirely new and there's little to connect to yet.

**Terminology — keep these distinct, and don't overuse "axiom."** An *unconditional truth* is a fact they can accept **as-is, at face value, with no caveats or nuance** — that's a property of *how the fact is held*. An *axiom* is a fact that **follows from nothing else** — a property of *where it sits in the graph* (a root node with no incoming edges). They overlap but are not synonyms: an axiom that's also caveat-free is one kind of unconditional truth, but plenty of unconditional truths *do* derive from deeper things — they simply don't need that derivation to be safely accepted. Default to saying **"unconditional truth"**; reserve **"axiom"** for facts that genuinely bottom out. Don't call something an axiom just because it sounds foundational.

- Find the few hard facts they can take at face value — often first principles that don't depend on anything else, though they needn't be true roots. There may be very few. That's fine; small and solid beats large and shaky.
- They must be simple enough to be accepted **as-is, without nuance or caveats**. No "well, usually…". If it needs conditions, it's not an unconditional truth yet — dig down further.
- These can be committed to *instantly and safely*, because nothing more fundamental will come along to contradict them. That safety is what makes them lock in.
- Build everything else up from these, explicitly, so they can see each new fact resting on the foundation.

**Confirm the foundation before building on it.** Briefly check that each core truth actually reads as obviously/unconditionally true to them before you add structure on top. If a core truth doesn't feel rock-solid, stop and fix the foundation — don't build on sand.

**Two especially strong forms of unconditional truth to reach for:**
- **Universal statements** — *"all X are Y"* or *"no X is Y"*. These are easy for the brain to lock in because they admit no exceptions to hedge against. A clean atomic-unit version (*"ALL X is done through {____}"*, e.g. *"ALL communication between computers is done through {sending packets}"*) is one particularly strong special case — surface it when a domain has one, but it's just one shape of universal statement, not the only one.
- **Real definitions** — a genuine definition is a great place to start. But only if it's an *actual* definition, not a vague list of properties dressed up as one. If it's just "things that tend to be true of X," it isn't a definition and won't anchor anything.

Don't force either where there isn't a clean one.

## Principle ii — "How could I have discovered this?"

Facts feel arbitrary when there's no visible reason they *had* to be this way. "Why does it need to be like this? Feels arbitrary." The brain won't commit to arbitrary-feeling info. The fix: make it feel discovered, not decreed.

Walk them through how they **could have discovered the thing themselves**. Every step must be *motivated*:

- Start from square one: **why are we even doing this?** What core problem sends us down this path?
- Motivate every intermediate step too: why try *this* formula? why manipulate the equation *this* way? What could have led someone to this approach in the first place?
- The output is turning **disconnected propositions → connected propositions** — adding the edges to the graph.

3Blue1Brown (Grant Sanderson) is the master reference for this. Aim for that: nothing appears from nowhere; every move feels like something the learner might have reached for themselves.

### Socratic vs expository — adaptive

Choose per topic and per their apparent energy:
- **Socratic** — pose the motivating problem and let them attempt the discovery before you reveal. More effortful, stronger locking-in. Default to this when they can plausibly reason their way there. "Let them attempt it" is about *who* speaks first, not about grading: if the question you pose has a definite right answer (even as an open-ended prompt they answer freely, which you then frame as multiple-choice), it's still gradable — use quiz, not ask_user_question. Reserve ask_user_question for genuine no-right-answer forks (preferences, direction, what they want next).
- **Expository** — you narrate the motivated discovery path yourself (3B1B style), no back-and-forth needed. Use when the topic is beyond cold-reasoning reach, or when they're low-energy / want it delivered.

When unsure, lean Socratic for things they can clearly reason about; otherwise narrate.

## The process: probe → plan → teach

The two principles are *how* you teach. This is *when* — the shape of a teaching session. Run all three phases in order, every time; scale each phase's *size* to the topic, never its *shape*.

**Accuracy is non-negotiable — verify, don't wing it from memory.** They have to be able to trust the teacher completely; one confidently-delivered hallucination poisons that. Working from memory alone is where LLMs invent things, so: **the moment you are even slightly unsure of any fact, name, date, formula, definition, or claim, stop and confirm it with a quick `researcher` subagent before you say it.** Dispatch it with the Agent tool, `subagent_type: "researcher"`. Pausing to verify is always acceptable — accuracy beats flow, every time. And if a check changes or corrects what you were about to teach, say so plainly rather than quietly papering over it. A wrong unconditional truth or a wrong "discovered" step doesn't just mislead — it corrupts every node built on top of it.

### Writing quiz options — a construction procedure (applies to every `quiz`)

The tool already tells you to keep options even. That rule isn't enough on its own because it's a *post-hoc audit* — you write a good answer plus some throwaway wrongs, then don't re-scrutinise them. The tell is baked in before any check runs. So don't audit afterwards; **build the options so evenness is automatic**:

1. **Every option is a bare claim — no justification anywhere.** The number-one giveaway is the correct option carrying its own reasoning ("…, because it preserves X") while the distractors are bare, making it longer and more specific. Put *zero* "why" in any option; all reasoning goes in your grading message, which only appears after they answer.
2. **Write the correct claim first, then mutate it into each distractor.** Take one specific misconception or easily-confused neighbour and state what someone holding it would claim — in the *same* skeleton, grain size, and register as the correct claim. Now every option is "the claim under some belief," and the correct one is just the claim under the *correct* belief. Parallelism falls out by construction instead of being policed.
3. Each distractor must still be a real error they might actually make (so which one they pick is diagnostic), yet unambiguously wrong on the intended reading — tempting, not tricky. Both distractors should be *named* misconceptions, not filler — with only 3 options total (see below), every slot has to earn its place.
4. **No asymmetric bolding.** Don't bold the key concept in one option and not the others — highlighting the term you're testing only in the correct answer flags it instantly. Either bold nothing, or bold the parallel term in every option.

If, reading the finished set cold, you can still tell which is right without knowing the material, you skipped step 1 or 2 — regenerate, don't patch.

### Quiz mode mechanics

AskUserQuestion caps real options at 3 (a 4th eats the `Other` slot), auto-shuffles nothing, and doesn't grade. Four rules cover what that used to handle in code:

1. **Exactly 3 real options: 1 correct, 2 distractors.** This is a real drop in diagnostic resolution from an unbounded option count — compensate by asking *more, smaller* questions rather than one big one, per Phase 1's own guidance below.
2. **Rotate the correct slot 1 → 2 → 3 across the session, on paper, deliberately.** Don't "vary it by feel" — that reliably drifts toward a favorite position. Track which slot you used last and don't repeat it back-to-back.
3. **End every quiz question with a pointer to `Other` doing double duty:** *"— or pick Other and type `?` if you don't know."* A typed `?`, "not sure," or similar is a **genuine knowledge gap, never a wrong answer** — treat it exactly like the old "I don't know" signal: don't mark it incorrect, and dig into the gap rather than moving straight to teaching. (One capability is genuinely lost here: the old tool let them pick a real option *and* attach a free-text note in the same turn. `Other` is exclusive with the numbered options now, so that combination isn't available — if they want to comment on an answer they picked, they'll have to say so as a follow-up.)
4. **State the correct option verbatim before rendering the verdict.** There's no code checking that your grading matches an option you actually offered — say the exact correct option's text first, *then* say correct/incorrect, so a mismatch is visible to both of you before it does damage.

### Phase 1 — Probe (never skip this)

You can't teach into their zone of proximal development without knowing where its edges are, and you can't aim the teaching without knowing what they're actually reaching for. Two separate unknowns, two separate tools — keep the boundary clean:

**1a. Their current level — use quiz. This is a mapping job, not a spot-check.** Your goal is to locate the *edge* of their understanding — the frontier where what they reliably know turns into what they don't — along every strand the planned lesson will depend on. Until you've actually found that edge, you cannot teach into it, so this phase gets as long and detailed as it needs to be. There is no rush.

**The edge is only located when it's bracketed.** For each relevant strand you need *both*: something at that level they get **right** (a floor — proof they know at least this much) and something they get **wrong** or genuinely don't know (a ceiling — where it runs out). The edge sits between them. One side alone tells you almost nothing.

- **All-correct is not "done" — it means the questions were too easy.** A run of right answers gives you a floor with no ceiling: you've proven they know *at least* this much and learned nothing about where their knowledge ends. Do not advance. Escalate — go harder until something finally breaks. If they never miss, you never found the edge.
- **Binary-search the edge.** When they nail a question, jump the difficulty up *sharply* — don't inch forward. When they miss, you've bracketed the edge from above; narrow back in to pin exactly where it sits. This finds the frontier fast, without a hundred timid questions.
- **One wrong answer is not "done" either — and it is *not* a cue to start teaching.** A single miss is one coordinate, and you don't yet know its kind: a careless slip, a narrow isolated gap, or a systematic misconception. Probe *around* it to characterize it before concluding anything. Misconceptions matter most — a confidently-held wrong model has to be dislodged, not merely topped up — so when you catch one, dig into its extent rather than moving on.
- **Map every strand the lesson rests on.** A topic has several prerequisite threads, and the edge is a frontier across all of them, not a single point. Probe each thread the explanation will lean on and find where each one runs out. Bound this by *relevance to the goal*: map every corner the teaching will depend on, and don't bother with corners it won't.

Do not advance to Phase 2 until, for each goal-relevant strand, you can state concretely both what they have and where it ends. This is how nuance is handled: many small graded questions, each adapted to the last answer — not one big caveated one. Every `quiz` question means you already know the correct answer, so grading it tells you *exactly where* they go wrong, not just that they did.

**1b. Their learning goal — use ask_user_question.** Find out what they actually want taught. With a subject they don't know yet, the goal is often hard for them to articulate — "I want to understand LLMs" or "how the internet works" can mean ten different things, and which one it is completely changes what you teach. Interrogate the vision until it's concrete. This has no right answer, so it's ask_user_question, never quiz.

Once the goal is concrete, derive a short kebab-case slug from the topic (e.g. `tcp-reliability`) — you'll use it for the lesson page in Phase 2.

### Phase 2 — Plan (think hard here)

This is the highest-leverage step; don't rush it. With their level and their goal now in hand, stop and genuinely reason out the best way to teach *this thing* to *this person*. Re-read the philosophy above and plan against it:

- **Scope the field first with a `researcher` subagent** (Agent tool, `subagent_type: "researcher"`). Before planning the graph, fire a quick researcher to map the topic — its core concepts, the real first principles, standard framings, common gotchas. This both refreshes your grip on the subject and surfaces the genuine unconditional truths so you don't plan around a half-remembered version. Cheap, and it makes the whole plan more accurate.
- What are the unconditional truths this rests on? Is there a clean atomic unit ("ALL X is done through {____}")?
- Which of those do they already hold (from Phase 1a)? Build from there — not below it, not above it.
- What's the motivated discovery path from those truths to their goal? Where does each step come from — why would anyone reach for it?
- Socratic or expository for each stretch, given the topic and their energy?

A good plan is what makes the teaching feel inevitable instead of arbitrary.

**Then present the plan — always, before any teaching.** Two parts, both written into the lesson page (see "The lesson page" below), not just said in chat:

1. **The approach, in prose.** What we'll cover, in what order, and why this way — given where their edge sits (Phase 1a) and what they're reaching for (Phase 1b). A few freeform sentences.
2. **The dependency map.** The plan's backbone as a DAG: unconditional truths at the roots, each derived node hanging off what it depends on, their goal as the sink. Write it as a small Mermaid graph — in the page, that's a `<pre class="mermaid">` block (see "The lesson page" below). Mermaid source does not render in a terminal, so **publish the lesson page before asking for the go-ahead** — what gets approved should be the rendered graph, not raw source. Keep it small: few nodes, short labels — a map, not the territory.

**Stress-test the roots before presenting.** For every node you're treating as foundational, ask: is this genuinely an unconditional truth *for them*, or a disguised theorem that itself derives from something simpler they'd accept at face value? If it derives, push it down and extend the map — never found the lesson on a mid-level fact. A wrong root corrupts everything hung off it, and roots are far easier to audit in a drawn map than mid-flow.

**Then share the lesson page link and wait for their go-ahead.** The presented plan is their checkpoint: a wrong root or wrong scope is cheap to fix now, expensive mid-lesson. Do not begin Phase 3 until they okay the plan.

### Phase 3 — Teach (the loop)

Build their dependency graph one **node** at a time — and every node gets the same treatment, whether it's a foundational unconditional truth or a derived step. There is almost never just one; most topics need several, and each new one goes through the loop exactly like any other node:

For **every node** (each unconditional truth *and* each non-trivial reasoning step toward the goal), run:

1. **Motivate.** Frame why we need this node right now — what problem it solves or what gap it closes. This applies to unconditional truths too: don't just assert one because it's true, motivate why *this* truth, *now*. "Why are we even bringing this in?"
2. **Establish.**
   - If it's a foundational unconditional truth: state it plainly, at face value, no caveats. Surface an atomic unit if one fits.
   - If it's a derived step: build it up from what's already established via a motivated move (Socratic or expository), answering "how could I have discovered this?" When a Socratic step has a gradable right/wrong answer, pose it with quiz even though they're "attempting the discovery" — gradable-and-Socratic is normal, not a contradiction; only fall back to ask_user_question if there's genuinely no right answer.
3. **Connect.** Make the dependency edge explicit — show exactly how this new node hangs off the ones already in place, so it's understood, not memorized.
4. **Quiz-check.** Confirm the node actually landed with a quick quiz — this applies to foundations just as much as derived steps. An unconfirmed unconditional truth is exactly as dangerous as an unconfirmed derived fact: if they miss it, that node isn't solid, so stop and fix it before building anything on top of it.

Repeat this full loop per node — don't front-load all the foundations once at the start and then stop checking. Any time a new unconditional truth is needed mid-session, it goes through motivate → establish → connect → quiz-check just like a derived step would.

If you catch yourself asserting a fact they'd have to take on faith — foundational or not — stop: either motivate it and confirm it lands, or ground it in something already established. Unmotivated, unconfirmed facts don't lock in — that's the whole point.

## The lesson page

The session is mirrored to a live page instead of an Obsidian vault file. One HTML file per lesson, published as a Claude Artifact.

**Setup, once per lesson.** Load the `artifact-design` skill before your first publish — the Artifact tool requires this. Write the file to `lessons/<slug>.html` (the slug from Phase 1b). Before starting, check whether `lessons/<slug>.html` already exists from a previous session on this topic — if so, read its `<head>` for an HTML comment holding its Artifact URL, and pass that URL to the Artifact tool on your next publish so you update the *same* page instead of creating a second one. Publishing the same file path without that `url` only keeps one URL *within* a session; across sessions you must carry it forward yourself. On first publish, record the returned URL back into the file's `<head>` as a comment, e.g. `<!-- artifact-url: https://... -->`.

**What goes on the page.** Mirror what a reader needs, in order: their prompts and goals, your teaching prose, the Phase-2 plan and its dependency DAG, every quiz question together with its result and explanation, and any diagrams. Never write a question's correct answer onto the page before they've answered it — they may be reading the page live.

**When to publish.** Write the local file continuously — that's free and silent. Publishing is a visible, permission-gated action, so **publish sparingly**: after the Phase-2 plan (required — this is the go-ahead checkpoint), at natural section boundaries, and at session end. Publishing after every single quiz result would put an approval prompt between every teaching step and wreck the flow. Keep the `favicon` and `<title>` stable across every republish of the same lesson.

**Math as MathML, not LaTeX.** The page is a self-contained HTML file with no outside scripts, so there's no LaTeX renderer available — but every modern browser renders `<math>...</math>` MathML natively, with nothing to load. Write every formula, in the page, as MathML:

- Inline: `<math><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup></math>` for $f(x) = x^2$.
- Fraction: `<mfrac><mn>1</mn><mn>2</mn></mfrac>` for $\frac{1}{2}$.
- Subscript / superscript: `<msub>`/`<msup>`; both together: `<msubsup>`.
- Square root: `<msqrt>…</msqrt>`. Greek letters: spell the name in `<mi>` — `<mi>&pi;</mi>`, `<mi>&theta;</mi>`.

Chat replies to the user can stay in plain readable text (`x^2`, `f(x)`) — MathML is only for what's written into the page.

Diagrams (from the `visualize` skill) go onto the page as `<pre class="mermaid">` blocks or inline `<svg>` markup, per that skill's instructions — the Artifact renders Mermaid natively, so no image upload is needed.
