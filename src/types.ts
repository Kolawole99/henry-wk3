import { z } from "zod";
import { Document } from "langchain/document";

export type Department = "hr" | "it_support" | "finance" | "legal";

export const RoutingDecisionSchema = z.object({
  department: z.enum(["hr", "it_support", "finance", "legal"]),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  requiresEscalation: z.boolean().default(false),
  keywords: z.array(z.string()).optional().default([]),
});

export type RoutingDecision = z.infer<typeof RoutingDecisionSchema>;

export interface AgentResponse {
  answer: string;
  sourceDocuments: Document[];
  department: Department;
}

export const QualityScoresSchema = z.object({
  relevance: z.number().int().min(1).max(10),
  accuracy: z.number().int().min(1).max(10),
  completeness: z.number().int().min(1).max(10),
  tone: z.number().int().min(1).max(10),
  citationQuality: z.number().int().min(1).max(10),
  overallScore: z.number().min(1).max(10),
  feedback: z.string(),
});
export type QualityScores = z.infer<typeof QualityScoresSchema>;

export interface SystemQueryResponse {
  answer: string;
  department: Department;
  confidence: number;
  requiresEscalation: boolean;
  sourceDocuments: Document[];
  evaluation?: QualityScores;
  sessionId?: string;
}

export interface VectorStoreConfig {
  department: Department;
  docsPath: string;
  storePath: string;
}

export interface AgentConfig {
  department: Department;
  systemPrompt: string;
  model: string;
}

export interface TestQuery {
  query: string;
  description?: string;
  expectedDepartment: Department;
}

export interface EvaluationResult {
  query: string;
  expectedDepartment: Department;
  actualDepartment: Department;
  correct: boolean;
  confidence: number;
  qualityScore?: QualityScores;
  responseTime: number;
}
