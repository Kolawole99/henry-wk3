import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LoadPromptTemplate } from '../utils/file.js';
import { BaseAgent } from "./base-agent.js";

export class FinanceAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = LoadPromptTemplate('../prompts/finance-system.md');
    super("finance", vectorStore, systemPrompt);
  }

  protected buildSystemMessage(): string {
    const template = LoadPromptTemplate('../prompts/finance-question.md');

    return template
      .replace('{system_prompt}', this.systemPrompt)
      .replace('{question}', '{input}')
      .replace('{chat_history}', '');
  }
}
