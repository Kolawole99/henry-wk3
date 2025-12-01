import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { LoadPromptTemplate } from '../utils/file.js';
import { RoutingDecisionSchema, type RoutingDecision } from "../types.js";
import { config } from "../config.js";

export class Orchestrator {
  private llm: ChatOpenAI;
  private promptTemplate: ChatPromptTemplate;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: config.openai.apiKey,
      modelName: config.models.orchestrator,
      temperature: 0,
    });

    this.promptTemplate = this.createPromptTemplate();
  }

  /**
   * Create the prompt template for routing
   */
  private createPromptTemplate() {
    const systemPrompt = LoadPromptTemplate('../prompts/routing.md');
    
    return ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", "User Query: {query}\n\nProvide routing decision as JSON:"],
    ]);
  }

  /**
   * Route a user query to the appropriate department
   */
  async route(query: string): Promise<RoutingDecision> {
    try {
      const messages = await this.promptTemplate.formatMessages({ query });
      const response = await this.llm.invoke(messages as any);

      const content = response.content as string;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const parsedResponse = JSON.parse(jsonMatch[0]);
      const validated = RoutingDecisionSchema.parse(parsedResponse);

      return validated;
    } catch (error) {
      console.error("Error in orchestrator routing:", error);

      return {
        department: "hr",
        confidence: 0.3,
        reasoning: "Failed to classify query, defaulting to HR for general support",
        requiresEscalation: false,
        keywords: [],
      };
    }
  }
}
