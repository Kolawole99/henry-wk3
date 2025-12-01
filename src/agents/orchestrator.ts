import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { LoadPromptTemplate } from '../utils/file.js';
import { RoutingDecisionSchema, type RoutingDecision } from "../types.js";
import { config } from "../config.js";

export class Orchestrator {
  private llm: ChatOpenAI;
  private chain: any;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: config.openai.apiKey,
      modelName: config.models.orchestrator,
      temperature: 0,
    });

    this.chain = this.createRoutingChain();
  }

  /**
   * Create the routing chain with structured output
   */
  private createRoutingChain() {
    const systemPrompt = LoadPromptTemplate('../prompts/routing.md');
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", "User Query: {query}\n\nProvide routing decision as JSON:"],
    ]);

    const parser = new JsonOutputParser();

    return prompt.pipe(this.llm).pipe(parser);
  }

  /**
   * Route a user query to the appropriate department
   */
  async route(query: string): Promise<RoutingDecision> {
    try {
      const response = await this.chain.invoke({ query });
      const validated = RoutingDecisionSchema.parse(response);

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
