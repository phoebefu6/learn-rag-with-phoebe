# Presenter notes - Builder session 5: Metadata + hybrid

**Session goal:** builders can add metadata where-filters (including time ranges) that narrow retrieval by structured fields, and turn on hybrid search that fuses dense semantic scores with sparse BM25.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Recap - pure similarity is blind to facts like severity and date. |
| 3-14 | Part 1 - Filtering by metadata and time. Why "which SEV1s in March?" breaks pure semantic (3), Chroma where-filters + date range (self-study), the build-along. |
| 14-22 | Part 2 - Hybrid retrieval. Why hybrid and what the alpha lever does (3), turning on hybrid in practice (2). |
| 22-40 | Build-along - semantic query, then narrow with a filter (Corpus B, k=3, severity=SEV1); find a query only a filter can answer. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b5-metadata-hybrid.html, scroll to the .ragbox (Corpus B, k=3, meta date+severity, filter severity=SEV1), run one incident query and apply the filter to confirm it works.
- Have a Python env with Chroma where-filter examples (`$gte`/`$lte` for dates) ready if demoing live.
- Corpus B is dated, severity-tagged Jira incidents - skim it so examples land.

## Never-cut beats
- The two questions similarity cannot answer: structured facts (severity=SEV1) and time ranges are filters, not topics.
- The alpha lever: score = alpha*dense + (1-alpha)*sparse; 1.0 pure dense, 0.0 pure sparse.
- The build-along: run a semantic query, then narrow with a metadata filter and watch survivors re-rank.

## Cuts if running long
- Drop the "Chroma where-filters" self-study card and the "turning on hybrid in practice" self-study card.
- Trim the find-a-filter-only-query exercise to a single demonstrated example.

## Quiz answers
1. **C** - Severity and date are structured facts, not topics - meaning search has no notion of "severity=SEV1" or a date range.
2. **A** - alpha of 1.0 is pure dense (semantic); the sparse/BM25 score is ignored.
3. **B** - Sparse/BM25 is especially good at matching exact tokens like error codes and ticket ids (INC-401, 503).

## Common questions + crisp answers
- "When do I filter vs rely on similarity?" Filter on structured fields (dates, severity, ids) first, then let similarity rank the survivors.
- "Why do exact ids like INC-401 slip through dense search?" Embeddings capture meaning, not exact tokens - that's what BM25/sparse catches. Hybrid fuses both.
- "What alpha should I set?" Start at 0.5 and shift toward dense or sparse based on whether your queries are paraphrase-heavy or id-heavy.
