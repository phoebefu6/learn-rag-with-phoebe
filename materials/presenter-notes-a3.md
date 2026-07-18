# Presenter notes - Leader session 3: Cost vs quality

**Session goal:** leaders can sanity-check any RAG proposal by separating where the money goes from where quality is won - and spot the cheap levers that raise accuracy without moving the invoice.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: cost and quality are two different maps that barely overlap. |
| 3-12 | Part 1 - Where the money goes. Three cost buckets (3), why generation dominates and "paste everything" is the trap (3). |
| 12-20 | Part 2 - Where quality is won. Cheap wins: chunking, reranking, refusal (3); contextual retrieval real numbers (3). |
| 20-32 | Exercise 1 - Sketch the cost model for your RAG idea on paper. |
| 32-40 | Exercise 2 - The "cheapest quality win" audit. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open a3-cost-quality.html; Projector zoom on.
- Have the cost-model diagram and the lever board ready to zoom.
- Pen and paper; ask attendees to bring the sorted-ideas sheet from a1.

## Never-cut beats
- Generation dominates per-query cost and grows with adoption - fewer, better passages saves more than a bigger model.
- The cheap levers (chunking, reranking, refusal threshold) live in retrieval, not in model size.
- Exercise 1 - putting real numbers on their own idea.

## Cuts if running long
- Drop the "build vs buy" self-study card.
- Skip the "no pricing tables here" aside - just say numbers drift, so learn the shape not the figure.

## Quiz answers
1. **C** - Generation dominates per-query cost, because cost scales with every token fed in and written out.
2. **A** - Try the cheap levers first (chunking, reranking, refusal) before buying a bigger model. Contextual retrieval cut retrieval failures by two-thirds before any upgrade.
3. **B** - You rerank only the small candidate set retrieval narrowed to; reranking millions would take hours.

## Common questions + crisp answers
- "Won't a bigger model just fix quality?" Usually not - most quality is lost in retrieval, and the cheap levers there are far more cost-effective.
- "What is the single biggest cost trap?" Pasting whole documents into every prompt at volume - you pay per token, every call.
- "How much can contextual retrieval help?" Anthropic reports stacking cheap retrieval levers cut failures by about two-thirds.
