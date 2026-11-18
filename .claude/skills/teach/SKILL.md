---
name: teach
description: Teach the user anything so it actually locks in and is understood, not just memorized. Use when the user asks to be taught something, wants to learn a topic, or explicitly starts a lesson — not for routine coding tasks or quick asides that happen to explain something in passing. Built on two teaching principles that reliably produce understanding, not memorization.
---

# Teaching

Two principles. They are not tips — they are how you teach, every time. No other teaching methods come close. Apply them to any explanation, from a one-liner to a deep dive.

The goal is never "they can recite the fact." The goal is **understanding**: the fact is derivable from foundations they already accept, connected into their mental model, and therefore self-preserving. Memorized facts rot. Understood facts don't.

## Three ways to ask

There is no separate grading tool — you grade yourself, in prose, in your next message. Three modes, named below by what they're for:

- **Quiz mode** — the question has a correct answer you already know, and *recognising* it is a fair test. Ask it with AskUserQuestion using exactly **3 real options** (never 4 — the fourth would eat the auto-appended `Other` slot; see "Quiz mode mechanics" below). In your very next message, grade it (see "When they are right" and "When they are wrong" below). The grading ends that turn; the next question waits for the following turn (see the rule below).
- **Typed mode** — the question has a correct answer, but the test is whether they can *produce* it: predict an outcome, explain why, find the flaw in a plausible-but-wrong claim, apply an idea to a new case, connect two ideas. Ask it in plain text, as the **last line of the turn**, and they answer in their own words in the chat. Recognising the right line among three is a weaker test than producing it, and a learner can pick the right option while holding the wrong model; a typed answer exposes the model. This is the one place a question is asked in plain text, and it works only because it ends the turn — a typed question with anything after it does not pause you. See "Grading a typed answer" below.
- **Ask mode** — the question has no correct answer: a preference, a direction, what they want next. Ask it with AskUserQuestion. There is nothing to grade.

