import { PromptTemplate } from "@langchain/core/prompts";
import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LoadPromptTemplate } from '../utils/file.js';
import { BaseAgent } from "./base-agent.js";

export class HRAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = LoadPromptTemplate('../prompts/hr-system.md');
    super("hr", vectorStore, systemPrompt);
  }

  protected getQuestionPrompt(): PromptTemplate {
    const template = LoadPromptTemplate('../prompts/hr-question.md');

    return new PromptTemplate({
      template,
      inputVariables: ["context", "chat_history", "question"],
      partialVariables: {
        system_prompt: this.systemPrompt,
      },
    });
  }
}
