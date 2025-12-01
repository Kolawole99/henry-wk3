import { MultiAgentSystem } from "../src/multi-agent-system.js";
import testQueries from "../tests/test-queries.json" with { type: 'json' };
import type { TestQuery, EvaluationResult } from "../src/types.js";

interface EvaluationSummary {
  totalQueries: number;
  correctRouting: number;
  routingAccuracy: number;
  averageConfidence: number;
  averageQualityScore: number;
  averageResponseTime: number;
  resultsByDepartment: Record<string, {
    total: number;
    correct: number;
    accuracy: number;
    avgConfidence: number;
    avgQualityScore: number;
  }>;
  detailedResults: EvaluationResult[];
}

async function runEvaluation(): Promise<void> {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║         Multi-Agent System Evaluation Suite                ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  const system = new MultiAgentSystem();

  console.log("📊 Initializing system...");
  await system.initialize();
  console.log("✓ System initialized successfully\n");

  const results: EvaluationResult[] = [];
  const startTime = Date.now();

  console.log(`🧪 Running evaluation on ${testQueries.testQueries.length} test queries...\n`);
  console.log("━".repeat(80));

  for (let i = 0; i < testQueries.testQueries.length; i++) {
    const test = testQueries.testQueries[i] as TestQuery;
    const queryNum = i + 1;

    console.log(`\n[${queryNum}/${testQueries.testQueries.length}] Testing query:`);
    console.log(`   Query: "${test.query}"`);
    console.log(`   Expected: ${test.expectedDepartment}`);

    const queryStartTime = Date.now();

    try {
      const response = await system.query(test.query);
      const queryEndTime = Date.now();
      const responseTime = queryEndTime - queryStartTime;

      const isCorrect = response.department === test.expectedDepartment;

      results.push({
        query: test.query,
        expectedDepartment: test.expectedDepartment,
        actualDepartment: response.department,
        correct: isCorrect,
        confidence: response.confidence,
        qualityScore: response.evaluation,
        responseTime,
      });

      const statusIcon = isCorrect ? "✓" : "✗";
      const statusColor = isCorrect ? "\x1b[32m" : "\x1b[31m";
      const resetColor = "\x1b[0m";

      console.log(`   ${statusColor}${statusIcon} Result: ${response.department}${resetColor}`);
      console.log(`   Confidence: ${(response.confidence * 100).toFixed(1)}%`);
      console.log(`   Response Time: ${responseTime}ms`);

      if (response.evaluation) {
        console.log(`   Quality Score: ${response.evaluation.overallScore.toFixed(1)}/10`);
      }

      if (!isCorrect) {
        console.log(`   ⚠️  ROUTING ERROR: Expected ${test.expectedDepartment}, got ${response.department}`);
      }
    } catch (error) {
      console.error(`   ✗ Error processing query: ${error}`);

      results.push({
        query: test.query,
        expectedDepartment: test.expectedDepartment,
        actualDepartment: "error" as any,
        correct: false,
        confidence: 0,
        responseTime: Date.now() - queryStartTime,
      });
    }
  }

  const totalTime = Date.now() - startTime;

  console.log("\n" + "━".repeat(80));
  console.log("\n📈 EVALUATION RESULTS\n");

  // Calculate overall metrics
  const correctCount = results.filter(r => r.correct).length;
  const totalCount = results.length;
  const routingAccuracy = (correctCount / totalCount) * 100;

  const avgConfidence = results.reduce((sum, r) => sum + r.confidence, 0) / totalCount;

  const qualityScores = results
    .filter(r => r.qualityScore)
    .map(r => r.qualityScore!.overallScore);
  const avgQualityScore = qualityScores.length > 0
    ? qualityScores.reduce((sum, score) => sum + score, 0) / qualityScores.length
    : 0;

  const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / totalCount;

  // Overall metrics
  console.log("Overall Performance:");
  console.log(`  • Routing Accuracy:       ${routingAccuracy.toFixed(1)}% (${correctCount}/${totalCount})`);
  console.log(`  • Average Confidence:     ${(avgConfidence * 100).toFixed(1)}%`);
  console.log(`  • Average Quality Score:  ${avgQualityScore.toFixed(2)}/10`);
  console.log(`  • Average Response Time:  ${avgResponseTime.toFixed(0)}ms`);
  console.log(`  • Total Evaluation Time:  ${(totalTime / 1000).toFixed(1)}s`);

  // Per-department breakdown
  console.log("\nPerformance by Department:");

  const departments = ["hr", "it_support", "finance", "legal"];
  const deptStats: Record<string, any> = {};

  for (const dept of departments) {
    const deptResults = results.filter(r => r.expectedDepartment === dept);
    const deptCorrect = deptResults.filter(r => r.correct).length;
    const deptTotal = deptResults.length;
    const deptAccuracy = deptTotal > 0 ? (deptCorrect / deptTotal) * 100 : 0;

    const deptAvgConfidence = deptTotal > 0
      ? deptResults.reduce((sum, r) => sum + r.confidence, 0) / deptTotal
      : 0;

    const deptQualityScores = deptResults
      .filter(r => r.qualityScore)
      .map(r => r.qualityScore!.overallScore);
    const deptAvgQuality = deptQualityScores.length > 0
      ? deptQualityScores.reduce((sum, s) => sum + s, 0) / deptQualityScores.length
      : 0;

    deptStats[dept] = {
      total: deptTotal,
      correct: deptCorrect,
      accuracy: deptAccuracy,
      avgConfidence: deptAvgConfidence,
      avgQualityScore: deptAvgQuality,
    };

    const deptIcon = deptAccuracy === 100 ? "✓" : deptAccuracy >= 80 ? "⚠️" : "✗";
    console.log(`  ${deptIcon} ${dept.toUpperCase()}: ${deptAccuracy.toFixed(0)}% (${deptCorrect}/${deptTotal})`);
    console.log(`      Avg Confidence: ${(deptAvgConfidence * 100).toFixed(1)}%`);
    if (deptQualityScores.length > 0) {
      console.log(`      Avg Quality: ${deptAvgQuality.toFixed(2)}/10`);
    }
  }

  // Quality score breakdown
  if (qualityScores.length > 0) {
    console.log("\nQuality Score Dimensions:");

    const dimensions = ['relevance', 'accuracy', 'completeness', 'tone', 'citationQuality'];
    const dimensionScores: Record<string, number[]> = {};

    for (const dim of dimensions) {
      dimensionScores[dim] = results
        .filter(r => r.qualityScore)
        .map(r => r.qualityScore![dim as keyof typeof r.qualityScore] as number);
    }

    for (const dim of dimensions) {
      const scores = dimensionScores[dim];
      if (scores.length > 0) {
        const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
        const dimName = dim.charAt(0).toUpperCase() + dim.slice(1).replace(/([A-Z])/g, ' $1');
        console.log(`  • ${dimName.padEnd(20)}: ${avg.toFixed(2)}/10`);
      }
    }
  }

  // Error analysis
  const errors = results.filter(r => !r.correct);
  if (errors.length > 0) {
    console.log("\n⚠️  Routing Errors:");
    errors.forEach(error => {
      console.log(`  • "${error.query.substring(0, 60)}${error.query.length > 60 ? '...' : ''}"`);
      console.log(`    Expected: ${error.expectedDepartment}, Got: ${error.actualDepartment}`);
      console.log(`    Confidence: ${(error.confidence * 100).toFixed(1)}%`);
    });
  }

  // Performance insights
  console.log("\n💡 Performance Insights:");

  if (routingAccuracy === 100) {
    console.log("  ✓ Perfect routing accuracy! All queries routed correctly.");
  } else if (routingAccuracy >= 90) {
    console.log("  ✓ Excellent routing accuracy (>90%).");
  } else if (routingAccuracy >= 80) {
    console.log("  ⚠️  Good routing accuracy, but room for improvement.");
  } else {
    console.log("  ✗ Routing accuracy needs improvement. Review failed queries.");
  }

  if (avgConfidence >= 0.8) {
    console.log("  ✓ High average confidence scores (>80%).");
  } else if (avgConfidence >= 0.6) {
    console.log("  ⚠️  Moderate confidence. Consider improving routing prompts.");
  } else {
    console.log("  ✗ Low confidence scores. Review orchestrator prompt.");
  }

  if (avgQualityScore >= 8) {
    console.log("  ✓ Excellent response quality (>8/10).");
  } else if (avgQualityScore >= 6) {
    console.log("  ⚠️  Good response quality, but can be improved.");
  } else if (avgQualityScore > 0) {
    console.log("  ✗ Response quality needs improvement. Review agent prompts.");
  }

  if (avgResponseTime < 5000) {
    console.log("  ✓ Fast response times (<5s average).");
  } else if (avgResponseTime < 10000) {
    console.log("  ⚠️  Moderate response times. Consider optimizing.");
  } else {
    console.log("  ✗ Slow response times. Review system performance.");
  }

  // Export results
  const summary: EvaluationSummary = {
    totalQueries: totalCount,
    correctRouting: correctCount,
    routingAccuracy,
    averageConfidence: avgConfidence,
    averageQualityScore: avgQualityScore,
    averageResponseTime: avgResponseTime,
    resultsByDepartment: deptStats,
    detailedResults: results,
  };

  // Save results to file
  const fs = await import("fs");
  const resultsPath = "evaluation-results.json";
  fs.writeFileSync(resultsPath, JSON.stringify(summary, null, 2));
  console.log(`\n📄 Detailed results saved to: ${resultsPath}`);

  console.log("\n" + "━".repeat(80));
  console.log("\n✓ Evaluation complete!");

  await system.shutdown();
}

// Run evaluation
runEvaluation().catch(error => {
  console.error("\n❌ Evaluation failed:", error);
  process.exit(1);
});
