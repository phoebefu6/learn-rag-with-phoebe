# Presenter notes - Builder session 10: Production

**Session goal:** builders can keep a RAG system alive in production - re-indexing on change, caching, a defensible latency budget, monitoring for drift, and a cost ceiling - then graduate Recall and see the LangChain handoff.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: a demo on your laptop is not a system that survives real users and changing docs. |
| 3-24 | Part 1 - Keeping it alive. Freshness / re-index without redoing everything (3), caching (3), latency budget (3), monitoring for drift (2). |
| 24-42 | Part 2 - Graduation + handoff. The 2026 frontier: contextual and agentic RAG (3), Recall's graduation checklist (self-study); write Recall's production readiness checklist. |
| 42-45 | Quiz + Q&A. Close the track. |

## Preflight
- Open b10-production.html (no playground this session - it's operations and the graduation checklist).
- Have the full-pipeline "one diagram" ready to zoom for the graduation walk-through.
- Optional: a LangChain/LangGraph snippet ready to preview the agentic-RAG handoff.

## Never-cut beats
- Freshness done right: re-embed only the changed chunks and re-index those, not the whole corpus every night.
- The latency budget: generation is almost always the largest slice - that is where optimization pays off.
- Writing the production readiness checklist - the tangible graduation artifact.

## Cuts if running long
- Drop the "Recall's graduation checklist" self-study card (learners keep it as a handout).
- Trim monitoring to one sentence: watch for quality drift before users report it.

## Quiz answers
1. **B** - Re-embed only the chunks that changed and re-index those; unchanged chunks keep valid deterministic vectors.
2. **C** - LLM generation is usually the largest latency slice and grows with output length; vector search is well under 100ms.
3. **A** - Agentic RAG lets the model decide when and how often to call a retrieve tool, rather than always retrieving first.

## Common questions + crisp answers
- "How do I keep the index fresh cheaply?" Track a content hash per chunk; re-embed only the delta. Re-embedding everything nightly is the classic cost sink.
- "Where should I spend latency effort?" On generation - trim output length and stream. Search and query-embedding are already tiny.
- "What comes after this track?" Agentic RAG - orchestrating retrieval as a tool inside a reasoning loop with LangChain/LangGraph.
