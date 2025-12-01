import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LoadPromptTemplate } from '../utils/file.js';
import { BaseAgent } from "./base-agent.js";

export class ITSupportAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = LoadPromptTemplate('../prompts/it-support-system.md');
    super("it_support", vectorStore, systemPrompt);
  }

  protected buildSystemMessage(): string {
    const template = LoadPromptTemplate('../prompts/it-support-question.md');

    return template
      .replace('{system_prompt}', this.systemPrompt)
      .replace('{question}', '{input}')
      .replace('{chat_history}', '');
  }
}
