import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PromptTemplate } from "@langchain/core/prompts";
import type { Department, AgentResponse } from "../types.js";
import { config } from "../config.js";
import { OpenAIClient, type LLMConfig } from "../utils/openai-client.js";

export abstract class BaseAgent {
  protected department: Department;
  protected vectorStore: MemoryVectorStore;
  protected llm: ChatOpenAI;
  protected systemPrompt: string;
  protected chain: ConversationalRetrievalQAChain;
  protected memory: BufferMemory;

  constructor(
    department: Department,
    vectorStore: MemoryVectorStore,
    systemPrompt: string,
    llmConfig?: LLMConfig
  ) {
    this.department = department;
    this.vectorStore = vectorStore;
    this.systemPrompt = systemPrompt;

    this.llm = OpenAIClient.createForUseCase("agent", {
      temperature: 0,
      ...llmConfig,
    });

    this.memory = new BufferMemory({
      memoryKey: "chat_history",
      returnMessages: true,
      outputKey: "text",
    });

    this.chain = this.createChain();
  }

  /**
   * Create the conversational retrieval chain
   */
  private createChain(): ConversationalRetrievalQAChain {
    const questionPrompt = this.getQuestionPrompt();

    return ConversationalRetrievalQAChain.fromLLM(
      this.llm,
      this.vectorStore.asRetriever(config.rag.retrievalK),
      {
        memory: this.memory,
        returnSourceDocuments: true,
        qaChainOptions: {
          type: "stuff",
          prompt: questionPrompt,
        },
      }
    );
  }

  /**
   * Get the custom prompt template for this agent
   * Subclasses should override to customize behavior
   */
  protected abstract getQuestionPrompt(): PromptTemplate;

  /**
   * Query the agent with a user question
   */
  async query(userQuery: string): Promise<AgentResponse> {
    try {
      const response = await this.chain.call({
        question: userQuery,
      });

      return {
        answer: response.text,
        sourceDocuments: response.sourceDocuments || [],
        department: this.department,
      };
    } catch (error) {
      console.error(`Error in ${this.department} agent:`, error);
      throw new Error(
        `Failed to get response from ${this.department} agent: ${error}`
      );
    }
  }

  /**
   * Reset conversation memory
   */
  resetMemory(): void {
    this.memory.clear();
  }

  /**
   * Get department name
   */
  getDepartment(): Department {
    return this.department;
  }
}
