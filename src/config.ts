import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const ConfigSchema = z.object({
  openai: z.object({
    apiKey: z.string().min(1, "OpenAI API key is required"),
    baseURL: z.string().optional(),
  }),
  langfuse: z.object({
    secretKey: z.string().min(1, "Langfuse secret key is required"),
    publicKey: z.string().min(1, "Langfuse public key is required"),
    host: z.string().url().default("https://cloud.langfuse.com"),
  }),
  models: z.object({
    orchestrator: z.string().default("gpt-3.5-turbo"),
    agent: z.string().default("gpt-4o-mini"),
    evaluator: z.string().default("gpt-3.5-turbo"),
    embedding: z.string().default("text-embedding-3-small"),
  }),
  rag: z.object({
    chunkSize: z.number().int().positive().default(1000),
    chunkOverlap: z.number().int().nonnegative().default(200),
    retrievalK: z.number().int().positive().default(5),
  }),
  vectorStore: z.object({
    type: z.enum(["memory", "chroma", "hnswlib"]).default("memory"),
    path: z.string().default("data/vector_stores"),
  }),
  observability: z.object({
    enableTracing: z.boolean().default(true),
    enableEvaluation: z.boolean().default(true),
  }),
});
export type Config = z.infer<typeof ConfigSchema>;

/**
 * Parse and validate configuration from environment variables
 */
function parseConfig(): Config {
  try {
    return ConfigSchema.parse({
      openai: {
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENROUTER_BASE_URL,
      },
      langfuse: {
        secretKey: process.env.LANGFUSE_SECRET_KEY,
        publicKey: process.env.LANGFUSE_PUBLIC_KEY,
        host: process.env.LANGFUSE_HOST || "https://cloud.langfuse.com",
      },
      models: {
        orchestrator: process.env.ORCHESTRATOR_MODEL || "gpt-3.5-turbo",
        agent: process.env.AGENT_MODEL || "gpt-4o-mini",
        evaluator: process.env.EVALUATOR_MODEL || "gpt-3.5-turbo",
        embedding: process.env.EMBEDDING_MODEL || "text-embedding-3-small",
      },
      rag: {
        chunkSize: process.env.CHUNK_SIZE ? parseInt(process.env.CHUNK_SIZE) : 1000,
        chunkOverlap: process.env.CHUNK_OVERLAP ? parseInt(process.env.CHUNK_OVERLAP) : 200,
        retrievalK: process.env.RETRIEVAL_K ? parseInt(process.env.RETRIEVAL_K) : 5,
      },
      vectorStore: {
        type: (process.env.VECTOR_STORE_TYPE as "memory" | "chroma" | "hnswlib") || "memory",
        path: process.env.VECTOR_STORE_PATH || "data/vector_stores",
      },
      observability: {
        enableTracing: process.env.ENABLE_TRACING !== "false",
        enableEvaluation: process.env.ENABLE_EVALUATION !== "false",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Configuration validation failed");

      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join(".")}: ${err.message}`);
      });

      process.exit(1);
    }

    throw error;
  }
}

export const config = parseConfig();

export default config;
