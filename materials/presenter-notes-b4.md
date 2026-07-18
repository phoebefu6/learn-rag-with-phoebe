# Presenter notes - Builder session 4: Retrieval basics

**Session goal:** builders can implement top-k similarity search, wrap it behind the retriever interface, and critically read a ranked result set (the skill that separates working RAG from broken RAG).

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Recap - embeddings, chunks, store; now pull the passages that answer a question. |
| 3-10 | Part 1 - Top-k search end to end. The retriever in a dozen lines (3), the same call against a real store (2). |
| 10-18 | Part 2 - Retriever as a component. Choosing k, rank vs threshold (3), reading a ranked result set critically (4). |
| 18-40 | Build-along - vary the query, watch the ranking move (Corpus A, k=4); then compute a hit rate by hand. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b4-retrieval-basics.html, scroll to the .ragbox (Corpus A, k=4), run one query live and watch cosine scores shift.
- Have a Python env ready if demoing the dozen-line retriever or the LangChain retriever interface.
- Prepare 3-5 test questions with known correct chunks so the hit-rate exercise has ground truth.

## Never-cut beats
- Top-k = score every chunk by cosine, sort, keep the k highest - a ranking, not a threshold.
- Reading a ranked result set critically: spotting when the right chunk sat just below the cut.
- The by-hand hit-rate exercise - fraction of queries whose correct doc lands in top-k.

## Cuts if running long
- Drop the LangChain retriever interface self-study card.
- Drop the "same call against a real vector store" self-study card (concept already shown in the dozen-line retriever).

## Quiz answers
1. **B** - Top-k returns the k passages with the highest cosine similarity to the query.
2. **C** - Too-small k drops a relevant chunk that ranked just below the cut, so the answer is silently incomplete.
3. **A** - Hit rate is the fraction of queries where the correct document appears in the top-k.

## Common questions + crisp answers
- "What k should I use?" k=4 is a common start. Too small drops relevant chunks; too large drags in noise and cost. Tune it.
- "Rank or threshold?" Rank first - absolute cosine scores drift by model, so return top-k rather than "everything above 0.8".
- "How do I know retrieval is working?" Compute hit rate on a handful of known questions - the cheapest, most honest signal you have.
