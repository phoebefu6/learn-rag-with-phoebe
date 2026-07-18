# Presenter notes - Builder session 2: Chunking

**Session goal:** builders can pick a chunking strategy, tune the two levers (size and overlap), and know the contextual-chunking trick that fixes most retrieval misses.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: chunking is the most under-rated decision in RAG. |
| 3-11 | Part 1 - Why chunk at all. Three reasons you cannot skip it (4), the Goldilocks too-big/too-small problem (4). |
| 11-20 | Part 2 - The strategies. The two levers: size and overlap (3), retrieve-small-feed-big: sentence-window and parent-document (3). |
| 20-40 | Build-along - feel a well-formed chunk retrieve in the Corpus A playground; then chunk your own doc three ways. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b2-chunking.html, scroll to the .ragbox (Corpus A, k=3), run one query live to confirm it works.
- Have a Python env with `langchain-text-splitters` (RecursiveCharacterTextSplitter) ready if demoing recursive splitting.
- Bring one real long document attendees can chunk three ways in the exercise.

## Never-cut beats
- The Goldilocks problem: too big blurs meaning into one vector, too small loses context.
- The two levers - size and overlap - are what you actually tune; start fixed-size.
- Contextual chunking: prepend a short generated context to each chunk before embedding.

## Cuts if running long
- Drop the "semantic chunking" self-study card (cutting where meaning turns).
- Drop the "recursive splitting in Python" self-study card - it's read-after-class.

## Quiz answers
1. **B** - One giant vector exceeds the model's input limit and averages all topics into one blurry vector, so precise retrieval is impossible.
2. **C** - Fixed-size chunks (Pinecone's recommendation) - simple, fast, good enough for most corpora. Climb to fancier only when it stops working.
3. **A** - Anthropic's contextual chunking prepends a short generated context (50-100 tokens) to each chunk before embedding, reducing retrieval failures.

## Common questions + crisp answers
- "What chunk size should I start with?" Fixed-size, a few hundred tokens, with a small overlap - then measure and adjust.
- "Why overlap at all?" So a sentence split across a boundary still appears whole in at least one chunk.
- "When do I need semantic or parent-document chunking?" Only when fixed-size retrieval visibly fails - retrieve small for precision, feed the bigger parent for context.
