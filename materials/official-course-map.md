# learn-rag-with-phoebe - official course map

**What this is:** the coverage contract for the course. It maps each session to the real
sources it teaches from, marks how fully each is covered (✓ full / ◐ partial / - not by design),
and lists the verified facts the pages are allowed to state. Built 2026-07-18.

**Course shape:** two tracks, 16 sessions, tier 3 (Advanced). Deep-purple + gold, editorial-bold.
- **Leader track** (a1-a6): what RAG is, when it helps, cost/quality, how to judge it, risk, roadmap.
- **Builder track** (b1-b10): embeddings -> chunking -> vector DB -> retrieval -> hybrid/metadata ->
  reranking -> grounding/citations -> full pipeline -> evaluation -> production.

**Running-project spine (three escalating corpora, shipped in `assets/rag-corpora.js`):**
- **Corpus A - Personal:** chief-of-staff notes for a managing director. Semantic retrieval.
- **Corpus B - Product/Ops:** dated Jira incident tickets with severity. Metadata + temporal + hybrid.
- **Corpus C - Company KB:** help-center articles. Grounding, citations, refusal, evaluation at scale.

**Interactive layer:** `rag-live.js` - a fully-offline retrieval playground. Honesty note baked into
the tool and pages: it uses a **simplified lexical embedding** (term frequency + a synonym map, same
function for docs and queries) so it runs with zero network. The ranking math shown (cosine
similarity over vectors) is exactly what production RAG uses; only the embedder is simplified.

---

## The 80% bar

Each session teaches ~80% of its mapped sources' *working concepts* - the ideas and moves a
practitioner uses. What stays official and is **not** reproduced: vendor certificates, graded
notebooks, hosted infrastructure, and paid API keys. Where a source is only partially covered the
row is marked ◐ with a note. Fast-moving area: **re-verify the LangChain RAG tutorial and RAGAS
metric names before delivery** - both moved in the last year (see caveats at the bottom).

---

## Leader track coverage

| Session | Teaches | Mapped sources | Cover |
|---|---|---|---|
| a1 · What RAG is + why | RAG vs fine-tune vs long-context; the retrieve-augment-generate idea; when it pays off | OpenAI QA-embeddings (knowledge as prompt memory), Anthropic contextual-retrieval intro | ✓ |
| a2 · Anatomy | The moving parts a leader funds: ingest, chunk, embed, store, retrieve, rerank, generate, cite, evaluate | LlamaIndex 5-stage model, LangChain RAG pipeline | ✓ |
| a3 · Cost vs quality | Embedding/index/inference cost, latency, build vs buy, where quality is won | Anthropic cost figures, Pinecone reranker latency figures | ◐ (no vendor pricing tables) |
| a4 · How to judge a RAG | Groundedness, citations, hallucination, retrieval quality; the RAG Triad scorecard | DeepLearning.AI Advanced RAG (RAG Triad), RAGAS metrics | ✓ |
| a5 · Risk & governance | PII in embeddings, access control, data freshness, vendor lock-in, refusal as a control | Anthropic reduce-hallucinations, Citations | ◐ (governance framing is ours) |
| a6 · POC to prod | Roadmap, team roles, RAG vs agents, 2026 outlook (agentic RAG, contextual retrieval) | LangChain agentic-RAG, Anthropic contextual retrieval | ◐ (agentic-RAG page not fully fetched) |

## Builder track coverage

