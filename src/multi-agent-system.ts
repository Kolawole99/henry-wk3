import { randomUUID } from "crypto";
import { VectorStoreManager } from "./vectorstores/vector-store-manager.js";
import { Orchestrator } from "./agents/orchestrator.js";
import { HRAgent } from "./agents/hr-agent.js";
import { ITSupportAgent } from "./agents/it-support-agent.js";
import { FinanceAgent } from "./agents/finance-agent.js";
import { LegalAgent } from "./agents/legal-agent.js";
import { LangfuseTracer } from "./observability/langfuse-tracer.js";
import { ResponseEvaluator } from "./observability/evaluator.js";
import { ResponseFormatter } from "./utils/response-formatter.js";
import type { BaseAgent } from "./agents/base-agent.js";
import type { Department, SystemQueryResponse } from "./types.js";
import { config } from "./config.js";

export class MultiAgentSystem {
  private tracer: LangfuseTracer;
  private orchestrator: Orchestrator;
  private initialized: boolean = false;
  private evaluator: ResponseEvaluator;
  private agents: Map<Department, BaseAgent>;
  private vectorStoreManager: VectorStoreManager;

  constructor() {
    this.agents = new Map();
    this.tracer = new LangfuseTracer();
    this.orchestrator = new Orchestrator();
    this.evaluator = new ResponseEvaluator();
    this.vectorStoreManager = new VectorStoreManager();
  }

  /**
   * Initialize the multi-agent system
   */
  async initialize(forceRebuild: boolean = false): Promise<void> {
    if (this.initialized) {
      console.log("System already initialized");
      return;
    }

    console.log("Initializing Multi-Agent System");

    try {
      await this.vectorStoreManager.initializeAll(forceRebuild);

      const vectorStores = this.vectorStoreManager.getAllVectorStores();

      console.log("Creating specialized agents");

      const hrStore = vectorStores.get("hr");
      const itStore = vectorStores.get("it_support");
      const financeStore = vectorStores.get("finance");
      const legalStore = vectorStores.get("legal");

      if (!hrStore || !itStore || !financeStore || !legalStore) {
        throw new Error("Failed to initialize all vector stores");
      }

      this.agents.set("hr", new HRAgent(hrStore));
      this.agents.set("it_support", new ITSupportAgent(itStore));
      this.agents.set("finance", new FinanceAgent(financeStore));
      this.agents.set("legal", new LegalAgent(legalStore));

      console.log("All agents initialized!");

      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize system:", error);
      
      throw error;
    }
  }

  /**
   * Process a user query through the multi-agent system
   */
  async query(userQuery: string, sessionId?: string): Promise<SystemQueryResponse> {
    if (!this.initialized) {
      throw new Error("System not initialized. Call initialize() first.");
    }

    const traceId = sessionId || randomUUID();

    try {
      console.log("Routing query");

      this.tracer.createTrace(traceId, userQuery);

      const routingDecision = await this.orchestrator.route(userQuery);

      this.tracer.logRouting(traceId, routingDecision);

      if (routingDecision.requiresEscalation) {
        const escalationMessage =
          "This query requires human intervention. A member of our team will contact you shortly. Please email support@company.com for urgent matters.";

        this.tracer.updateTrace(traceId, {
          escalated: true,
          message: escalationMessage,
        });

        await this.tracer.flush();

        return {
          answer: escalationMessage,
          department: routingDecision.department,
          confidence: routingDecision.confidence,
          requiresEscalation: true,
          sourceDocuments: [],
          sessionId: traceId,
        };
      }

      console.log(`Querying ${ResponseFormatter.formatDepartmentName(routingDecision.department)} agent`);

      const agent = this.agents.get(routingDecision.department);
      if (!agent) {
        throw new Error(`Agent for ${routingDecision.department} not found`);
      }

      const agentResponse = await agent.query(userQuery);
      
      this.tracer.logAgentQuery(
        traceId,
        routingDecision.department,
        userQuery,
        agentResponse
      );

      let evaluation = undefined;
      if (config.observability.enableEvaluation) {
        console.log(`Evaluating response quality`);

        evaluation = await this.evaluator.evaluate(
          userQuery,
          agentResponse.answer,
          agentResponse.sourceDocuments
        );

        this.tracer.logEvaluation(traceId, evaluation);
      }

      const formattedAnswer = ResponseFormatter.formatWithCitations(
        agentResponse.answer,
        agentResponse.sourceDocuments
      );

      this.tracer.updateTrace(traceId, {
        answer: formattedAnswer,
        department: routingDecision.department,
        confidence: routingDecision.confidence,
        qualityScore: evaluation?.overallScore,
      });

      await this.tracer.flush();

      return {
        answer: formattedAnswer,
        department: routingDecision.department,
        confidence: routingDecision.confidence,
        requiresEscalation: false,
        sourceDocuments: agentResponse.sourceDocuments,
        evaluation,
        sessionId: traceId,
      };
    } catch (error) {
      console.error(`\n❌ Error processing query:`, error);

      this.tracer.updateTrace(traceId, { error: String(error) });
      await this.tracer.flush();

      throw error;
    }
  }

  /**
   * Shutdown the system gracefully
   */
  async shutdown(): Promise<void> {
    console.log("Shutting down Multi-Agent System");
    
    await this.tracer.shutdown();
    
    console.log("Shutdown complete");
  }
}
