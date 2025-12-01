#!/usr/bin/env node
import { MultiAgentSystem } from "../src/multi-agent-system.js";
import { ResponseFormatter } from "../src/utils/response-formatter.js";

const DEMO_QUERIES = [
  "How many vacation days do I get as a new employee?",
  "I can't connect to the VPN. What should I do?",
  "What's the expense limit for client dinners?",
  "I need an NDA signed by a vendor. How do I proceed?",
];

async function main() {
  console.log("╔════════════════════════════════════════════════════════════════╗");
  console.log("║     Multi-Agent System Demo                                   ║");
  console.log("╚════════════════════════════════════════════════════════════════╝\n");

  console.log("This demo will run 4 example queries through the system.\n");

  const system = new MultiAgentSystem();

  try {
    await system.initialize();
  } catch (error) {
    console.error("❌ Failed to initialize system:", error);
    console.error("\nRun 'npm run setup' first to initialize vector stores.\n");
    process.exit(1);
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  for (let i = 0; i < DEMO_QUERIES.length; i++) {
    const query = DEMO_QUERIES[i] as string;

    console.log(`\n[Query ${i + 1}/${DEMO_QUERIES.length}]`);
    console.log(`Question: "${query}"\n`);

    try {
      const response = await system.query(query);

      console.log(`Department: ${ResponseFormatter.formatDepartmentName(response.department)}`);
      console.log(`Confidence: ${ResponseFormatter.formatConfidence(response.confidence)}`);

      if (response.evaluation) {
        console.log(
          `Quality Score: ${ResponseFormatter.formatQualityScore(response.evaluation.overallScore)}`
        );
      }

      console.log(`\nAnswer:\n${response.answer}`);

      if (i < DEMO_QUERIES.length - 1) {
        console.log("\n" + "─".repeat(70));
      }
    } catch (error) {
      console.error(`❌ Error: ${error}`);
    }
  }

  console.log("\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ Demo complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("Check your Langfuse dashboard to see traces for these queries.");
  console.log("Run 'npm start' for interactive mode.\n");

  await system.shutdown();
}

main();
