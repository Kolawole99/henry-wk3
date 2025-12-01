import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { OpenAIClient, type LLMConfig } from "../utils/openai-client.js";
import type { Department, AgentResponse } from "../types.js";
import { config } from "../config.js";

export abstract class BaseAgent {
  protected department: Department;
  protected vectorStore: MemoryVectorStore;
  protected llm: ChatOpenAI;
  protected systemPrompt: string;
  protected chain!: Awaited<ReturnType<typeof createRetrievalChain>>;
  protected chatHistory: BaseMessage[] = [];

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

    this.initializeChain();
  }

  private async initializeChain(): Promise<void> {
    this.chain = await this.createChain();
  }

  /**
   * Create the conversational retrieval chain using the new approach
   */
  private async createChain() {
    const retriever = this.vectorStore.asRetriever(config.rag.retrievalK);

    const contextualizeQSystemPrompt = `
      Given a chat history and the latest user question which might reference context
      in the chat history, formulate a standalone question which can be understood
      without the chat history. Do NOT answer the question, just reformulate it if
      needed and otherwise return it as is.`;

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextualizeQSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: this.llm,
      retriever,
      rephrasePrompt: contextualizeQPrompt as any,
    });

    const systemMessage = this.buildSystemMessage();
    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", systemMessage],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const questionAnswerChain = await createStuffDocumentsChain({
      llm: this.llm,
      prompt: qaPrompt as any,
    });

    return await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain: questionAnswerChain,
    });
  }

  /**
   * Build the system message for the agent
   * Subclasses should override to customize behavior
   */
  protected abstract buildSystemMessage(): string;

  /**
   * Query the agent with a user question
   */
  async query(userQuery: string): Promise<AgentResponse> {
    try {
      if (!this.chain) {
        await this.initializeChain();
      }

      const response = await this.chain.invoke({
        input: userQuery,
        chat_history: this.chatHistory as any,
      });

      this.chatHistory.push(new HumanMessage(userQuery));
      this.chatHistory.push(new AIMessage(String(response.answer)));

      return {
        answer: response.answer as string,
        sourceDocuments: response.context || [],
        department: this.department,
      };
    } catch (error) {
      console.error(`Error in ${this.department} agent:`, error);
      
      throw new Error(`Failed to get response from ${this.department} agent: ${error}`);
    }
  }

  /**
   * Reset conversation memory
   */
  resetMemory(): void {
    this.chatHistory = [];
  }

  /**
   * Get department name
   */
  getDepartment(): Department {
    return this.department;
  }
}
