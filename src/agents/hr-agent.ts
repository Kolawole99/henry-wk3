import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LoadPromptTemplate } from '../utils/file.js';
import { BaseAgent } from "./base-agent.js";

export class HRAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = LoadPromptTemplate('../prompts/hr-system.md');
    super("hr", vectorStore, systemPrompt);
  }

  protected buildSystemMessage(): string {
    const template = LoadPromptTemplate('../prompts/hr-question.md');

    return template
      .replace('{system_prompt}', this.systemPrompt)
      .replace('{question}', '{input}')
      .replace('{chat_history}', '');
  }
}
