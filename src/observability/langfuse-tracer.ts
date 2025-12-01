import { Langfuse } from "langfuse";
import { config } from "../config.js";
import type { RoutingDecision, AgentResponse, QualityScores } from "../types.js";

export class LangfuseTracer {
  private langfuse: Langfuse;
  private enabled: boolean;

  constructor() {
    this.enabled = config.observability.enableTracing;

    if (this.enabled) {
      this.langfuse = new Langfuse({
        secretKey: config.langfuse.secretKey,
        publicKey: config.langfuse.publicKey,
        baseUrl: config.langfuse.host,
      });
    } else {
      this.langfuse = {} as Langfuse;
    }
  }

  /**
   * Create a new trace for a user query
   */
  createTrace(sessionId: string, query: string) {
    if (!this.enabled) {
      return null;
    }

    return this.langfuse.trace({
      id: sessionId,
      name: "multi_agent_query",
      input: { query },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Log orchestrator routing decision
   */
  logRouting(
    traceId: string,
    routingDecision: RoutingDecision
  ) {
    if (!this.enabled) {
      return;
    }

    this.langfuse.span({
      traceId,
      name: "orchestrator_routing",
      input: {},
      output: routingDecision,
      metadata: {
        department: routingDecision.department,
        confidence: routingDecision.confidence,
        reasoning: routingDecision.reasoning,
        requiresEscalation: routingDecision.requiresEscalation,
        keywords: routingDecision.keywords,
      },
    });
  }

  /**
   * Log agent query and response
   */
  logAgentQuery(
    traceId: string,
    department: string,
    query: string,
    response: AgentResponse
  ) {
    if (!this.enabled) {
      return;
    }

    this.langfuse.span({
      traceId,
      name: `${department}_agent_query`,
      input: { query },
      output: {
        answer: response.answer,
        numSources: response.sourceDocuments.length,
      },
      metadata: {
        department,
        answerLength: response.answer.length,
        sources: response.sourceDocuments.map((doc) => doc.metadata.fileName || "Unknown"),
      },
    });
  }

  /**
   * Log quality evaluation score
   */
  logEvaluation(
    traceId: string,
    scores: QualityScores
  ) {
    if (!this.enabled) {
      return;
    }

    this.langfuse.score({
      traceId,
      name: "response_quality",
      value: scores.overallScore,
      comment: scores.feedback,
    });

    this.langfuse.span({
      traceId,
      name: "quality_evaluation",
      input: {},
      output: scores,
      metadata: {
        relevance: scores.relevance,
        accuracy: scores.accuracy,
        completeness: scores.completeness,
        tone: scores.tone,
        citationQuality: scores.citationQuality,
        overallScore: scores.overallScore,
      },
    });
  }

  /**
   * Update trace with final output
   */
  updateTrace(traceId: string, output: any) {
    if (!this.enabled) {
      return;
    }

    this.langfuse.trace({ id: traceId, output });
  }

  /**
   * Flush pending events (call before process exit)
   */
  async flush() {
    if (!this.enabled) {
      return;
    }

    await this.langfuse.flushAsync();
  }

  /**
   * Shutdown Langfuse client
   */
  async shutdown() {
    if (!this.enabled) {
      return;
    }

    await this.langfuse.shutdownAsync();
  }
}
