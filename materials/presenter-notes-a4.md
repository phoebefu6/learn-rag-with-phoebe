# Presenter notes - Leader session 4: How to judge a RAG

**Session goal:** leaders can look at any RAG answer and ask, in plain English, did we retrieve the right passages, is the answer supported by them, and does it address the question - the RAG Triad.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: "looks right" and "is trustworthy" are different things. |
| 3-12 | Part 1 - The RAG Triad. Context relevance (3), groundedness (3). |
| 12-20 | Part 2 - Reading a scorecard. Answer relevance self-study, retrieval vs generation metrics (3), the diagnostic rule (3). |
| 20-32 | Exercise 1 - Build your acceptance scorecard on paper. |
| 32-40 | Exercise 2 - Judge a real answer on the Triad (scoring drill). |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open a4-judge-a-rag.html; Projector zoom on.
- Have the RAG Triad diagram ready to zoom.
- Pick one real (or plausible) RAG answer plus its retrieved passages to score live in Exercise 2.
- Pen and paper.

## Never-cut beats
- The three corners: context relevance (right passages), groundedness (answer supported by them), answer relevance (addresses the question).
- The diagnostic rule: which corner is low tells you who to call (retriever team vs generation/prompt).
- Exercise 2 - actually scoring an answer against the Triad.

## Cuts if running long
- Drop the "answer relevance" self-study card and the "why a golden reference set" self-study card.
- Trim Exercise 1 to naming pass/fail thresholds for just the three corners.

## Quiz answers
1. **B** - Context relevance (right passages), groundedness (answer supported by them), answer relevance (addresses the question).
2. **C** - High recall, low faithfulness is a generation problem; passages were found but the model strayed. Fix prompt/model, not the retriever.
3. **A** - Context recall and answer correctness need a trusted reference; without one the model grades its own homework.

## Common questions + crisp answers
- "Do we need data scientists to read this?" No - the Triad is three plain-English questions. Scores just make them repeatable.
- "Which corner should we watch first?" Groundedness - a fluent answer unsupported by the passages is the classic RAG failure.
- "Why insist on a golden set?" Because recall and correctness are measured against reference answers; no golden set means no trustworthy accuracy.
