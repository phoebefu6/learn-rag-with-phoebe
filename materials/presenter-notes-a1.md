# Presenter notes - Leader session 1: What RAG is, and why it beats a bigger prompt

**Session goal:** leaders leave able to say what RAG is in one breath, sort any "use our data with AI" idea through three doors, and screen whether RAG actually pays off.

## Run of show (45 min)
| Min | Beat |
|-----|------|
| 0-3 | Welcome. Frame the hour: tell the real thing from the demo. |
| 3-12 | Part 1 - Retrieve, augment, generate. Walk the flow diagram, then the one-breath definition (3) and why-not-memorize (3). |
| 12-20 | Part 2 - Three doors (RAG vs fine-tune vs bigger prompt). Knowledge-vs-behavior line (3), "just paste it all" (3). |
| 20-32 | Exercise 1 - Sort 6 real "AI on our data" ideas on paper. |
| 32-40 | Exercise 2 - The four-question vendor screen. |
| 40-45 | Quiz + Q&A. |

## Preflight
- Open a1-what-rag-is.html; click Projector zoom on for the room.
- Have both SVG diagrams ready to zoom: the retrieve-augment-generate flow and the three doors.
- Pen and paper for every attendee (both exercises are no-code).
- Optional: skim b1's live playground so you can point to it when someone asks "how does meaning search actually work".

## Never-cut beats
- The one-breath definition: search our docs, paste just the few passages, answer from them with a citation.
- The three-doors rule: new KNOWLEDGE goes to RAG, new BEHAVIOR goes to fine-tuning, and they stack.
- Exercise 1 - sorting their own ideas is where the model becomes theirs.

## Cuts if running long
- Drop the "meaning search in one paragraph" self-study card (it is read-after-class anyway).
- Trim Exercise 2 to just questions 1 and 3 (how fast do answers change; what happens when it doesn't know).

## Quiz answers
1. **B** - Retrieve, augment, generate. The model only ever sees the passages the search step pulled, never the whole base.
2. **C** - "Fine-tune on our support docs" is really a RAG request; they want the model to answer FROM the docs (knowledge), not change behavior.
3. **A** - You pay per token on every call and accuracy drops when the answer is buried ("lost in the middle").

## Common questions + crisp answers
- "Isn't a huge context window making RAG obsolete?" For one small doc, paste it. At scale, per-token cost, lost-in-the-middle accuracy loss, and no citations bring you back to retrieval.
- "Can we do both RAG and fine-tuning?" Yes - mature systems fine-tune for voice and use RAG for facts. They are not rivals.
- "How do we know a vendor's product is real RAG?" Ask how fast answers change when a doc changes, whether it cites a source, and what it does when it does not know.
