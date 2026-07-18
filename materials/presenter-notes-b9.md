# Presenter notes - Builder session 9: Evaluation

**Session goal:** builders can split failures into retriever vs generator, build a golden set with reference answers, and run real metrics (faithfulness, answer relevancy, context precision/recall, hit rate, MRR) with LLM-as-judge.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: "it felt right in the demo" is how RAG rots in production. |
| 3-13 | Part 1 - Retrieval metrics vs generation metrics. Can it find the context? (3), is the answer good and honest? (3). |
| 13-22 | Part 2 - Golden set + eval. A RAGAS-style eval end to end (self-study), which metrics need a reference vs self-judge (3). |
| 22-40 | Build-along - turn your failures (from b1/b4/b7) into a golden set of questions with reference answers. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b9-evaluation.html (no playground this session - it's metrics and golden sets).
- Have a Python env with `ragas` (or equivalent) + an LLM-judge API key ready if demoing a live eval run.
- Collect the wrong-answer queries attendees logged in earlier sessions - they become the golden set seed.

## Never-cut beats
- The two buckets: is a failure the retriever's fault (missing context) or the generator's fault (unfaithful answer)?
- The diagnostic split - high faithfulness + low context recall points at the retriever, not the generator.
- Building the golden set - questions plus trusted reference answers, without which "accuracy" is self-grading.

## Cuts if running long
- Drop the "RAGAS-style eval end to end" self-study card (they run it in homework).
- Trim the metric tour to faithfulness, answer relevancy, and hit rate; leave MRR/precision as reading.

## Quiz answers
1. **B** - High faithfulness + low context recall means the retriever is missing needed chunks - fix chunking or search, not the prompt.
2. **C** - RAGAS faithfulness = supported claims divided by total claims in the answer (the anti-hallucination metric).
3. **A** - Answer relevancy is self-judging (generates questions from the answer); context recall and answer correctness both need ground truth.

## Common questions + crisp answers
- "How big does the golden set need to be?" Start with 20-50 real questions with reference answers - enough to move a number, not perfection.
- "Retriever or generator - how do I tell?" Read the two metrics together: low recall = retriever; high recall + low faithfulness = generator.
- "Can an LLM grade its own output fairly?" Use LLM-as-judge for self-judging metrics, but anchor correctness against a human-written reference.
