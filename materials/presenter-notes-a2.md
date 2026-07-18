# Presenter notes - Leader session 2: Anatomy of a RAG system

**Session goal:** leaders can walk into a design review, point at any of the nine parts, and ask the one question that reveals whether it was thought through.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: a RAG system is nine parts, not one thing you buy. |
| 3-12 | Part 1 - The pipeline on one page. Index-time vs query-time split (3), the nine parts in plain English (4). |
| 12-20 | Part 2 - Each part and the question it earns you (4), why chunking and citations are the two to watch (3). |
| 20-32 | Exercise 1 - Map your own system's nine parts on paper. |
| 32-40 | Exercise 2 - The "which part is weakest" walkthrough. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open a2-anatomy.html; Projector zoom on.
- Have the nine-part pipeline diagram ready to zoom - it is the spine of the whole hour.
- Pen and paper; ideally attendees bring one real system to map.

## Never-cut beats
- The index-time vs query-time split: index once (project cost), query every time (running cost that grows with adoption).
- The nine parts named in plain English, so every attendee can point and name.
- Exercise 1 - mapping their own system is the payoff.

## Cuts if running long
- Drop the "how LangChain names the same parts" self-study card.
- Shorten the "nodes" vocabulary card to one sentence (chunk = passage = LlamaIndex Node).

## Quiz answers
1. **B** - Index time (ingest, chunk, embed, store) runs once; query time (retrieve, rerank, augment, generate, cite) runs on every question.
2. **C** - Chunking cuts each document into passage-sized pieces (nodes) before embedding and storing.
3. **A** - Citations, which depend on tracking each passage's source from ingest and chunking onward.

## Common questions + crisp answers
- "Do we need all nine parts?" No - reranking and hybrid are optional. But knowing they exist lets you ask why one was skipped.
- "Which part fails most often?" Chunking silently caps everything downstream; citations are impossible if source was not tracked from the start.
- "Where does most of the cost sit?" Query-time work, because it runs per question and grows with adoption - that is session a3.
