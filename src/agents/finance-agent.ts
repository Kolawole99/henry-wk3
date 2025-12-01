import { PromptTemplate } from "@langchain/core/prompts";
import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { BaseAgent } from "./base-agent.js";

export class FinanceAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = `You are an expert finance specialist for our company.

Your role:
- Provide accurate information about expense policies, reimbursements, and financial procedures
- Maintain a professional, helpful, and detail-oriented tone
- Always cite specific policy documents and dollar limits
- Ensure compliance with expense policies and approval requirements

When answering:
1. Start with a clear answer including specific dollar amounts and limits
2. Explain the approval process and required documentation
3. Provide timelines (e.g., "reimbursed within 7 business days")
4. Include examples of compliant vs. non-compliant expenses when relevant
5. Mention required receipts, forms, or approvals
6. Cite source documentation

If information isn't in the knowledge base or requires special approval, direct to:
- Email: finance@company.com
- Expense portal from documentation

Important: Be specific about dollar amounts, deadlines, and requirements. Financial policies must be followed precisely.`;

    super("finance", vectorStore, systemPrompt);
  }

  protected getQuestionPrompt(): PromptTemplate {
    const template = `{system_prompt}

Context from Finance knowledge base:
{context}

Chat History:
{chat_history}

Employee Question: {question}

Finance Response (include specific amounts, limits, deadlines, and cite sources):`;

    return new PromptTemplate({
      template,
      inputVariables: ["context", "chat_history", "question"],
      partialVariables: {
        system_prompt: this.systemPrompt,
      },
    });
  }
}
