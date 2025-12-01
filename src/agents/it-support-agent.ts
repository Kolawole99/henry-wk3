import { PromptTemplate } from "@langchain/core/prompts";
import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LoadPromptTemplate } from '../utils/file.js';
import { BaseAgent } from "./base-agent.js";

export class ITSupportAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = LoadPromptTemplate('../prompts/it-support-system.md');
    super("it_support", vectorStore, systemPrompt);
  }

  protected getQuestionPrompt(): PromptTemplate {
    const template = LoadPromptTemplate('../prompts/it-support-question.md');

    return new PromptTemplate({
      template,
      inputVariables: ["context", "chat_history", "question"],
      partialVariables: {
        system_prompt: this.systemPrompt,
      },
    });
  }
}
