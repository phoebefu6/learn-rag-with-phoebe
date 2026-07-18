# Presenter notes - Builder session 1: Embeddings 101

**Session goal:** builders leave with working intuition for embeddings and cosine similarity, hands-on time in the live playground, and the Python to embed text and rank passages by similarity.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: all of RAG is machinery around one trick - meaning becomes location. |
| 3-10 | Part 1 - A vector is meaning as numbers. From text to coordinates (3), why questions rarely share words with answers (3). |
| 10-18 | Part 2 - Cosine similarity. The metric without trig (2), then the live build-along. |
| 18-40 | Build-along - Corpus A playground; then "break the retriever on purpose" (synonym win, ambiguity, not-in-corpus, reflect). |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b1-embeddings.html, scroll to the .ragbox (Corpus A, k=3, vector strip on), run one query live ("travel seat preference") to confirm it works.
- Have a Python env with `openai` + `numpy` (or `sentence-transformers`) and an API key ready if demoing the snippet live.
- Projector zoom on for the embedding-space and cosine diagrams.

## Never-cut beats
- The core trick: "find related text" becomes "find nearby vectors" - get this in their hands and the rest is engineering.
- The live playground: type a question in different words than the note and watch the right chunk still rank first.
- Cosine intuition: 1.0 = same direction = same meaning; ~0 = perpendicular = unrelated. Rank, don't threshold.

## Cuts if running long
- Drop the "same thing in Python with a real model" self-study card (they run it in homework).
- Trim "break the retriever" to just steps 3 and 4 (not-in-corpus + reflect) - that seeds b7's refusal threshold.

## Quiz answers
1. **B** - An embedding is a fixed-length list of numbers representing the text's meaning as a point in space.
2. **C** - Cosine 1.0 means the vectors point the same direction - the model reads them as the same meaning.
3. **A** - The question and its answer often share no keywords, but their meanings (and vectors) are close.

## Common questions + crisp answers
- "Is the playground using real embeddings?" No - it's a toy term-frequency embedder with a synonym map, but the ranking math (cosine) is exactly production RAG.
- "Which embedding model should I pick?" Trade quality vs dimensions vs cost/latency. Embed docs and queries with the SAME model - mismatched spaces don't compare.
- "Should I threshold on 0.8?" Not at first. Absolute scores drift by model; trust the ranking and return top-k.
