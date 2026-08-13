<!-- phoebe header -->

[![Open the live course](https://img.shields.io/badge/%E2%96%B6%20open%20the%20live%20course-1f6feb?style=for-the-badge)](https://phoebefu6.github.io/learn-rag-with-phoebe/)
[![Star this repo](https://img.shields.io/github/stars/phoebefu6/learn-rag-with-phoebe?style=for-the-badge&label=star%20this%20repo&color=444444)](https://github.com/phoebefu6/learn-rag-with-phoebe/stargazers)
[![Free courses](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fphoebefu6.github.io%2Flearn-with-phoebe%2Fstats.json&query=%24.courses_live&label=free%20courses&style=for-the-badge&color=111111)](https://phoebefu6.github.io/learn-with-phoebe/)

### ▶︎ [Open the live course →](https://phoebefu6.github.io/learn-rag-with-phoebe/)

Free, runs in your browser. No install, no login.

> 📚 Part of **[Learn with Phoebe](https://phoebefu6.github.io/learn-with-phoebe/)** - free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**

<!-- /phoebe header -->

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
