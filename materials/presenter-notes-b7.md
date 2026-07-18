# Presenter notes - Builder session 7: Grounding and citations

**Session goal:** builders can write a grounding prompt that answers strictly from retrieved context, wire Anthropic's Citations on a document block, and treat refusal as a feature.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: retrieval hands you the right passages; now the model must use only them. |
| 3-11 | Part 1 - Grounded generation. The three moves of a grounding prompt (3), writing Recall's grounding prompt (3). |
| 11-18 | Part 2 - Citations and refusal. Why refusal is a feature (2), Anthropic Citations on a document block (3). |
| 18-40 | Build-along - feel the refuse case over Corpus C (playground); then write Recall's grounding-and-refusal prompt. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b7-grounding-citations.html, scroll to the .ragbox (Corpus C, k=3), run a query that is NOT in the corpus to confirm the refuse case fires.
- Have a Python env with the Anthropic SDK and an API key ready if demoing Citations on a document block live.
- Corpus C is a real company knowledge base - skim it so the refusal demo lands.

## Never-cut beats
- The highest-leverage sentence: "Answer using only the provided context; if it's not there, say you do not know."
- Refusal as a feature - a weak best-match means the answer isn't in the KB, so refuse rather than guess.
- The live refuse case over Corpus C - see the system decline instead of bluffing.

## Cuts if running long
- Drop the "three ways to hand context to the model" self-study card and "citation location types" self-study card.
- Drop the "prompt-only citations vs the Citations feature" self-study card.

## Quiz answers
1. **B** - "Answer using only the provided context; if the answer is not there, say you do not know" - Anthropic's core reduce-hallucinations move.
2. **C** - When the best passage scores far below threshold, refuse ("I do not have that in our documents") rather than guess.
3. **A** - With Citations on a plain-text block you get the exact cited_text with a character-index location, and cited_text does not count toward output tokens.

## Common questions + crisp answers
- "Won't refusal frustrate users?" A confident wrong answer is worse. Refusal on weak matches is what makes the bot trustworthy.
- "Prompt-only citations or the Citations feature?" The feature returns verifiable character-index spans for free (no output-token cost) - prefer it when available.
- "How do I set the refusal threshold?" Use the weak top-scores you logged back in b1/b4 as your starting floor, then tune with b9's eval.
