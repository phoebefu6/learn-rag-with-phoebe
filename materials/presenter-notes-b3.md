# Presenter notes - Builder session 3: Vector databases

**Session goal:** builders can run Chroma end to end, recognize pgvector and FAISS as the same idea in different homes, and choose among flat, IVF, and HNSW indexes.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: chunks in a Python list vanish on exit - Recall needs a real store. |
| 3-13 | Part 1 - Chroma end to end. The whole store in a dozen lines (5), metadata filters as a WHERE clause (3). |
| 13-20 | Part 2 - pgvector and FAISS, same idea different homes; choosing a store and an index (3). |
| 20-40 | Build-along - run Chroma locally and query it; reinforce that a query still returns ranked chunks (Corpus A playground). |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b3-vector-databases.html, scroll to the .ragbox (Corpus A, k=3), run one query live to confirm it works.
- Have a Python env with `chromadb` installed and a PersistentClient path ready to demo persistence across a restart.
- Optional: pgvector/Postgres handy only if you want to show the operators live.

## Never-cut beats
- PersistentClient vs in-memory Client() - the difference between vectors that survive a restart and vectors that vanish.
- Metadata filters: retrieval with a WHERE clause (sets up b5).
- The index trade: flat (exact), IVF (trained, lower memory), HNSW (fastest + best recall, most memory).

## Cuts if running long
- Drop the "update and delete" self-study card and the FAISS self-study card.
- Trim pgvector to just naming it as "vectors as a Postgres column" without the operator detail.

## Quiz answers
1. **B** - PersistentClient writes to disk so vectors survive a restart; chromadb.Client() is in-memory and vanishes on exit.
2. **C** - `<=>` is the cosine distance operator, and the index opclass must be vector_cosine_ops or Postgres ignores the index.
3. **A** - HNSW (a navigable graph) is fastest with best recall and needs no training, but uses the most memory.

## Common questions + crisp answers
- "Chroma, pgvector, or FAISS?" Chroma to start, pgvector if your data already lives in Postgres, FAISS for raw in-process speed. Same idea, different homes.
- "Do I always need an index?" Flat (exact scan) is fine for small corpora; add IVF or HNSW when linear scan gets slow at scale.
- "Does the store change the ranking?" No - it still returns top-k by the chosen distance metric. It just persists and scales.