| Session | Teaches | Mapped sources | Cover |
|---|---|---|---|
| b1 · Embeddings 101 | Vectors, cosine similarity, why questions rarely lexically overlap answers, picking a model | OpenAI QA-embeddings, Weaviate embeddings, DeepLearning.AI Vector DBs | ✓ |
| b2 · Chunking | Fixed / recursive / semantic / sentence-window / parent-document / contextual; size + overlap | Pinecone chunking, Unstructured course, Anthropic contextual retrieval | ✓ |
| b3 · Vector databases | Chroma (primary) client/collection/add/query; pgvector + FAISS deltas; HNSW vs IVF vs Flat | Chroma docs, pgvector README, FAISS wiki, Weaviate vector-index | ✓ |
| b4 · Retrieval basics | top-k similarity search, the retriever interface, similarity_search(k) | LangChain RAG, LlamaIndex querying | ✓ |
| b5 · Metadata + hybrid | where-filters, temporal queries, dense+sparse/BM25 hybrid, alpha weighting | Chroma metadata filtering, Pinecone hybrid search | ✓ |
| b6 · Reranking | bi-encoder vs cross-encoder, two-stage retrieve-then-rerank, MMR diversity, query expansion/HyDE | Pinecone rerankers, DeepLearning.AI Advanced Retrieval (Chroma) | ✓ |
| b7 · Grounding & citations | grounded generation, Anthropic Citations, refuse-when-unknown guardrail | Anthropic Citations, reduce-hallucinations | ✓ |
| b8 · Full pipeline | wire retrieve -> augment -> generate with the Claude API; stream a cited answer | LangChain RAG pipeline, Anthropic Citations | ◐ (concept-level code, not a runnable repo) |
| b9 · Evaluation | golden set, faithfulness, answer relevancy, context precision/recall, hit-rate, MRR, LLM-as-judge | RAGAS metrics, LlamaIndex evaluation, OpenAI Evaluate-RAG | ✓ |
| b10 · Production | re-indexing/freshness, caching, latency budget, monitoring, cost; hands off to LangChain | Pinecone rerankers, Anthropic prompt caching; LlamaIndex storing | ◐ (no single freshness-cadence source) |

---

## Verified facts the pages may state (with sources)

