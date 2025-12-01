import { beforeAll, afterAll } from "vitest";
import * as dotenv from "dotenv";

dotenv.config();

beforeAll(() => {
  console.log("Setting up test environment");

  const requiredEnvVars = [
    "OPENAI_API_KEY",
    "LANGFUSE_SECRET_KEY",
    "LANGFUSE_PUBLIC_KEY",
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missingVars.join(", ")}`);
    console.warn("Some tests may fail without proper API keys");
  }

  if (!process.env.ENABLE_TRACING) {
    process.env.ENABLE_TRACING = "false";
  }

  if (!process.env.ENABLE_EVALUATION) {
    process.env.ENABLE_EVALUATION = "false";
  }

  console.log("Test environment ready");
});

afterAll(() => {
  console.log("Cleaning up test environment");
  console.log("Cleanup complete");
});

export const TEST_TIMEOUT = 30000;

export function hasApiKeys(): boolean {
  return !!(
    process.env.OPENAI_API_KEY &&
    process.env.LANGFUSE_SECRET_KEY &&
    process.env.LANGFUSE_PUBLIC_KEY
  );
}

export function skipIfNoApiKeys(testName: string) {
  if (!hasApiKeys()) {
    console.warn(`Skipping test "${testName}" - API keys not configured`);
    return true;
  }

  return false;
}
