import { describe, it, expect, beforeAll } from "vitest";
import { Orchestrator } from "../src/agents/orchestrator.js";
import type { Department } from "../src/types.js";

describe("Orchestrator Routing", () => {
  let orchestrator: Orchestrator;

  beforeAll(() => {
    orchestrator = new Orchestrator();
  });

  describe("Department Routing", () => {
    it("should route HR query about vacation days correctly", async () => {
      const result = await orchestrator.route(
        "How many vacation days do I get as a new employee?"
      );
      expect(result.department).toBe("hr");
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.reasoning).toBeDefined();
      expect(result.requiresEscalation).toBe(false);
    });

    it("should route HR query about remote work correctly", async () => {
      const result = await orchestrator.route(
        "Can I work remotely full-time? What's the policy?"
      );
      expect(result.department).toBe("hr");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route HR query about performance reviews correctly", async () => {
      const result = await orchestrator.route(
        "What's the deadline for performance reviews this year?"
      );
      expect(result.department).toBe("hr");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route IT Support query about VPN correctly", async () => {
      const result = await orchestrator.route(
        "I can't connect to the VPN from home. What should I do?"
      );
      expect(result.department).toBe("it_support");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route IT Support query about password correctly", async () => {
      const result = await orchestrator.route(
        "My laptop password isn't working and I'm locked out"
      );
      expect(result.department).toBe("it_support");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route IT Support query about software correctly", async () => {
      const result = await orchestrator.route(
        "How do I install Slack on my work computer?"
      );
      expect(result.department).toBe("it_support");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route Finance query about expenses correctly", async () => {
      const result = await orchestrator.route(
        "What's the limit for client dinner expenses?"
      );
      expect(result.department).toBe("finance");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route Finance query about reimbursement correctly", async () => {
      const result = await orchestrator.route(
        "When will I receive my expense reimbursement?"
      );
      expect(result.department).toBe("finance");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route Finance query about remote expenses correctly", async () => {
      const result = await orchestrator.route(
        "Can I expense my home internet since I work remotely?"
      );
      expect(result.department).toBe("finance");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route Legal query about NDA correctly", async () => {
      const result = await orchestrator.route(
        "I need an NDA signed by a vendor. How do I proceed?"
      );
      expect(result.department).toBe("legal");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route Legal query about GDPR correctly", async () => {
      const result = await orchestrator.route(
        "What are our GDPR compliance obligations?"
      );
      expect(result.department).toBe("legal");
      expect(result.confidence).toBeGreaterThan(0.6);
    });

    it("should route Legal query about contracts correctly", async () => {
      const result = await orchestrator.route(
        "Do I need a contract reviewed before signing with this new vendor?"
      );
      expect(result.department).toBe("legal");
      expect(result.confidence).toBeGreaterThan(0.6);
    });
  });

  describe("Confidence Scoring", () => {
    it("should have high confidence for clear queries", async () => {
      const result = await orchestrator.route("How many vacation days do I get?");
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    it("should return confidence between 0 and 1", async () => {
      const result = await orchestrator.route("Tell me about company policies");
      expect(result.confidence).toBeGreaterThanOrEqual(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
    });
  });

  describe("Response Structure", () => {
    it("should return all required fields", async () => {
      const result = await orchestrator.route("How do I reset my password?");
      expect(result).toHaveProperty("department");
      expect(result).toHaveProperty("confidence");
      expect(result).toHaveProperty("reasoning");
      expect(result).toHaveProperty("requiresEscalation");
      expect(result).toHaveProperty("keywords");
    });

    it("should have valid department type", async () => {
      const validDepartments: Department[] = ["hr", "it_support", "finance", "legal"];
      const result = await orchestrator.route("What is the expense policy?");
      expect(validDepartments).toContain(result.department);
    });

    it("should provide reasoning for routing decision", async () => {
      const result = await orchestrator.route("How many vacation days do I get?");
      expect(result.reasoning).toBeTruthy();
      expect(result.reasoning.length).toBeGreaterThan(10);
    });
  });

  describe("Escalation Detection", () => {
    it("should not escalate normal queries", async () => {
      const result = await orchestrator.route("How do I submit an expense report?");
      expect(result.requiresEscalation).toBe(false);
    });

    it("should handle ambiguous queries", async () => {
      const result = await orchestrator.route("I need help");
      expect(result).toBeDefined();
      expect(result.department).toBeDefined();
    });
  });

  describe("Error Handling", () => {
    it("should handle empty queries gracefully", async () => {
      const result = await orchestrator.route("");
      expect(result).toBeDefined();
      expect(result.department).toBeDefined();
    });

    it("should handle very long queries", async () => {
      const longQuery = "I need help with ".repeat(100) + "vacation days";
      const result = await orchestrator.route(longQuery);
      expect(result).toBeDefined();
      expect(result.department).toBeDefined();
    });
  });

  describe("Keywords Extraction", () => {
    it("should extract keywords when available", async () => {
      const result = await orchestrator.route("How many vacation days and PTO do I get?");
      expect(result.keywords).toBeDefined();
      expect(Array.isArray(result.keywords)).toBe(true);
    });
  });
});