**Contextual Retrieval (Anthropic, https://www.anthropic.com/news/contextual-retrieval)**
- Prepend a 50-100 token chunk-specific context before embedding AND before BM25 indexing.
- Failure rate (1 - recall@20), baseline 5.7%: contextual embeddings alone -35% (->3.7%);
  + contextual BM25 -49% (->2.9%); + reranking -67% (->1.9%).
- Context generated by Claude 3 Haiku; one-time cost ~$1.02 per million document tokens with prompt caching.
- Reranking funnel: retrieve top ~150 -> rerank -> keep top ~20.

**Citations (Anthropic, https://platform.claude.com/docs/en/build-with-claude/citations)**
- Enable per document block with `"citations": {"enabled": true}`.
- Plain text -> sentence chunks, char-index location; PDF -> sentence chunks, page location;
  custom content -> your blocks, content-block-index location.
- `cited_text` does NOT count toward output tokens (nor input tokens on later turns).
- RAG tip: put each chunk in its own plain-text document for sentence-level citations.

**Reduce hallucinations / refusal (Anthropic, .../strengthen-guardrails/reduce-hallucinations)**
- Allow "I don't know"; restrict to provided context; quote-first then answer; retract claims with no supporting quote.

**Embeddings & similarity (OpenAI QA-embeddings; Weaviate)**
- Relatedness = cosine, computed as `1 - cosine_distance`; higher = more similar.
- Embeddings beat fine-tuning for factual recall because questions rarely lexically overlap their answers.
- `text-embedding-3-small` used in the OpenAI cookbook example.

**Chunking (Pinecone chunking-strategies; secondary for sentence-window/parent-document)**
- Fixed-size is the recommended starting point. RecursiveCharacterTextSplitter defaults in LangChain: chunk_size=1000, chunk_overlap=200.
- Test chunk sizes 128/256 (small) to 512/1024 (large), bounded by the embedding model's context window.
- Anthropic: chunks "usually no more than a few hundred tokens."
- Sentence-window and parent-document patterns are canonical in LlamaIndex/LangChain (verify class names before quoting).

**Vector DBs (Chroma docs; pgvector README; FAISS wiki; Weaviate)**
- Chroma: `get_or_create_collection`, `add(ids, documents, metadatas)`, `query(query_texts, n_results, where=...)`; `PersistentClient(path=...)` persists automatically.
- Chroma where operators: `$eq $ne $gt $gte $lt $lte $and $or $in $nin $contains $not_contains`.
- pgvector: `CREATE EXTENSION vector`; `vector(d)` column; operators `<->` L2, `<=>` cosine, `<#>` neg inner product, `<+>` L1; `ORDER BY embedding <=> '[...]' LIMIT k`; HNSW and IVFFlat indexes (opclass must match operator).
- FAISS: `IndexFlatL2` (exact), `IndexIVFFlat` (train then add, nprobe tunes), `IndexHNSWFlat` (graph); returns integer ids, no metadata.
- ANN: HNSW = fastest queries + best recall, high memory, no training; IVF = lower memory, needs training; Flat = exact, minimal memory, linear.

**Hybrid & reranking (Pinecone hybrid-search-intro; rerankers)**
- Dense (semantic) + sparse/BM25 (keyword) combined by convex weight alpha; alpha=0.5 pure hybrid, 1.0 dense, 0 sparse.
- Bi-encoder encodes query and doc separately (fast, precomputable); cross-encoder scores the pair together (accurate, slow).
- Two-stage: fast retrieve wide, slow rerank narrow. Vector search <100ms; reranking 40M records on a V100 would take >50 hrs - hence rerank only the candidate set.

**Evaluation (RAGAS; LlamaIndex; OpenAI Evaluate-RAG)**
- RAG Triad (DeepLearning.AI/TruLens): context relevance, groundedness, answer relevance.
- RAGAS Faithfulness = supported claims / total claims (hallucination check).
- RAGAS Response Relevancy = mean cosine sim between LLM-generated questions from the answer and the real question.
- RAGAS Context Precision = ranking quality of retrieved chunks; Context Recall = completeness (needs a reference).
- RAGAS Answer Correctness = factual F1 + semantic similarity vs ground truth.
- Retrieval ranking metrics: Hit Rate (correct doc in top-k), MRR (rank of first relevant, 1.0 = always first).
- Reference/golden set unlocks context recall, answer correctness, reference-based context precision. LLM-as-judge powers claim extraction/verification.
- Practice: end-to-end vibe check first, then component-wise (low faithfulness -> generation; low recall -> retriever).

**Frameworks (LangChain; LlamaIndex)**
- LlamaIndex 5 stages: Loading -> Indexing -> Storing -> Querying -> Evaluation. Documents -> Nodes; Retriever -> Node Postprocessor -> Response Synthesizer.
- LangChain RAG pipeline: load -> RecursiveCharacterTextSplitter -> embeddings -> vector store -> retriever (similarity_search k) -> generate. (2026 tutorial reframes around Deep Agents / agentic RAG.)

---

## Not covered by design (say so on the pages)

- Vendor certificates, graded notebooks, hosted infra, and paid API keys - stay with the official courses (DeepLearning.AI, provider academies).
- Knowledge graphs for RAG (Neo4j) - noted as an adjacent path in b6/a6, not taught in depth.
- Tokenization internals + vector quantization (Qdrant optimization course) - mentioned in b10 as a scaling lever, not taught in depth.
- Multimodal / facial / anomaly-detection vector apps (Pinecone applications course) - out of scope; this course is text RAG.
- Live neural embeddings in the playground - the browser tool uses a simplified lexical embedder by design (honesty note on every playground).

## Re-verify before delivery (fast-moving)

1. **LangChain RAG tutorial** now redirects to a Deep Agents rewrite (docs.langchain.com/oss/python/langchain/rag). The classic `create_retrieval_chain`/LCEL pattern is outdated; teach the LangGraph retrieve->generate or agentic pattern. Re-check on delivery.
2. **RAGAS** renamed answer-relevancy to "Response Relevancy" and keeps evolving metric names - confirm current names.
3. **pgvector** cosine/inner-product opclass names (`vector_cosine_ops`, `vector_ip_ops`) - confirm against the README Indexing section.

## Sources (all fetched + verified 2026-07-18)

DeepLearning.AI: Building & Evaluating Advanced RAG · Preprocessing Unstructured Data · Advanced Retrieval for AI with Chroma · Vector Databases from Embeddings to Applications · Retrieval Optimization · Knowledge Graphs for RAG · Building Applications with Vector Databases.
Anthropic: Contextual Retrieval · Citations · Reduce Hallucinations.
OpenAI cookbook: Question Answering Using Embeddings · Evaluate RAG with LlamaIndex.
Docs: Chroma · pgvector · FAISS · Pinecone (chunking, hybrid, rerankers) · Weaviate (embeddings, vector-index) · LangChain RAG · LlamaIndex (RAG stages, evaluation) · RAGAS (faithfulness, response relevancy, context precision, context recall, answer correctness).
