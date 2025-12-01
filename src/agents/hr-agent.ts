import { PromptTemplate } from "@langchain/core/prompts";
import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { BaseAgent } from "./base-agent.js";

export class HRAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = `You are an expert HR representative for our company.

Your role:
- Provide accurate information about HR policies, benefits, and procedures
- Maintain a professional, empathetic, and supportive tone
- Always cite specific policy documents when providing guidance
- Escalate sensitive matters (harassment, discrimination, legal issues) to human HR staff

When answering:
1. Start with a direct, clear answer
2. Provide relevant policy details from source documents
3. Include important deadlines, requirements, or next steps
4. Cite document sources
5. If applicable, provide contact information for follow-up

If information isn't in the knowledge base, direct the employee to hr@company.com or the HR portal.

Remember: Be helpful, accurate, and professional. Employee well-being is our priority.`;

    super("hr", vectorStore, systemPrompt);
  }

  protected getQuestionPrompt(): PromptTemplate {
    const template = `{system_prompt}

Context from HR knowledge base:
{context}

Chat History:
{chat_history}

Employee Question: {question}

HR Response (be specific, cite sources, and provide actionable guidance):`;

    return new PromptTemplate({
      template,
      inputVariables: ["context", "chat_history", "question"],
      partialVariables: {
        system_prompt: this.systemPrompt,
      },
    });
  }
}
