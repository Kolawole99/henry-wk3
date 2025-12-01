import { Document } from "langchain/document";
import { describe, it, expect, beforeAll } from "vitest";
import { ResponseEvaluator } from "../src/observability/evaluator.js";

describe("Response Evaluator", () => {
  let evaluator: ResponseEvaluator;

  beforeAll(() => {
    evaluator = new ResponseEvaluator();
  });

  describe("Quality Score Generation", () => {
    it("should evaluate a good response with high scores", async () => {
      const query = "How many vacation days do I get as a new employee?";
      const response = "New employees receive 15 days (120 hours) of PTO per year. This accrues monthly at a rate of 1.25 days per month. According to the company PTO policy, you can start using your PTO as soon as it accrues.";
      const sources = [
        new Document({
          pageContent: "New employees (0-2 years tenure) receive 15 days (120 hours) of PTO annually. PTO accrues at 1.25 days per month.",
          metadata: { fileName: "pto_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(scores.overallScore).toBeGreaterThan(0);
      expect(scores.overallScore).toBeLessThanOrEqual(10);
      expect(scores.relevance).toBeGreaterThanOrEqual(1);
      expect(scores.relevance).toBeLessThanOrEqual(10);
      expect(scores.accuracy).toBeGreaterThanOrEqual(1);
      expect(scores.accuracy).toBeLessThanOrEqual(10);
      expect(scores.completeness).toBeGreaterThanOrEqual(1);
      expect(scores.completeness).toBeLessThanOrEqual(10);
      expect(scores.tone).toBeGreaterThanOrEqual(1);
      expect(scores.tone).toBeLessThanOrEqual(10);
      expect(scores.citationQuality).toBeGreaterThanOrEqual(1);
      expect(scores.citationQuality).toBeLessThanOrEqual(10);
      expect(scores.feedback).toBeDefined();
      expect(scores.feedback.length).toBeGreaterThan(10);
    }, 30000);

    it("should evaluate an incomplete response with lower scores", async () => {
      const query = "What is the complete process for expense reimbursement including timelines and approval steps?";
      const response = "You need to submit expenses.";
      const sources = [
        new Document({
          pageContent: "Expense reimbursement process: 1) Submit expenses within 30 days, 2) Manager approval required within 5 business days, 3) Finance review takes 3-5 days, 4) Reimbursement processed in next pay cycle.",
          metadata: { fileName: "expense_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(scores.completeness).toBeLessThan(8);
      expect(scores.feedback).toBeDefined();
    }, 30000);

    it("should evaluate response with no sources", async () => {
      const query = "How do I reset my password?";
      const response = "Contact IT support to reset your password.";
      const sources: Document[] = [];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(scores).toBeDefined();
      expect(scores.citationQuality).toBeLessThan(8);
    }, 30000);
  });

  describe("Score Validation", () => {
    it("should return scores as integers for individual dimensions", async () => {
      const query = "How many vacation days do I get?";
      const response = "New employees get 15 vacation days per year.";
      const sources = [
        new Document({
          pageContent: "New employees receive 15 days of PTO annually.",
          metadata: { fileName: "pto_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(Number.isInteger(scores.relevance)).toBe(true);
      expect(Number.isInteger(scores.accuracy)).toBe(true);
      expect(Number.isInteger(scores.completeness)).toBe(true);
      expect(Number.isInteger(scores.tone)).toBe(true);
      expect(Number.isInteger(scores.citationQuality)).toBe(true);
    }, 30000);

    it("should return overall score as number (may be decimal)", async () => {
      const query = "What is the VPN setup process?";
      const response = "To set up VPN, download the VPN client, install it, and connect using your credentials.";
      const sources = [
        new Document({
          pageContent: "VPN Setup: 1) Download Cisco AnyConnect, 2) Install the client, 3) Connect to vpn.company.com, 4) Enter your LDAP credentials.",
          metadata: { fileName: "vpn_setup.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(typeof scores.overallScore).toBe("number");
      expect(scores.overallScore).toBeGreaterThanOrEqual(1);
      expect(scores.overallScore).toBeLessThanOrEqual(10);
    }, 30000);
  });

  describe("Evaluation Dimensions", () => {
    it("should evaluate relevance accurately", async () => {
      const query = "How do I connect to VPN?";
      const response = "The company PTO policy states that employees receive vacation days based on tenure.";
      const sources = [
        new Document({
          pageContent: "PTO accrual rates vary by tenure level.",
          metadata: { fileName: "pto_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      // Response is completely irrelevant
      expect(scores.relevance).toBeLessThan(5);
    }, 30000);

    it("should evaluate tone appropriately", async () => {
      const query = "How many vacation days do I get?";
      const response = "JUST READ THE POLICY YOURSELF! It's not that hard. Everyone gets 15 days.";
      const sources = [
        new Document({
          pageContent: "New employees receive 15 days of PTO.",
          metadata: { fileName: "pto_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      // Tone is unprofessional
      expect(scores.tone).toBeLessThan(7);
    }, 30000);

    it("should evaluate completeness based on query complexity", async () => {
      const query = "What is the complete expense reimbursement process including submission, approval, and timeline?";
      const goodResponse = "The expense reimbursement process involves: 1) Submit expenses within 30 days via the portal, 2) Manager approval within 5 business days, 3) Finance review takes 3-5 days, 4) Reimbursement processed in the next pay cycle (bi-weekly). You'll receive email notifications at each step.";
      const poorResponse = "Submit your expenses and wait for approval.";

      const sources = [
        new Document({
          pageContent: "Complete reimbursement workflow: submission → manager approval (5 days) → finance review (3-5 days) → payment (next pay cycle).",
          metadata: { fileName: "reimbursement_process.md" },
        }),
      ];

      const goodScores = await evaluator.evaluate(query, goodResponse, sources);
      const poorScores = await evaluator.evaluate(query, poorResponse, sources);

      expect(goodScores.completeness).toBeGreaterThan(poorScores.completeness);
    }, 60000);
  });

  describe("Feedback Generation", () => {
    it("should provide constructive feedback", async () => {
      const query = "How do I set up VPN?";
      const response = "Download the VPN client and connect.";
      const sources = [
        new Document({
          pageContent: "VPN Setup Guide: Download Cisco AnyConnect, install, configure server address, enter credentials.",
          metadata: { fileName: "vpn_setup.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(scores.feedback).toBeDefined();
      expect(scores.feedback.length).toBeGreaterThan(20);
      expect(typeof scores.feedback).toBe("string");
    }, 30000);

    it("should provide feedback as a string", async () => {
      const query = "What is the expense policy?";
      const response = "Expenses must be submitted within company policy guidelines.";
      const sources = [
        new Document({
          pageContent: "Expense policy: Submit within 30 days, manager approval required, limits vary by category.",
          metadata: { fileName: "expense_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(typeof scores.feedback).toBe("string");
    }, 30000);
  });

  describe("Error Handling", () => {
    it("should handle evaluation errors gracefully", async () => {
      const query = "";
      const response = "";
      const sources: Document[] = [];

      const scores = await evaluator.evaluate(query, response, sources);

      // Should return default/fallback scores
      expect(scores).toBeDefined();
      expect(scores.overallScore).toBeGreaterThanOrEqual(1);
      expect(scores.overallScore).toBeLessThanOrEqual(10);
    }, 30000);

    it("should handle very long responses", async () => {
      const query = "Tell me about company policies";
      const response = "Policy information: " + "details ".repeat(1000);
      const sources = [
        new Document({
          pageContent: "Company policy overview and guidelines.",
          metadata: { fileName: "policies.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(scores).toBeDefined();
      expect(scores.overallScore).toBeGreaterThan(0);
    }, 30000);
  });

  describe("Citation Quality Evaluation", () => {
    it("should score high when response uses source information", async () => {
      const query = "How many vacation days for new employees?";
      const response = "According to the PTO policy document, new employees receive 15 days (120 hours) of PTO per year, accruing at 1.25 days per month.";
      const sources = [
        new Document({
          pageContent: "New employees (0-2 years) receive 15 days (120 hours) of PTO annually, accruing at 1.25 days per month.",
          metadata: { fileName: "pto_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(scores.citationQuality).toBeGreaterThan(6);
    }, 30000);

    it("should score low when response ignores sources", async () => {
      const query = "How many vacation days for new employees?";
      const response = "I think you get about 10 days or something like that.";
      const sources = [
        new Document({
          pageContent: "New employees receive 15 days (120 hours) of PTO annually.",
          metadata: { fileName: "pto_policy.md" },
        }),
      ];

      const scores = await evaluator.evaluate(query, response, sources);

      expect(scores.citationQuality).toBeLessThan(6);
      expect(scores.accuracy).toBeLessThan(7);
    }, 30000);
  });
});
