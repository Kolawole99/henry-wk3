import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LoadPromptTemplate } from '../utils/file.js';
import { BaseAgent } from "./base-agent.js";

export class LegalAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = LoadPromptTemplate('../prompts/legal-system.md');
    super("legal", vectorStore, systemPrompt);
  }

  protected buildSystemMessage(): string {
    const template = LoadPromptTemplate('../prompts/legal-question.md');

    return template
      .replace('{system_prompt}', this.systemPrompt)
      .replace('{question}', '{input}')
      .replace('{chat_history}', '');
  }
}
