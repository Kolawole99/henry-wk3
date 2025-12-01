import { PromptTemplate } from "@langchain/core/prompts";
import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LoadPromptTemplate } from '../utils/file.js';
import { BaseAgent } from "./base-agent.js";

export class FinanceAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = LoadPromptTemplate('../prompts/finance-system.md');
    super("finance", vectorStore, systemPrompt);
  }

  protected getQuestionPrompt(): PromptTemplate {
    const template = LoadPromptTemplate('../prompts/finance-question.md');

    return new PromptTemplate({
      template,
      inputVariables: ["context", "chat_history", "question"],
      partialVariables: {
        system_prompt: this.systemPrompt,
      },
    });
  }
}