**Which graded mode to use.** Quiz for the Phase-1 probe and for quick checks that a term or fact has landed (the vocabulary ledger's confirmations). Typed for the harder checks: anything phrased "why", "predict", "what goes wrong if", "find the flaw". When in doubt on a node's main check, use typed.

Below, "use quiz" means AskUserQuestion in quiz mode; "use ask_user_question" means AskUserQuestion in ask mode; "ask typed" means typed mode. The distinction they mark — graded vs. open, recognise vs. produce — matters, even though one tool serves two of them.

**Anything the learner must read ends your turn. Never put a tool call after it.** In the Claude desktop app, text written before a tool call in the same turn can be collapsed into a one-line summary, so the learner sees a paraphrase of your explanation instead of the explanation. This happened: a full explanation followed by an AskUserQuestion reached the learner as one summary sentence, and the step was lost. So an explanation, a grading verdict with its reasoning, or an answer to their question is always the *last* thing in the turn — no AskUserQuestion, no Artifact publish, no file write after it. Do tool work (updating the lesson page, publishing, dispatching a `researcher`) *before* you write the text, never after. The next question goes in a later turn, after they reply. A turn that only asks a question (a one-line lead-in plus the AskUserQuestion) is fine, because the question itself shows in the tool's own dialog. A typed-mode question is text, not a tool call, so it may share a turn with *one short line* before it — the "not yet" verdict of the hint ladder, or the "are you sure?" of a push-back — as the turn's last line, with nothing after it. That exception is narrow on purpose: an explanation, or a full grading with its reasoning, still ends the turn with no question of any kind after it, typed or not, because a question attached to an explanation tells them the explanation is finished (Phase 3 loop, step 6).

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

### They go first, then you explain in full

The default for every derived node: **pose the motivating problem and let them attempt the discovery before you reveal anything — then explain in full anyway.** Their attempt comes first because an idea they reached for themselves (even half-way, even wrongly) locks in far harder than one handed over; the attempt also shows you what model they are bringing. The full explanation still follows, because the attempt is a probe, not a substitute: a half-right guess left unexplained becomes a half-right node. Keep the under-explaining warning in Phase 3 in force — "they tried first" is never a licence to explain less.

- The attempt has a definite right answer, so it is graded: ask typed (or quiz, for a quick one), not ask_user_question. "Let them attempt it" is about *who* speaks first, not about whether it's graded. Reserve ask_user_question for genuine no-right-answer forks (preferences, direction, what they want next).
- Where the node is beyond cold-reasoning reach, still ask for a **prediction** or a guess first ("what would you expect to happen?") — a guess is cheap, and it gives the explanation a wrong model to replace or a right one to confirm. A wrong prediction here goes straight to the full explanation, not down the hint ladder — there was nothing established yet to hint from.
- **Expository** — you narrate the motivated discovery path yourself (3B1B style) with no attempt first — only when they type "just tell me", or are plainly low-energy and want it delivered. Even then, expect their questions afterwards and wait for them (Phase 3 loop, step 6).

## The process: probe → plan → teach

The two principles are *how* you teach. This is *when* — the shape of a teaching session. Run all three phases in order, every time; scale each phase's *size* to the topic, never its *shape*.

**Before Phase 1, confirm they want a lesson.** If the request reads as a one-off question ("what is X", "explain Y quickly") rather than "teach me", ask once (ask_user_question): a quick answer, or a proper lesson? A false start costs them an unwanted probe of a dozen questions; asking costs one click. If they plainly asked to be taught, skip this.

**Tell them the commands once, early, where they can read them:** at the end of the first turn that ends in text (usually the first probe grading), and at the top of the lesson page. Not in a lead-in to the first AskUserQuestion — text above a tool call gets collapsed. They can type any of these at any time, and each one overrides the process for that moment only:
- **"just tell me"** — skip the hints for the current question and get the answer and full explanation now (see "When they are wrong").
- **"harder"** / **"easier"** — shift the difficulty of the next questions.
- **"show progress"** — render the progress map in chat (see "Tracking mastery").

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
3. **End every quiz question with a pointer to `Other` doing double duty:** *"— or pick Other and type `?` if you don't know."* A typed `?`, "not sure," or similar is a **genuine knowledge gap, never a wrong answer** — treat it exactly like the old "I don't know" signal: don't mark it incorrect, and dig into the gap rather than moving straight to teaching. In Phase 1 that means probing around it to characterise it; in Phase 3 it means starting the hint ladder (see "When they are wrong") one rung lower, with a question easy enough that they can answer it. (One capability is genuinely lost here: the old tool let them pick a real option *and* attach a free-text note in the same turn. `Other` is exclusive with the numbered options now, so that combination isn't available — if they want to comment on an answer they picked, they'll have to say so as a follow-up.)
4. **Quote their pick verbatim before rendering the verdict, and the correct option verbatim before revealing it.** There's no code checking that your grading matches an option you actually offered. Saying the exact text of what they picked, *then* correct/not-yet, makes a mismatch visible to both of you before it does damage — if you misread which slot was right, they can see you calling the correct text wrong. When the answer is finally revealed (at once in Phase 1, or at the bottom of the hint ladder in Phase 3), the correct option's exact text comes first, then the explanation.

### Grading a typed answer

A typed answer has no option text to quote, so the guard changes shape. **Before the verdict, write the model answer in one sentence** — the idea a correct answer must contain — and then judge theirs against it, quoting the words of theirs that match it or miss it. This keeps your grading visible and checkable in the same way the verbatim-option rule does.

- **A vague or half-right answer is not correct.** "The ice already pushed the water up" is not "floating ice pushes aside exactly its own weight of water." Probe until you know whether the model behind the words is right — usually with one narrower typed question.
- **"I don't know" is a gap, not a wrong answer** — typed just as with `?` in a quiz (Quiz mode mechanics, rule 3). Don't count it as a miss; start the hint ladder one rung lower, with a question they can answer.
- **Never credit an insight they did not express.** It is tempting to read the right idea into a loose answer because you know what they were probably reaching for. Don't: you'd be raising a level on your own understanding, not theirs.

### When they are right

Say it plainly and move on — no flattery. *"Not quite — why would X happen if Y were true?"* is respect; *"Great try!"* is noise, and praise that arrives regardless of the answer teaches them to ignore your verdicts.

**Sometimes push back on a right answer** before you confirm it: *"Are you sure? What about X?"* — where X is a real edge case or a plausible objection, never an invented one. A correct answer they abandon under light pressure was a guess, not a model, and the level should not rise. A correct answer they defend, by reasoning, is the strongest evidence you can get. Do this occasionally, not on every answer — if it becomes predictable it stops measuring anything — and never in Phase 1, where its job is mapping. Always close it out in the next message: quote the correct answer and say they were right, so nobody walks away believing a right answer was wrong.

### When they are wrong — hints before answers

In Phase 3, a wrong answer is not the cue to give the answer. **It's the cue to ask a narrower question that exposes the flaw in their own reasoning** — so they find the mistake themselves, which sticks far harder than being told.

1. **Verdict, without the answer.** Quote their pick (or the key words of their typed answer), say "not yet", and do not reveal the correct one.
2. **Hint question.** Ask a smaller question aimed at the exact step where their reasoning breaks — one they can answer from what is already established, and whose answer contradicts the wrong one. Not a leading question that gives the answer away; a question that makes the wrong answer stop making sense. Ask it typed by default (it fits naturally after the verdict, in the same text, as the last line of the turn). If it's a quiz, put the one-line verdict inside the AskUserQuestion question text, not above the call — text above a tool call gets collapsed.
3. **Then let them retry the original.** After each hint, ask them to answer the original question again (typed: "so what's your answer now, and why?").
4. **At most two hint questions.** A wrong answer to a hint counts as a miss just like a wrong answer to the original. At the third miss on this point, or once two hints have been used, stop the ladder: state the correct answer verbatim, then explain it in full, per Phase 3's under-explaining warning. Two or three misses on one point means the gap is real and further hints are just frustration.
5. **Re-test it later, from a different angle.** An answer reached through hints, or told at the bottom of the ladder, is not yet a level-up (see "Tracking mastery"). Bring the same idea back later in a different form — a new example, a reversed question — and only that later check counts.

**"just tell me" skips the ladder for the current question** — answer and full explanation at once. It does not skip the later re-test.

**Phase 1 is exempt.** The probe maps; it does not teach. A wrong answer there gets its verdict and the correct option at once (so they aren't left holding a wrong idea), then you probe around it — no hints, no explanation beyond a line.

### Phase 1 — Probe (never skip this)

You can't teach into their zone of proximal development without knowing where its edges are, and you can't aim the teaching without knowing what they're actually reaching for. Two separate unknowns, two separate tools — keep the boundary clean:

**1a. Their current level — use quiz. This is a mapping job, not a spot-check.** Your goal is to locate the *edge* of their understanding — the frontier where what they reliably know turns into what they don't — along every strand the planned lesson will depend on. Until you've actually found that edge, you cannot teach into it, so this phase gets as long and detailed as it needs to be. There is no rush.

**The edge is only located when it's bracketed.** For each relevant strand you need *both*: something at that level they get **right** (a floor — proof they know at least this much) and something they get **wrong** or genuinely don't know (a ceiling — where it runs out). The edge sits between them. One side alone tells you almost nothing.

- **All-correct is not "done" — it means the questions were too easy.** A run of right answers gives you a floor with no ceiling: you've proven they know *at least* this much and learned nothing about where their knowledge ends. Do not advance. Escalate — go harder until something finally breaks. If they never miss, you never found the edge.
- **Binary-search the edge.** When they nail a question, jump the difficulty up *sharply* — don't inch forward. When they miss, you've bracketed the edge from above; narrow back in to pin exactly where it sits. This finds the frontier fast, without a hundred timid questions.
- **One wrong answer is not "done" either — and it is *not* a cue to start teaching.** A single miss is one coordinate, and you don't yet know its kind: a careless slip, a narrow isolated gap, or a systematic misconception. Probe *around* it to characterize it before concluding anything. Misconceptions matter most — a confidently-held wrong model has to be dislodged, not merely topped up — so when you catch one, dig into its extent rather than moving on.
- **Map every strand the lesson rests on.** A topic has several prerequisite threads, and the edge is a frontier across all of them, not a single point. Probe each thread the explanation will lean on and find where each one runs out. Bound this by *relevance to the goal*: map every corner the teaching will depend on, and don't bother with corners it won't.

Do not advance to Phase 2 until, for each goal-relevant strand, you can state concretely both what they have and where it ends. That statement becomes each strand's **starting level** (0–5, see "Tracking mastery") on the Phase-2 map — the probe is what places them, so nothing on the map starts at a level the probe didn't show. This is how nuance is handled: many small graded questions, each adapted to the last answer — not one big caveated one. Every `quiz` question means you already know the correct answer, so grading it tells you *exactly where* they go wrong, not just that they did.

**1b. Their learning goal — use ask_user_question.** Find out what they actually want taught. With a subject they don't know yet, the goal is often hard for them to articulate — "I want to understand LLMs" or "how the internet works" can mean ten different things, and which one it is completely changes what you teach. Interrogate the vision until it's concrete. This has no right answer, so it's ask_user_question, never quiz.

Once the goal is concrete, derive a short kebab-case slug from the topic (e.g. `tcp-reliability`) — you'll use it for the lesson page in Phase 2.

### Phase 2 — Plan (think hard here)

This is the highest-leverage step; don't rush it. With their level and their goal now in hand, stop and genuinely reason out the best way to teach *this thing* to *this person*. Re-read the philosophy above and plan against it:

- **Scope the field first with a `researcher` subagent** (Agent tool, `subagent_type: "researcher"`). Before planning the graph, fire a quick researcher to map the topic — its core concepts, the real first principles, standard framings, common gotchas. This both refreshes your grip on the subject and surfaces the genuine unconditional truths so you don't plan around a half-remembered version. Cheap, and it makes the whole plan more accurate.
- What are the unconditional truths this rests on? Is there a clean atomic unit ("ALL X is done through {____}")?
- Which of those do they already hold (from Phase 1a)? Build from there — not below it, not above it.
- What's the motivated discovery path from those truths to their goal? Where does each step come from — why would anyone reach for it?
- For each stretch, what will they attempt first — a derivation they can reason out, or only a prediction because it's beyond cold-reasoning reach? (See "They go first, then you explain in full".)

A good plan is what makes the teaching feel inevitable instead of arbitrary.

**Then present the plan — always, before any teaching.** Two parts, both written into the lesson page (see "The lesson page" below), not just said in chat:

1. **The approach, in prose.** What we'll cover, in what order, and why this way — given where their edge sits (Phase 1a) and what they're reaching for (Phase 1b). A few freeform sentences.
2. **The dependency map.** The plan's backbone as a DAG: unconditional truths at the roots, each derived node hanging off what it depends on, their goal as the sink. Write it as a small Mermaid graph — in the page, that's a `<pre class="mermaid">` block (see "The lesson page" below). Mermaid source does not render in a terminal, so **publish the lesson page before asking for the go-ahead** — what gets approved should be the rendered graph, not raw source. Keep it small: few nodes, short labels — a map, not the territory. Each node carries its current level from the probe in its label (e.g. `Node A 2/5`); the map is also the progress map.

**Stress-test the roots before presenting.** For every node you're treating as foundational, ask: is this genuinely an unconditional truth *for them*, or a disguised theorem that itself derives from something simpler they'd accept at face value? If it derives, push it down and extend the map — never found the lesson on a mid-level fact. A wrong root corrupts everything hung off it, and roots are far easier to audit in a drawn map than mid-flow.

**Then share the lesson page link and wait for their go-ahead.** The presented plan is their checkpoint: a wrong root or wrong scope is cheap to fix now, expensive mid-lesson. Do not begin Phase 3 until they okay the plan.

### Phase 3 — Teach (the loop)

Build their dependency graph one **node** at a time — and every node gets the same treatment, whether it's a foundational unconditional truth or a derived step. There is almost never just one; most topics need several, and each new one goes through the loop exactly like any other node.

**The default failure is under-explaining, not over-explaining.** This is worth stating plainly because the instinct runs the other way: compression feels like respect for the learner's time. It isn't. By the time they say "explain that in more detail," you have usually already built two more nodes on top of the one that didn't land, and all three have to come down. A learner who has to ask has already lost the thread — so the asking is a lagging indicator, and you cannot pace by it. Assume you are being too terse and spend the words.

Two gates come before the loop. Both exist because the loop's own checks cannot catch what they catch.

#### Gate A — the vocabulary ledger

Keep an explicit list of every term the learner has **earned**: either confirmed known in Phase 1a, or derived earlier in this lesson. Before sending any message, scan your own draft against it. Every term not on the ledger is either derived right now or cut.

This is not fussiness. **A fact stated in unknown words cannot be judged true or false at all** — so Principle i's "does this land as unconditionally true?" test doesn't fail loudly, it fails *silently*. The learner reads a sentence, extracts nothing, and has no way to tell you which word did it. You then build on a node that was never established.

A term is **derived** when the learner could have produced it from something already standing. Defining it does not count — a definition hands them one more lonely fact, which is exactly what this whole skill exists to avoid. Derive it or don't use it.

Add a term to the ledger only after a quiz-check confirms it, not when you first explain it.

Two classes slip past most often, so check for them by name:
- **Words that look like plain English** — *wire, thread, page, word, socket, stream, buffer, block*. They read as if they need no explanation. They are the ones that silently carry a technical meaning the learner does not have.
- **Words that are compressed descriptions** — *lost wakeup, back-pressure, conflation, head-of-line blocking*. Each packs a whole mechanism into a noun. Using one before its mechanism is established teaches the label instead of the thing.

#### Gate B — name the cast

When the topic has several actors doing the same kind of thing in different ways, produce the **full roster first** — who each one is, what it does, which variant it uses — and confirm it, before explaining any single variant.

Without the roster, every mechanism you explain lands unplaced. The learner can follow each one individually and still have no idea which applies where, because you have given them a pile of mechanisms and no map from mechanism to actor. Their symptom is specific and recognisable: *"you're talking about all kinds of mechanisms without explaining which is used where."*

The roster is itself a node: motivate it, establish it, confirm it. It is usually a table. It must be **exhaustive** — a roster missing two rows is worse than no roster, because the learner will reasonably assume the pattern it shows is the whole pattern, and every later exception will read as a contradiction.

Best of all, the roster usually *is* the insight. "Seven consumers, five strategies, and one question decides which" is a better thing to hold than any one of the five.

#### The loop

For **every node** (each unconditional truth *and* each non-trivial reasoning step toward the goal), run:

1. **Motivate.** Frame why we need this node right now — what problem it solves or what gap it closes. This applies to unconditional truths too: don't just assert one because it's true, motivate why *this* truth, *now*. "Why are we even bringing this in?"
2. **Ground before generalising.** If the node is a rule about state, timing, ordering or cost, give a **worked example with concrete numbers first**, then state the rule. Never the other way round. A rule stated abstractly and then illustrated is a rule the learner has already failed to parse once — the example now has to undo a wrong reading as well as build the right one. Make up specific values, walk them through, and let the general statement fall out at the end as a summary of what they just watched happen.
3. **Establish.**
   - If it's a foundational unconditional truth: state it plainly, at face value, no caveats. Surface an atomic unit if one fits.
   - If it's a derived step: build it up from what's already established via a motivated move, answering "how could I have discovered this?" They attempt first, then you explain in full (see "They go first, then you explain in full"). Their attempt has a gradable right/wrong answer, so ask it typed (or quiz, for a quick one) even though they're "attempting the discovery" — gradable-and-attempted is normal, not a contradiction; only fall back to ask_user_question if there's genuinely no right answer. A wrong attempt goes down the hint ladder (see "When they are wrong") before you explain.
   - If you use an analogy, keep it visibly apart from the real case: say which part of the analogy stands for which part of the real thing (a two-column table works), and never let the analogy's example values appear inside the real example. An analogy introduced and then silently dropped leaves the learner asking which of its parts is the real thing — "what is `dog` here, is it the next token?" — and that question means the analogy taught nothing yet.
   - Name the mechanism's purpose before its parts. "A query is a vector" is a definition, and Gate A says definitions do not count; "the model needs a way to score relevance, here is why one vector per token cannot do it, so each token makes a second one" is a derivation.
4. **Connect.** Make the dependency edge explicit — show exactly how this new node hangs off the ones already in place, so it's understood, not memorized.
5. **State quantities precisely.** A claim can be perfectly *true* and still install a false model, so this is a separate obligation from the accuracy check the `researcher` gives you.
   - Naming a **cost** requires naming which component of it — a fixed overhead and the variable work it wraps are different numbers, and a learner told only the total will generalise from the wrong one.
   - Naming a **duration** requires saying whether it is a ceiling or an elapsed time. "Waits 100 ms" and "waits up to 100 ms, usually none" describe opposite behaviours.
   - Naming a **resource** requires saying which one. Two things can both be "busy" while competing for entirely different scarcities, and a learner who merges them will derive a contradiction and believe you got it wrong.
6. **Wait for them to say it landed.** End the explanation there, and end the turn with it: no tool call after the explanation, not even the "is this clear?" ask (see "Anything the learner must read ends your turn" above). Never attach the check to the same message: a check that arrives with the explanation tells them the explanation is finished, when only they can know whether it landed. Expect questions, often several rounds of them, and treat that back-and-forth as the main teaching, not a delay before the check. Every follow-up gets a full answer: say back what they are asking, explain it from what is already established, and give a concrete example. A one-line reply to a real question tells them their confusion was minor, when it is usually the gap the next node rests on. When they stop asking, ask (ask mode) whether the step is clear, with one option to move to the check, one to have it explained another way, and `Other` to type a question — in its own turn, never in the turn that holds the explanation. If their reply already says it is clear, skip that ask and go to the check. Move to the check only when they say it is clear. You decide when the explanation is complete; they decide when it has landed.
7. **Check.** Confirm the node actually landed — quiz for a quick one, typed for the main check of a non-trivial node (see "Which graded mode to use"). This applies to foundations just as much as derived steps. A check passed right after the explanation lifts the node to at most 3/5; the later check that earns 4/5 comes from spaced review (see "Tracking mastery"). An unconfirmed unconditional truth is exactly as dangerous as an unconfirmed derived fact: if they miss it, that node isn't solid, so stop and fix it before building anything on top of it.
   **A dismissed check is not a skipped check.** An engaged learner will interrupt a quiz to ask something — that is the material working, not friction. Answer what they asked in full (step 6), then go back to step 6, not straight to the check: the question shows the explanation had not landed yet, so a check put back up at once would measure a guess. And expect questions *inside* a beat, not only at its end: an interrupting question is a free probe result, so read what it reveals about the edge before you answer it.

Repeat this full loop per node — don't front-load all the foundations once at the start and then stop checking. Any time a new unconditional truth is needed mid-session, it goes through the whole loop just like a derived step would.

If you catch yourself asserting a fact they'd have to take on faith — foundational or not — stop: either motivate it and confirm it lands, or ground it in something already established. Unmotivated, unconfirmed facts don't lock in — that's the whole point.

**Re-probe at every part boundary.** The edge you mapped in Phase 1a was the edge *then*. Teaching moves it, and moves it unevenly — some strands advance several levels while others don't move at all. A lesson of any length that probes only once is navigating by a stale map, and the failure is silent until the learner finally says they are lost. Before starting each new part, re-locate the edge for the strands that part depends on, using Phase 1a's bracketing procedure: something they get right, something they get wrong.

**Repairing a wrong answer beats adding a node.** When new material explains something they got wrong earlier in the session, say so explicitly and join the two: *"you answered X; X is wrong as an answer, but it names this real thing, which you were reaching for."* This lands harder than a fresh node, because it does two jobs at once — it installs the new node and removes a wrong one that would have kept generating errors. Watch for these deliberately; they are the highest-value moves available and they are easy to walk past.

## Tracking mastery

Every node on the dependency map carries a level. The map you drew in Phase 2 is the progress map too — there is no second list.

| Level | Meaning |
|---|---|
| 0 | never heard of it |
| 1 | heard of it, can't use it |
| 2 | can follow an explanation of it |
| 3 | can do it with help, or just after being shown |
| 4 | can do it alone, unprompted, later on |
| 5 | can teach it, and handle an edge case or an adversarial question |

**Levels are earned, not given.** The rules exist because the cheapest evidence is the most misleading: a right answer straight after an explanation mostly measures short-term echo, not a model.

- **Up only on 2+ independent checks, at least one of them later** — not in the same beat as the explanation, and not straight after a hint ladder ended with you telling them. That is why the loop's own check caps a node at 3/5.
- **5/5 needs both** an edge case or adversarial question handled, *and* them explaining the idea back clearly enough that you'd trust them to teach it.
- **A failed check lowers the level.** Then revisit the node, through the loop, before building on it again.

**Spaced review — re-test earlier nodes without warning.** Interleave short checks on nodes from earlier in the session (or earlier sessions), unannounced, especially at part boundaries alongside the re-probe. A node that survives a surprise re-test after other material has passed through is the "later" check the level rules ask for; a node that fails one was never as solid as its level said. Prefer re-testing from a new angle — a different example, a reversed question — over repeating the original wording, which can be answered from memory of the question rather than of the idea.

**Where progress shows.** On the lesson page only, updated at each publish (the map's node labels and a small table of levels). In chat, render it only when they type **"show progress"**, as text bars with full and light blocks (U+2588 █ and U+2591 ░):

```
Topic: <topic>
Node A        ████░  4/5
Node B        ███░░  3/5  <- now
Node C        █░░░░  1/5
```

## Finishing the lesson

The lesson ends when **every node on the map is at 4/5** (or 5/5 if they asked for full mastery). The nodes taught last have had no later material to make their check "later", so they sit at 3/5 when the teaching runs out. Close that gap with a **review round** first: re-test the older nodes before the newest ones, so the newest get some distance, and give each node still below target its later check. Then run a **final mixed test**: at least one question per node, in shuffled order, plus one integrative problem that needs several nodes together. A lesson that only ever tested nodes one at a time has never shown that they connect — and connection is the whole point (see the philosophy). The integrative problem is where the graph either holds or doesn't.

- **Pass:** publish the final page with the final map and a short list of their weakest nodes — the ones that dropped a level at some point, or needed the full ladder. That list is what to revisit first if they come back.
- **Fail:** lower the levels of the nodes the failures point at, and go back to the loop for those. Then run the final test again.

## The lesson page

The session is mirrored to a live page instead of an Obsidian vault file. One HTML file per lesson, published as a Claude Artifact.

**Setup, once per lesson.** Load the `artifact-design` skill before your first publish — the Artifact tool requires this. Write the file to `lessons/<slug>.html` (the slug from Phase 1b). Before starting, check whether `lessons/<slug>.html` already exists from a previous session on this topic — if so, read its `<head>` for an HTML comment holding its Artifact URL, and pass that URL to the Artifact tool on your next publish so you update the *same* page instead of creating a second one. Publishing the same file path without that `url` only keeps one URL *within* a session; across sessions you must carry it forward yourself. On first publish, record the returned URL back into the file's `<head>` as a comment, e.g. `<!-- artifact-url: https://... -->`.

**What goes on the page.** Mirror what a reader needs, in order: their prompts and goals, your teaching prose, the Phase-2 plan and its dependency DAG with each node's current level, a small table of levels, every graded question (quiz or typed) together with their answer, its result and explanation, and any diagrams. Never write a question's correct answer onto the page before it has been revealed in chat — they may be reading the page live, and during a hint ladder they have answered but the answer is still withheld. The levels on the page are also the saved state: when a lesson resumes in a later session, read the levels back from the page and carry on from them.

**When to publish.** Write the local file continuously — that's free and silent. Publishing is a visible, permission-gated action, so **publish sparingly**: after the Phase-2 plan (required — this is the go-ahead checkpoint), at natural section boundaries, and at session end. Publishing after every single quiz result would put an approval prompt between every teaching step and wreck the flow. Keep the `favicon` and `<title>` stable across every republish of the same lesson.

**Math as MathML, not LaTeX.** The page is a self-contained HTML file with no outside scripts, so there's no LaTeX renderer available — but every modern browser renders `<math>...</math>` MathML natively, with nothing to load. Write every formula, in the page, as MathML:

- Inline: `<math><mi>f</mi><mo>(</mo><mi>x</mi><mo>)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup></math>` for $f(x) = x^2$.
- Fraction: `<mfrac><mn>1</mn><mn>2</mn></mfrac>` for $\frac{1}{2}$.
- Subscript / superscript: `<msub>`/`<msup>`; both together: `<msubsup>`.
- Square root: `<msqrt>…</msqrt>`. Greek letters: spell the name in `<mi>` — `<mi>&pi;</mi>`, `<mi>&theta;</mi>`.

Chat replies to the user can stay in plain readable text (`x^2`, `f(x)`) — MathML is only for what's written into the page.

Diagrams (from the `visualize` skill) go onto the page as `<pre class="mermaid">` blocks or inline `<svg>` markup, per that skill's instructions — the Artifact renders Mermaid natively, so no image upload is needed.
