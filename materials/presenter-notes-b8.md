# Presenter notes - Builder session 8: Full pipeline

**Session goal:** builders wire the whole runtime loop - embed the question, retrieve top-k, build an augmented prompt with grounding, call the Claude API, and stream one cited, grounded answer. Recall v1 runs end to end.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame: seven sessions of parts assemble here. |
| 3-11 | Part 1 - The whole loop wired. The augmentation step up close (3), wiring the loop in Python (3). |
| 11-18 | Part 2 - Streaming and the assembled Recall. Streaming with the Messages API (3). |
| 18-40 | Build-along - see the retrieve step that feeds generate (Corpus C playground); then assemble the full Recall script. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open b8-full-pipeline.html, scroll to the .ragbox (Corpus C, k=3), run one query live to show the retrieve step that feeds generate.
- Have a Python env with the Anthropic SDK + API key ready if walking the assembled script (this is concept-level code, not a runnable repo - set that expectation).
- Have the "where every session lands" pipeline diagram ready to zoom.

## Never-cut beats
- The three verbs of the runtime loop: retrieve, augment, generate.
- The augmentation step: system grounding rule + source-tagged passages + user question - the source tags are what make citations possible.
- Assembling the full Recall script so learners see every part in one place.

## Cuts if running long
- Drop the "why each chunk gets its own document block" self-study card and "hand-wired loop vs a framework" self-study card.
- Trim "where reranking and refusal slot in" to naming the two insertion points.

## Quiz answers
1. **B** - Retrieve (top-k from the store), augment (build the grounded prompt), generate (call the Claude API).
2. **C** - Augmentation folds the retrieved passages, tagged with source ids, plus the question into a prompt with the grounding instruction.
3. **A** - Switching to messages.stream changes only how the answer is delivered; retrieve and augment are identical.

## Common questions + crisp answers
- "Where do reranking and refusal go?" Reranking slots between retrieve and augment; refusal is a check on the top score before you generate.
- "Is this runnable code?" It's the real shape at concept level - every line is production-shaped, but wiring keys and a store is on you.
- "Does streaming change the pipeline?" No - streaming is purely a delivery choice at generate. It drops perceived latency, nothing above it changes.
