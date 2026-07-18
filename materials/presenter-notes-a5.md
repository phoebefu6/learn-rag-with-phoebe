# Presenter notes - Leader session 5: Risk and governance

**Session goal:** leaders leave with the governance stack - the five risks unique to retrieval and the small set of controls (refusal, citations, access filtering, audit logs) they can insist on.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: RAG's power is reaching into real docs - and that reach is where the risk lives. |
| 3-12 | Part 1 - The five risks. Sensitive data + who can see what (3), stale answers + confident bluffing (3). |
| 12-20 | Part 2 - Controls you can insist on. Refusal + restrict to passages (3), require citation + filter access at retrieval (3). |
| 20-32 | Exercise 1 - Build the RAG risk register on paper. |
| 32-40 | Exercise 2 - Write your refusal policy (decision drill). |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open a5-risk-governance.html; Projector zoom on.
- Have the governance-stack / five-risks diagram ready to zoom.
- Pen and paper; helpful if attendees know who currently owns access control on their docs.

## Never-cut beats
- Access control at retrieval: search must be filtered to what the asking user is permitted to read.
- Refusal as a control: let the model say "I don't know" and restrict it to the provided passages.
- Exercise 2 - drafting a refusal policy they can actually hand to a team.

## Cuts if running long
- Drop the "vendor lock-in through embeddings" self-study card.
- Drop the "audit logs" self-study card (flag it as the control nobody demands until too late, then move on).

## Quiz answers
1. **C** - Access control at retrieval failed; the search was not filtered to documents that user may read.
2. **A** - Allow "I don't know", restrict to provided context, and quote the source before answering. A forced-to-answer model always answers.
3. **B** - Embeddings are model-specific, so switching embedding models means re-embedding the entire corpus.

## Common questions + crisp answers
- "Where do we even start?" Insist on the four controls: refusal, citations, access filtering at retrieval, and audit logs.
- "How do we stop leaks across permission levels?" Filter documents by the asking user at retrieval time - not after generation.
- "Is refusal bad UX?" No - a confident wrong answer is far worse. "Not in our documents" is a feature.
