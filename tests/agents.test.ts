import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MultiAgentSystem } from "../src/multi-agent-system.js";

describe("Agent Responses", () => {
  let system: MultiAgentSystem;

  beforeAll(async () => {
    console.log("Initializing Multi-Agent System for testing...");
    system = new MultiAgentSystem();
    await system.initialize();
    console.log("System initialized successfully");
  }, 60000); // 60 second timeout for initialization

  afterAll(async () => {
    await system.shutdown();
  });

  describe("HR Agent", () => {
    it("should return answer with source documents for PTO query", async () => {
      const response = await system.query("How many vacation days do I get as a new employee?");

      expect(response.answer).toBeDefined();
      expect(response.answer.length).toBeGreaterThan(50);
      expect(response.department).toBe("hr");
      expect(response.sourceDocuments).toBeDefined();
      expect(response.sourceDocuments.length).toBeGreaterThan(0);
      expect(response.confidence).toBeGreaterThan(0);
    }, 30000);

    it("should provide relevant answer about remote work policy", async () => {
      const response = await system.query("Can I work remotely full-time?");

      expect(response.answer).toBeDefined();
      expect(response.department).toBe("hr");
      expect(response.answer.toLowerCase()).toMatch(/remote|work from home|wfh/);
    }, 30000);

    it("should cite source documents in response", async () => {
      const response = await system.query("What's the deadline for performance reviews?");

      expect(response.sourceDocuments.length).toBeGreaterThan(0);
      expect(response.sourceDocuments[0]).toHaveProperty("pageContent");
      expect(response.sourceDocuments[0]).toHaveProperty("metadata");
    }, 30000);
  });

  describe("IT Support Agent", () => {
    it("should return answer for VPN troubleshooting query", async () => {
      const response = await system.query("I can't connect to the VPN from home. What should I do?");

      expect(response.answer).toBeDefined();
      expect(response.answer.length).toBeGreaterThan(50);
      expect(response.department).toBe("it_support");
      expect(response.sourceDocuments.length).toBeGreaterThan(0);
    }, 30000);

    it("should provide technical support for password reset", async () => {
      const response = await system.query("My laptop password isn't working");

      expect(response.answer).toBeDefined();
      expect(response.department).toBe("it_support");
      expect(response.answer.toLowerCase()).toMatch(/password|reset|credential/);
    }, 30000);

    it("should help with software installation queries", async () => {
      const response = await system.query("How do I install Slack on my work computer?");

      expect(response.answer).toBeDefined();
      expect(response.department).toBe("it_support");
      expect(response.sourceDocuments.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe("Finance Agent", () => {
    it("should return answer for expense policy query", async () => {
      const response = await system.query("What's the limit for client dinner expenses?");

      expect(response.answer).toBeDefined();
      expect(response.answer.length).toBeGreaterThan(50);
      expect(response.department).toBe("finance");
      expect(response.sourceDocuments.length).toBeGreaterThan(0);
    }, 30000);

    it("should provide information about reimbursement process", async () => {
      const response = await system.query("When will I receive my expense reimbursement?");

      expect(response.answer).toBeDefined();
      expect(response.department).toBe("finance");
      expect(response.answer.toLowerCase()).toMatch(/reimburs|expense|pay/);
    }, 30000);

    it("should answer remote work expense questions", async () => {
      const response = await system.query("Can I expense my home internet since I work remotely?");

      expect(response.answer).toBeDefined();
      expect(response.department).toBe("finance");
      expect(response.sourceDocuments.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe("Legal Agent", () => {
    it("should return answer for NDA query", async () => {
      const response = await system.query("I need an NDA signed by a vendor. How do I proceed?");

      expect(response.answer).toBeDefined();
      expect(response.answer.length).toBeGreaterThan(50);
      expect(response.department).toBe("legal");
      expect(response.sourceDocuments.length).toBeGreaterThan(0);
    }, 30000);

    it("should provide compliance information", async () => {
      const response = await system.query("What are our GDPR compliance obligations?");

      expect(response.answer).toBeDefined();
      expect(response.department).toBe("legal");
      expect(response.answer.toLowerCase()).toMatch(/gdpr|compliance|privacy|data/);
    }, 30000);

    it("should help with contract review questions", async () => {
      const response = await system.query("Do I need a contract reviewed before signing?");

      expect(response.answer).toBeDefined();
      expect(response.department).toBe("legal");
      expect(response.sourceDocuments.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe("Quality Evaluation", () => {
    it("should provide quality scores when evaluation is enabled", async () => {
      const response = await system.query("How many vacation days do I get?");

      if (response.evaluation) {
        expect(response.evaluation).toBeDefined();
        expect(response.evaluation.overallScore).toBeGreaterThan(0);
        expect(response.evaluation.overallScore).toBeLessThanOrEqual(10);
        expect(response.evaluation.relevance).toBeGreaterThan(0);
        expect(response.evaluation.accuracy).toBeGreaterThan(0);
        expect(response.evaluation.completeness).toBeGreaterThan(0);
        expect(response.evaluation.tone).toBeGreaterThan(0);
        expect(response.evaluation.citationQuality).toBeGreaterThan(0);
        expect(response.evaluation.feedback).toBeDefined();
      }
    }, 30000);

    it("should evaluate response quality across all dimensions", async () => {
      const response = await system.query("What is the VPN setup process?");

      if (response.evaluation) {
        const scores = response.evaluation;

        // All scores should be integers between 1 and 10
        expect(scores.relevance).toBeGreaterThanOrEqual(1);
        expect(scores.relevance).toBeLessThanOrEqual(10);
        expect(Number.isInteger(scores.relevance)).toBe(true);

        expect(scores.accuracy).toBeGreaterThanOrEqual(1);
        expect(scores.accuracy).toBeLessThanOrEqual(10);
        expect(Number.isInteger(scores.accuracy)).toBe(true);

        expect(scores.completeness).toBeGreaterThanOrEqual(1);
        expect(scores.completeness).toBeLessThanOrEqual(10);

        expect(scores.tone).toBeGreaterThanOrEqual(1);
        expect(scores.tone).toBeLessThanOrEqual(10);

        expect(scores.citationQuality).toBeGreaterThanOrEqual(1);
        expect(scores.citationQuality).toBeLessThanOrEqual(10);
      }
    }, 30000);
  });

  describe("Response Structure", () => {
    it("should return all required fields", async () => {
      const response = await system.query("How do I reset my password?");

      expect(response).toHaveProperty("answer");
      expect(response).toHaveProperty("department");
      expect(response).toHaveProperty("confidence");
      expect(response).toHaveProperty("requiresEscalation");
      expect(response).toHaveProperty("sourceDocuments");
      expect(response).toHaveProperty("sessionId");
    }, 30000);

    it("should include session ID for tracing", async () => {
      const response = await system.query("What is the expense policy?");

      expect(response.sessionId).toBeDefined();
      expect(typeof response.sessionId).toBe("string");
      expect(response.sessionId.length).toBeGreaterThan(0);
    }, 30000);
  });

  describe("Source Documents", () => {
    it("should retrieve relevant source documents", async () => {
      const response = await system.query("How many vacation days do I get?");

      expect(response.sourceDocuments.length).toBeGreaterThan(0);
      expect(response.sourceDocuments.length).toBeLessThanOrEqual(5); // k=5 default
    }, 30000);

    it("should include metadata in source documents", async () => {
      const response = await system.query("What is the VPN setup process?");

      const firstDoc = response.sourceDocuments[0];
      expect(firstDoc.metadata).toBeDefined();
      expect(typeof firstDoc.pageContent).toBe("string");
      expect(firstDoc.pageContent.length).toBeGreaterThan(0);
    }, 30000);

    it("should retrieve documents relevant to the query", async () => {
      const response = await system.query("What's the limit for client dinner expenses?");

      const content = response.sourceDocuments
        .map(doc => doc.pageContent.toLowerCase())
        .join(" ");

      // Should contain expense-related content
      const hasRelevantContent =
        content.includes("expense") ||
        content.includes("reimburs") ||
        content.includes("dinner") ||
        content.includes("client") ||
        content.includes("meal");

      expect(hasRelevantContent).toBe(true);
    }, 30000);
  });

  describe("Escalation Handling", () => {
    it("should not escalate normal queries", async () => {
      const response = await system.query("How do I submit an expense report?");

      expect(response.requiresEscalation).toBe(false);
      expect(response.answer).not.toContain("requires human intervention");
    }, 30000);

    it("should provide helpful answer for escalated queries", async () => {
      const response = await system.query("I want to sue the company for discrimination");

      if (response.requiresEscalation) {
        expect(response.answer).toBeDefined();
        expect(response.answer).toContain("human intervention");
      }
    }, 30000);
  });

  describe("Answer Quality", () => {
    it("should provide answers longer than a minimum length", async () => {
      const response = await system.query("How many vacation days do I get?");

      expect(response.answer.length).toBeGreaterThan(50);
    }, 30000);

    it("should provide professional and helpful answers", async () => {
      const response = await system.query("What is the expense reimbursement timeline?");

      // Answer should not contain error messages or placeholders
      expect(response.answer).not.toContain("Error:");
      expect(response.answer).not.toContain("undefined");
      expect(response.answer).not.toContain("null");
      expect(response.answer.length).toBeGreaterThan(20);
    }, 30000);
  });

  describe("Multi-Query Testing", () => {
    it("should handle multiple sequential queries", async () => {
      const response1 = await system.query("How many vacation days do I get?");
      const response2 = await system.query("What is the VPN setup process?");
      const response3 = await system.query("What is the expense policy?");

      expect(response1.department).toBe("hr");
      expect(response2.department).toBe("it_support");
      expect(response3.department).toBe("finance");

      expect(response1.sessionId).not.toBe(response2.sessionId);
      expect(response2.sessionId).not.toBe(response3.sessionId);
    }, 120000);
  });
});
