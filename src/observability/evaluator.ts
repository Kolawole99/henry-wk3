import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import type { Document } from "langchain/document";
import { QualityScoresSchema, type QualityScores } from "../types.js";
import { config } from "../config.js";
import { LoadPromptTemplate } from '../utils/file.js';

export class ResponseEvaluator {
  private llm: ChatOpenAI;
  private chain: any;

  constructor() {
    this.llm = new ChatOpenAI({
      openAIApiKey: config.openai.apiKey,
      modelName: config.models.evaluator,
      temperature: 0,
    });

    this.chain = this.createEvaluationChain();
  }

  /**
   * Create the evaluation chain
   */
  private createEvaluationChain() {
    const systemPrompt = LoadPromptTemplate('../prompts/evaluator-system.md');
    const humanPrompt = LoadPromptTemplate('../prompts/evaluator-human.md');

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      ["human", humanPrompt],
    ]);

    const parser = new JsonOutputParser();

    return prompt.pipe(this.llm).pipe(parser);
  }

  /**
   * Evaluate a response
   */
  async evaluate(
    query: string,
    response: string,
    sourceDocuments: Document[]
  ): Promise<QualityScores> {
    try {
      const sourcesText = sourceDocuments
        .map((doc, i) => {
          const fileName = doc.metadata.fileName || "Unknown";
          const preview = doc.pageContent.substring(0, 200);
          return `[${i + 1}] ${fileName}: ${preview}...`;
        })
        .join("\n\n");

      const result = await this.chain.invoke({
        query,
        response,
        sources: sourcesText || "No source documents provided",
      });

      const validated = QualityScoresSchema.parse(result);

      return validated;
    } catch (error) {
      console.error("Error evaluating response:", error);

      return {
        relevance: 5,
        accuracy: 5,
        completeness: 5,
        tone: 5,
        citationQuality: 5,
        overallScore: 5,
        feedback: "Evaluation failed - default scores provided",
      };
    }
  }
}
