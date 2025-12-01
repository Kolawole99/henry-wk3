import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { config } from "../config.js";

export type LLMProvider = "openai" | "openrouter";

export interface LLMConfig {
  provider?: LLMProvider;
  modelName?: string;
  temperature?: number;
  apiKey?: string;
  baseURL?: string;
  maxTokens?: number;
}

export interface EmbeddingConfig {
  provider?: LLMProvider;
  modelName?: string;
  apiKey?: string;
  baseURL?: string;
}

/**
 * OpenAI client utility for managing LLM and embedding connections
 */
export class OpenAIClient {
  static createLLM(options: LLMConfig = {}): ChatOpenAI {
    const {
      provider = "openai",
      modelName = config.models.agent,
      temperature = 0,
      apiKey = config.openai.apiKey,
      baseURL,
      maxTokens,
    } = options;

    const llmConfig: any = {
      openAIApiKey: apiKey,
      modelName,
      temperature,
    };

    if (provider === "openrouter") {
      llmConfig.configuration = {
        baseURL: baseURL || "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
          "X-Title": process.env.APP_NAME || "Multi-Agent System",
        },
      };
    } else if (baseURL) {
      llmConfig.configuration = {
        baseURL,
      };
    }

    if (maxTokens) {
      llmConfig.maxTokens = maxTokens;
    }

    return new ChatOpenAI(llmConfig);
  }

  static createEmbeddings(options: EmbeddingConfig = {}): OpenAIEmbeddings {
    const {
      provider = "openai",
      modelName = config.models.embedding,
      apiKey = config.openai.apiKey,
      baseURL,
    } = options;

    const embeddingConfig: any = {
      openAIApiKey: apiKey,
      modelName,
    };

    if (provider === "openrouter") {
      embeddingConfig.configuration = {
        baseURL: baseURL || "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
          "X-Title": process.env.APP_NAME || "Multi-Agent System",
        },
      };
    } else if (baseURL) {
      embeddingConfig.configuration = {
        baseURL,
      };
    }

    return new OpenAIEmbeddings(embeddingConfig);
  }

  static createForUseCase(
    useCase: "orchestrator" | "agent" | "evaluator",
    overrides: LLMConfig = {}
  ): ChatOpenAI {
    const modelMap = {
      orchestrator: config.models.orchestrator,
      agent: config.models.agent,
      evaluator: config.models.evaluator,
    };

    return this.createLLM({
      modelName: modelMap[useCase],
      ...overrides,
    });
  }

  static getProviderFromEnv(): LLMProvider {
    const baseURL = process.env.OPENAI_BASE_URL;
    if (baseURL?.includes("openrouter")) {
      return "openrouter";
    }

    return "openai";
  }

  static validateConfig(provider: LLMProvider = "openai"): void {
    if (!config.openai.apiKey) {
      throw new Error("OpenAI API key is required. Set OPENAI_API_KEY environment variable.");
    }

    if (provider === "openrouter") {
      console.log("Using OpenRouter as LLM provider");
    } else {
      console.log("Using OpenAI as LLM provider");
    }
  }
}

/**
 * Helper function to create a standard LLM instance
 * Uses environment variables to determine provider
 */
export function createDefaultLLM(overrides: LLMConfig = {}): ChatOpenAI {
  const provider = OpenAIClient.getProviderFromEnv();
  
  return OpenAIClient.createLLM({
    provider,
    baseURL: config.openai.baseURL as string,
    ...overrides,
  });
}

/**
 * Helper function to create standard embeddings instance
 * Uses environment variables to determine provider
 */
export function createDefaultEmbeddings(overrides: EmbeddingConfig = {}): OpenAIEmbeddings {
  const provider = OpenAIClient.getProviderFromEnv();
  
  return OpenAIClient.createEmbeddings({
    provider,
    baseURL: config.openai.baseURL as string,
    ...overrides,
  });
}

export {
  OpenAIEmbeddings
}
