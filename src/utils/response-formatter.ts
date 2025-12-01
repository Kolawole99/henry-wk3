import type { Document } from "langchain/document";

export class ResponseFormatter {
  /**
   * Format response with source citations
   */
  static formatWithCitations(answer: string, sourceDocuments: Document[]): string {
    if (sourceDocuments.length === 0) {
      return answer;
    }

    const sources = [...new Set(
      sourceDocuments.map((doc) => doc.metadata.fileName || doc.metadata.source || "Unknown")
    )];

    const citations = sources.map((source) => `  • ${source}`).join("\n");

    return `${answer}\n\n📚 Sources:\n${citations}`;
  }

  static formatDepartmentName(department: string): string {
    const mapping: Record<string, string> = {
      hr: "HR",
      it_support: "IT Support",
      finance: "Finance",
      legal: "Legal",
    };

    return mapping[department] || department.toUpperCase();
  }

  /**
   * Format confidence score as percentage
   */
  static formatConfidence(confidence: number): string {
    return `${(confidence * 100).toFixed(0)}%`;
  }

  /**
   * Format quality score for display
   */
  static formatQualityScore(score: number): string {
    if (score >= 8) {
      return `${score}/10 ✅ Excellent`;
    } else if (score >= 6) {
      return `${score}/10 ⚠️  Good`;
    } else {
      return `${score}/10 ❌ Needs Improvement`;
    }
  }

  /**
   * Truncate long text for display
   */
  static truncate(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + "...";
  }
}
