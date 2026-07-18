<!-- learn-with-phoebe hub banner -->
> ### 📚 Part of [**Learn with Phoebe**](https://phoebefu6.github.io/learn-with-phoebe/)
> The shelf of free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**
<!-- /learn-with-phoebe hub banner -->

# learn RAG with phoebe

A two-track, hands-on course on **retrieval-augmented generation and vector databases** - by Phoebe Fu.

RAG is how you make an LLM answer from *your* documents instead of guessing: retrieve the few passages that matter, hand them to the model, and make it answer from them with a citation. This course teaches both how to *lead* a RAG effort and how to *build* one.

## Two tracks, 16 sessions

- **🤝 Leader track (6 x 45 min, no code):** what RAG is, its anatomy, cost vs quality, how to judge a RAG system, risk and governance, and the POC-to-production roadmap.
- **🛠️ Builder track (10 x 45 min, Python + a browser playground):** embeddings, chunking, vector databases (Chroma, pgvector, FAISS), retrieval, metadata + hybrid search, reranking, grounding and citations, the full pipeline, evaluation, and production.

## The running project

The builder track grows one assistant, **Recall**, across three escalating corpora:

1. **Corpus A - Personal:** a managing director's chief-of-staff notes (semantic search).
2. **Corpus B - Product / Ops:** dated Jira incident tickets with severity (metadata + temporal + hybrid retrieval).
3. **Corpus C - Company KB:** a help-center for a support bot (grounding, citations, refusal, evaluation).

## Live retrieval playground

Every builder session has an in-browser playground (`assets/rag-live.js`) - type a question, watch chunks rank by cosine similarity, filter by metadata, and see the refuse-when-unknown case fire. It runs fully offline with a deliberately simplified lexical embedder; the ranking math (cosine similarity over vectors) is exactly what production RAG uses.

## Built from official sources

Taught from Anthropic, OpenAI, and DeepLearning.AI RAG courses and the Chroma, pgvector, Pinecone, Weaviate, LangChain, LlamaIndex, and RAGAS docs. Coverage contract: [`materials/official-course-map.md`](materials/official-course-map.md).

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Static HTML/CSS/JS - no build step. Feeds directly into [learn-langchain-with-phoebe](https://phoebefu6.github.io/learn-langchain-with-phoebe/).
