# Presenter notes - Leader session 6: POC to production

**Session goal:** leaders can place their own project on the POC-to-prod roadmap, name the next gate it must pass, and decide when plain RAG is enough versus when an agent is warranted.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: the demo is the start line, not the finish - "ship it" is the dangerous moment. |
| 3-12 | Part 1 - The roadmap. The trap of shipping the POC (3), what each stage adds (3). |
| 12-20 | Part 2 - RAG vs agents. When plain RAG is enough vs an agent (3), contextual retrieval as today's frontier (3). |
| 20-32 | Exercise 1 - Place your project on the roadmap (pen and paper). |
| 32-40 | Exercise 2 - The RAG-vs-agent decision for your top use case. |
| 40-45 | Quiz + Q&A. Close the leader track. |

## Preflight
- Open a6-poc-to-prod.html; Projector zoom on.
- Have the four-stage roadmap diagram ready to zoom.
- Pen and paper; attendees bring their top real use case.
- Have a1's sorted-ideas sheet handy - this session reconnects to it.

## Never-cut beats
- The four stages in order: POC, Evaluated, Governed, Production - each adds what the last lacked.
- The RAG-vs-agent line: "look it up and tell me" is RAG; "figure out what to do, using lookup as one move" is an agent.
- Exercise 1 - placing their own project and naming the next gate.

## Cuts if running long
- Drop the "team that carries a RAG system" self-study card.
- Trim the contextual-retrieval frontier card to one sentence (add context to each chunk before indexing).

## Quiz answers
1. **B** - POC (works at all), Evaluated (scorecard), Governed (access/refusal/citations), Production (monitored, fresh, cost-capped).
2. **C** - An agent is warranted when the task needs multiple steps or a choice between actions, so retrieval becomes one tool.
3. **A** - Contextual retrieval adds a short blurb of surrounding context to each chunk before indexing, so a passage carries its own meaning.

## Common questions + crisp answers
- "How do we know we're ready to ship?" Name the gate you last passed. If you skipped Evaluated or Governed, that gap surfaces in production.
- "Should we build an agent now?" Start simple. Use plain RAG until a task genuinely needs multi-step reasoning or tool choice.
- "What's the next course?" The builder track, then agentic RAG via LangChain/LangGraph, where retrieval becomes a callable tool.
