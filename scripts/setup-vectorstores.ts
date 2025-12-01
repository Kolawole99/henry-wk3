#!/usr/bin/env node

import { VectorStoreManager } from "../src/vectorstores/vector-store-manager.js";

async function main() {
  console.log("╔════════════════════════════════════════════════════════════════╗");
  console.log("║     Vector Store Setup                                         ║");
  console.log("╚════════════════════════════════════════════════════════════════╝\n");

  const forceRebuild = process.argv.includes("--force") || process.argv.includes("-f");
  if (forceRebuild) {
    console.log("⚠️  Force rebuild enabled - existing stores will be overwritten\n");
  }

  const manager = new VectorStoreManager();

  try {
    await manager.initializeAll(forceRebuild);

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ Setup complete!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("Next steps:");
    console.log("  1. Run 'npm start' to launch the interactive CLI");
    console.log("  2. Run 'npm run demo' to see example queries");
    console.log("  3. Check Langfuse dashboard for traces\n");
  } catch (error) {
    console.error("\n❌ Setup failed:");
    console.error(error);
    console.error("\nTroubleshooting:");
    console.error("  1. Make sure you've filled in document templates in data/*/");
    console.error("  2. Check that .env file has your OpenAI API key");
    console.error("  3. Verify document files end with .md extension");
    console.error("  4. Ensure each department has at least one document\n");
    process.exit(1);
  }
}

main();
