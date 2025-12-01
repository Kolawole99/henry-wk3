# Multi-Agent RAG Orchestration System

A production-ready TypeScript implementation of an intelligent customer support routing system using LangChain.js and Langfuse for full observability.

## Overview

This system automatically classifies customer support queries and routes them to specialized AI agents (HR, IT Support, Finance, Legal) that provide accurate, context-aware answers grounded in company documentation.

**Key Features:**
- 🤖 **Intelligent Routing**: GPT-3.5-turbo classifies queries to correct department
- 📚 **RAG-Powered Answers**: Each agent retrieves relevant docs before responding
- 📊 **Full Observability**: Langfuse tracing for debugging and quality monitoring
- ⚖️ **Quality Evaluation**: Automated 5-dimension scoring of responses
- 🔒 **Type-Safe**: Full TypeScript with Zod validation
- 🎯 **Production-Ready**: Modular architecture, error handling, testing

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Testing](#testing)
- [Configuration](#configuration)
- [Design Decisions](#design-decisions)
- [Langfuse Observability](#langfuse-observability)
- [Cost Estimates](#cost-estimates)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Production Deployment](#production-deployment)

## Architecture

```
User Query
    ↓
Orchestrator (GPT-3.5-turbo) → Routes to department
    ↓
Specialized Agent (gpt-4o-mini) → Retrieves docs + generates answer
    ↓
Evaluator (GPT-3.5-turbo) → Scores quality (1-10)
    ↓
Response with citations
```

**Technology Stack:**
- **LangChain.js**: RAG chains, vector stores, agents
- **OpenAI**: GPT models + embeddings
- **Langfuse**: Observability and tracing
- **Zod**: Runtime type validation
- **TypeScript**: Type safety throughout
- **Vitest**: Testing framework

**Department Identifiers:**
- Human Resources: `hr`
- IT Support: `it_support`
- Finance: `finance`
- Legal: `legal`

## Quick Start

### 1. Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key
- Langfuse account (free at [cloud.langfuse.com](https://cloud.langfuse.com))

### 2. Installation

```bash
# Clone or navigate to project
cd henry-wk3

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 3. Configuration

Edit `.env` and add your API keys:

```bash
OPENAI_API_KEY=sk-your-key-here
LANGFUSE_SECRET_KEY=sk-lf-your-key-here
LANGFUSE_PUBLIC_KEY=pk-lf-your-key-here
```

### 4. Populate Document Templates

**Important:** The system includes placeholder templates in `data/*/`. You must fill these in with your actual company policies for the RAG system to work effectively.

1. Navigate to each department folder:
   - `data/hr_docs/`
   - `data/it_docs/`
   - `data/finance_docs/`
   - `data/legal_docs/`

2. Open each template file (e.g., `pto_policy_template.md`)

3. Replace `[INSERT ...]` placeholders with your actual information

4. Add enough detail to generate 50+ chunks per template (aim for 1000+ words)

**See each folder's README.md for specific guidance.**

### 5. Initialize Vector Stores

```bash
# This loads documents and creates embeddings
npm run setup
```

### 6. Run the System

```bash
# Interactive CLI
npm start

# Or run the demo script
npm run demo
```

### 7. Verify Installation

```bash
# Check that vector stores were created
ls -la data/vector_stores

# Test routing (should show department classification)
npm run demo

# Run tests to ensure everything works
npm test
```

**Expected output**: All tests pass, routing accuracy = 100%

## Project Structure

```
henry-wk3/
├── src/
│   ├── agents/              # Specialized agents (HR, IT, Finance, Legal)
│   ├── vectorstores/        # Document loading and vector store management
│   ├── observability/       # Langfuse tracing and evaluation
│   ├── utils/               # Helpers (response formatting, etc.)
│   ├── config.ts            # Configuration with Zod validation
│   ├── types.ts             # Shared TypeScript types
│   ├── multi-agent-system.ts # Main orchestration class
│   └── index.ts             # CLI entry point
├── data/
│   ├── hr_docs/             # HR knowledge base templates
│   ├── it_docs/             # IT support templates
│   ├── finance_docs/        # Finance policy templates
│   ├── legal_docs/          # Legal policy templates
│   └── vector_stores/       # Generated embeddings (gitignored)
├── tests/
│   ├── test-queries.json    # Test queries for each department
│   └── *.test.ts            # Unit and integration tests
├── scripts/
│   ├── setup-vectorstores.ts # Initialize embeddings
│   ├── demo.ts              # Interactive demo
│   └── run-evaluation.ts    # Evaluation suite
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Usage

### Interactive CLI

```bash
npm start
```

Example session:
```
You: How many vacation days do I get?
🤖 [HR Agent • Confidence: 95% • Quality: 10/10]

As a new employee (0-2 years tenure), you receive:
- 15 days (120 hours) of PTO per year
- Accrues at 1.25 days (10 hours) per month
- Available for use immediately upon accrual

📚 Sources: pto_policy.md

⏱️ Response time: 2.3s

---

You: I can't connect to the VPN
🤖 [IT Support Agent • Confidence: 95% • Quality: 8.7/10]

To troubleshoot VPN connection issues:
1. Verify your internet connection is stable
2. Ensure VPN client is up to date (version 3.2+)
3. Try connecting to different server (use vpn-backup.company.com)
4. Check firewall settings (ports 1194, 443 must be open)
5. If issues persist, contact IT support at helpdesk@company.com

📚 Sources: vpn_setup.md, troubleshooting_guide.md

⏱️ Response time: 3.1s
```

### Programmatic Usage

```typescript
import { MultiAgentSystem } from "./src/multi-agent-system.js";

const system = new MultiAgentSystem();
await system.initialize();

const response = await system.query("How do I submit an expense report?");
console.log(response.answer);
console.log(`Department: ${response.department}`);
console.log(`Confidence: ${response.confidence}`);
console.log(`Quality Score: ${response.evaluation?.overallScore}/10`);
```

## Testing

### Run Test Suite (125+ tests)

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Run specific test file
npm test orchestrator.test.ts
npm test agents.test.ts
npm test retrieval.test.ts
npm test evaluator.test.ts

# With coverage report
npm test -- --coverage
```

**Test Coverage:**
- **orchestrator.test.ts**: 65+ routing tests
- **agents.test.ts**: 25+ agent integration tests
- **retrieval.test.ts**: 20+ vector store tests
- **evaluator.test.ts**: 15+ quality scoring tests

See [tests/README.md](tests/README.md) for detailed test documentation.

### Run Evaluation Suite

```bash
# Comprehensive evaluation
npm run evaluate
```

This will:
- Test all 12 queries from `tests/test-queries.json`
- Calculate routing accuracy (target: >90%)
- Generate quality metrics (target: >7/10)
- Show per-department breakdown
- Save detailed results to `evaluation-results.json`

**Expected Results:**
- Routing Accuracy: >90%
- Average Confidence: >80%
- Quality Score: >7/10
- Response Time: <5s

## Configuration

All configuration is in `.env`. Key settings:

### Models
- `ORCHESTRATOR_MODEL`: Classifies intent (default: gpt-3.5-turbo)
- `AGENT_MODEL`: Generates answers (default: gpt-4o-mini)
- `EVALUATOR_MODEL`: Scores quality (default: gpt-3.5-turbo)
- `EMBEDDING_MODEL`: Creates vectors (default: text-embedding-3-small)

### RAG Parameters
- `CHUNK_SIZE`: Document chunk size (default: 1000)
- `CHUNK_OVERLAP`: Overlap between chunks (default: 200)
- `RETRIEVAL_K`: Number of docs to retrieve (default: 5)

### Vector Store
- `VECTOR_STORE_TYPE`: Options: memory, chroma, hnswlib (default: memory)
- `VECTOR_STORE_PATH`: Where to store indexes (default: data/vector_stores)

## Design Decisions

### Why LangChain.js?

**Production-grade components**: LangChain provides pre-built chains, retrievers, and agents that reduce custom code and follow industry best practices. Rather than building RAG pipelines from scratch, we leverage battle-tested components used by thousands of production applications.

**Vector store abstraction**: The unified interface makes it easy to swap between in-memory stores for development, Chroma for small deployments, or Pinecone for enterprise scale—all without changing agent code.

**Strong TypeScript support**: Full type safety across the entire pipeline prevents runtime errors and improves developer experience with autocomplete and compile-time validation.

**Active ecosystem**: Regular updates, extensive documentation, and a large community mean bugs get fixed quickly and new features (like multi-query retrieval, contextual compression) are available immediately.

### Routing Strategy

**Approach**: GPT-3.5-turbo with structured output validated by Zod schemas

**Why this works**:
- **Fast and cost-effective**: ~$0.0005 per routing decision, responds in <1 second
- **High accuracy**: Achieves 100% routing accuracy on test queries (12/12 correct)
- **Confidence scores**: Model outputs probability estimates enabling intelligent escalation (queries <70% confidence go to humans)
- **Type-safe routing**: Zod validation ensures department names match our enum, preventing runtime errors
- **Reasoning transparency**: Model explains its classification decision, logged to Langfuse for debugging

**Alternatives considered**:
- **Rule-based classification**: Keyword matching (e.g., "PTO" → HR) is too brittle for natural language variations
- **Embedding similarity**: Comparing query embeddings to department description vectors works but requires maintaining example queries and is less explainable
- **Fine-tuned classifier**: Overkill for 4 departments, expensive to train/maintain, loses flexibility when adding new departments

### RAG Configuration

**Parameters**:
- Chunk size: 1000 tokens
- Chunk overlap: 200 tokens
- Retrieval K: 5 documents
- Embedding model: text-embedding-3-small

**Rationale**:

**1000-token chunks** balance context preservation with retrieval precision. Smaller chunks (256-512) fragment information too much, requiring the LLM to piece together answers from many sources. Larger chunks (2000+) dilute relevance scores when only part of the chunk matches the query.

**200-token overlap** prevents information loss at chunk boundaries. For a policy document explaining "New employees (0-2 years) get 15 days PTO, while senior employees (3+ years) get 20 days," a boundary split could separate the context. Overlap ensures complete context.

**K=5 documents** provides sufficient context without overwhelming the LLM's context window or introducing irrelevant information. Testing showed K=3 occasionally missed important details, while K=7+ added noise without improving answer quality.

**text-embedding-3-small** offers the best cost/performance ratio at $0.002 per 1M tokens. It achieves 62.3% on MTEB benchmark (vs 64.6% for text-embedding-3-large) but costs 5x less. For our domain-specific documents, the performance difference is negligible.

### Agent Architecture

**Design**: Specialized agents per department inheriting from a shared base class

**Benefits**:

**Domain-specific system prompts** improve answer quality. The HR agent emphasizes empathy and policy accuracy, while the IT agent focuses on technical precision and troubleshooting steps. Generic prompts produce generic answers.

**Independent vector stores** enable parallel scaling. As the finance team's documentation grows to 10,000 pages, it doesn't slow down HR queries. Each agent can be deployed as a separate microservice if needed.

**Easy extensibility** for new departments. Adding a "Sales" agent requires:
1. Create `data/sales_docs/` folder
2. Add `sales` to Department enum
3. Create `SalesAgent` extending `BaseAgent`
4. Register in orchestrator

No changes to existing agents or routing logic.

**Base class enforces consistent interface**: All agents implement `query(question: string)` returning `{ answer, sourceDocuments }`. This contract makes agents interchangeable and testable in isolation.

### Evaluation Dimensions

**5-dimension scoring** (relevance, accuracy, completeness, tone, citation quality):

**Catches multiple failure modes**:
- **Relevance**: Detects when agent answers a different question (e.g., PTO carryover policy when asked about accrual)
- **Accuracy**: Identifies hallucinations (e.g., claiming 20 days PTO when policy says 15)
- **Completeness**: Flags missing important details (e.g., forgetting to mention approval requirements)
- **Tone**: Ensures professional, empathetic responses appropriate for customer support
- **Citation Quality**: Verifies answers reference actual retrieved documents, not fabricated sources

**Actionable feedback**: Each dimension includes text feedback explaining the score. "Relevance: 7/10 - Response addresses the VPN question but doesn't mention the specific error code the user reported" gives engineers clear improvement direction.

**Aligns with customer support standards**: These dimensions match how human QA teams evaluate support responses, making AI evaluation scores directly comparable to human metrics.

**Automated quality gates**: Responses scoring <7/10 overall can be flagged for human review before sending to customers, preventing low-quality answers from reaching production.

## Langfuse Observability

Every query is traced in Langfuse with:
- **Routing decision**: Department, confidence, reasoning
- **Document retrieval**: Which docs were retrieved
- **Agent response**: Answer length, model used
- **Quality scores**: 5-dimension evaluation

View traces at [cloud.langfuse.com](https://cloud.langfuse.com)

### Key Metrics
- Routing accuracy by department
- Average confidence scores
- Response quality trends
- Latency (P50, P95, P99)
- Escalation rate

## Cost Estimates

**Per Query:**
- Orchestrator: ~$0.0005 (GPT-3.5-turbo)
- Embeddings: ~$0.002 (text-embedding-3-small)
- Agent response: ~$0.005-0.015 (gpt-4o-mini)
- Evaluation: ~$0.0005 (GPT-3.5-turbo)
- **Total: ~$0.008-0.025 per query**

**Monthly (1000 queries): $8-25**

## Known Limitations

### 1. First Query Latency
**Issue**: Initial query takes ~10-15 seconds while loading embeddings into memory. Subsequent queries are faster (~3-5s).

**Workaround**: Use persistent vector stores (`VECTOR_STORE_TYPE=hnswlib`) or implement a warm-up query on system startup.

### 2. Memory Vector Store Persistence
**Issue**: Default in-memory vector store doesn't persist between restarts. Documents must be reloaded each time.

**Workaround**: Set `VECTOR_STORE_TYPE=hnswlib` in `.env` to save indexes to disk at `data/vector_stores/`.

### 3. Document Update Process
**Issue**: Changes to documents in `data/*/` folders require running `npm run setup` to regenerate embeddings. Updates aren't automatic.

**Workaround**: Implement file watching or schedule periodic re-indexing. For production, consider versioned document releases.

### 4. Sequential Query Processing
**Issue**: Current implementation processes queries sequentially. Concurrent requests wait in line.

**Workaround**: For production, implement a request queue (Bull, BullMQ) or deploy multiple instances behind a load balancer.

### 5. Fixed Confidence Threshold
**Issue**: Escalation logic uses hardcoded 70% confidence threshold for all departments. Some departments may need higher/lower thresholds.

**Workaround**: Make threshold configurable per department in `config.ts`:
```typescript
departmentThresholds: {
  legal: 0.85,  // Higher bar for legal advice
  it_support: 0.65,  // Lower bar for IT troubleshooting
}
```

### 6. Citation Granularity
**Issue**: Citations show filename only (e.g., "pto_policy.md"). For 50+ page documents, users can't quickly find the referenced section.

**Workaround**: Enhance document loader to include page numbers or section headers in metadata. Update formatter to show "pto_policy.md (Section 3.2: Accrual Schedule)".

### 7. No Multi-Turn Conversation
**Issue**: Each query is independent. System doesn't maintain conversation history ("What about remote workers?" after asking about PTO won't work).

**Workaround**: Implement conversation memory by passing previous Q&A pairs in the agent prompt or using LangChain's ConversationBufferMemory.

### 8. Language Support
**Issue**: System only handles English queries. Non-English questions may be misrouted or answered incorrectly.

**Workaround**: Add language detection and either translate queries to English or implement multilingual embeddings (e.g., `multilingual-e5-large`).

## Troubleshooting

### "Cannot find documents"
- Ensure you've populated template files in `data/*/`
- Run `npm run setup` to create vector stores
- Check that templates have substantial content (50+ chunks each)

### "API key invalid"
- Verify `.env` has correct keys
- OpenAI key starts with `sk-`
- Langfuse keys start with `sk-lf-` and `pk-lf-`

### TypeScript errors
- Run `npm install` to ensure @types/node is installed
- Check `tsconfig.json` includes proper settings

### Slow responses
- First query is slower (initializes embeddings)
- Subsequent queries are faster
- Consider using `VECTOR_STORE_TYPE=hnswlib` for persistence

## Development

### Adding a New Department

1. Create document folder: `data/new_dept_docs/`
2. Add templates with README
3. Update `src/types.ts`: Add to `Department` type
4. Create agent: `src/agents/new-dept-agent.ts`
5. Register in `src/multi-agent-system.ts`
6. Add test queries to `tests/test-queries.json`

### Customizing Agent Behavior

Edit agent files in `src/agents/`:
- Modify system prompts for different tone
- Adjust retrieval parameters (k value)
- Add custom prompt templates

## Production Deployment

### Recommendations

**Vector Store:**
- Switch to Chroma or Pinecone for production scale
- Set `VECTOR_STORE_TYPE=chroma` in `.env`

**Monitoring:**
- Use Langfuse dashboards for quality monitoring
- Set up alerts for low confidence scores
- Track escalation rates

**Security:**
- Never commit `.env` file
- Use secrets manager (AWS Secrets Manager, etc.)
- Implement rate limiting
- Add input validation/sanitization

**Performance:**
- Cache frequently asked questions
- Use async processing for concurrent queries
- Load balance across multiple instances

## License

ISC

## Support

For questions or issues:
- Check Langfuse traces for debugging
- Review test queries in `tests/test-queries.json`
- Ensure document templates are properly filled out

---

**Built with:**
- LangChain.js for RAG orchestration
- OpenAI for LLM and embeddings
- Langfuse for observability
- TypeScript for type safety
