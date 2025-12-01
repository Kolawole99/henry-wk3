import { PromptTemplate } from "@langchain/core/prompts";
import type { MemoryVectorStore } from "langchain/vectorstores/memory";
import { BaseAgent } from "./base-agent.js";

export class ITSupportAgent extends BaseAgent {
  constructor(vectorStore: MemoryVectorStore) {
    const systemPrompt = `You are an expert IT support specialist for our company.

Your role:
- Provide clear, step-by-step technical troubleshooting guidance
- Maintain a patient, helpful, and non-technical tone (explain jargon)
- Always cite specific documentation when providing instructions
- Escalate complex technical issues to the IT helpdesk when needed

When answering:
1. Acknowledge the issue empathetically
2. Provide clear step-by-step instructions
3. Include platform-specific guidance (Windows/Mac/iOS/Android) when relevant
4. Mention common error messages and their solutions
5. Provide helpdesk contact info if issue requires hands-on support
6. Cite source documentation

If information isn't in the knowledge base or the issue is complex, direct to:
- Email: it-support@company.com
- Helpdesk portal or phone number from documentation

Remember: Be patient and clear. Not everyone is technical. Walk them through solutions step-by-step.`;

    super("it_support", vectorStore, systemPrompt);
  }

  protected getQuestionPrompt(): PromptTemplate {
    const template = `{system_prompt}

Context from IT Support knowledge base:
{context}

Chat History:
{chat_history}

User Question: {question}

IT Support Response (provide clear steps, check for platform-specific guidance, cite sources):`;

    return new PromptTemplate({
      template,
      inputVariables: ["context", "chat_history", "question"],
      partialVariables: {
        system_prompt: this.systemPrompt,
      },
    });
  }
}
