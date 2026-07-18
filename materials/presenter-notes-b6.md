# Presenter notes - Builder session 6: Reranking

**Session goal:** builders understand bi-encoder vs cross-encoder, the retrieve-wide-then-rerank-narrow funnel, MMR for trimming near-duplicates, and query expansion / HyDE.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Recap - the top result is the best a single compressed vector could find, not always the best answer. |
| 3-14 | Part 1 - Bi-encoder vs cross-encoder side by side (3), why you rerank the shortlist not the corpus (3). |
| 14-22 | Part 2 - MMR + HyDE. Query expansion and HyDE (3), MMR maximal marginal relevance (2). |
| 22-40 | Build-along - retrieve a wide top-5 (Corpus B), then reorder on paper imagining a cross-encoder rescore and MMR trim. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b6-reranking.html, scroll to the .ragbox (Corpus B, k=5, meta date+severity), run one query live to get a wide candidate set to reorder.
- Optional Python env with a cross-encoder (e.g. a `sentence-transformers` CrossEncoder) if demoing a real rescore.
- Have the two-stage funnel diagram ready to zoom.

## Never-cut beats
- Bi-encoder (separate vectors, fast, precomputable) vs cross-encoder (reads the pair together, accurate, slow).
- The funnel: fast retriever casts a wide net, slow reranker rescores only the shortlist.
- MMR: trims near-duplicates so top-k isn't five phrasings of one fact.

## Cuts if running long
- Drop the "stuffing too many chunks hurts the LLM" self-study card.
- Trim query expansion / HyDE to a one-line mention if the rerank funnel ran long.

## Quiz answers
1. **B** - A cross-encoder feeds the query and a document together through one transformer for a query-specific score - accurate but slow.
2. **A** - Cross-encoders precompute nothing, so scoring a whole corpus would take hours; the bi-encoder cheaply narrows to a shortlist first.
3. **C** - MMR addresses near-duplicate results, balancing relevance against diversity.

## Common questions + crisp answers
- "Do I always need reranking?" No - add it when the right chunk is being retrieved but ranked below the cut. It's a precision lever.
- "How wide should the candidate set be?" Retrieve ~100-150, rerank down to ~10-20. Reranking the whole corpus is prohibitively slow.
- "What is HyDE?" Generate a hypothetical answer, embed that, and retrieve with it - it catches passages the bare query missed.
