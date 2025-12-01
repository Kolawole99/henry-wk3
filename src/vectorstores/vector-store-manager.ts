import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "langchain/document";
import * as fs from "fs";
import * as path from "path";
import { DocumentLoader } from "./document-loader.js";
import { config } from "../config.js";
import type { Department } from "../types.js";
import { createDefaultEmbeddings, type EmbeddingConfig, type OpenAIEmbeddings } from "../utils/openai-client.js";

export class VectorStoreManager {
  private embeddings: OpenAIEmbeddings;
  private vectorStores: Map<Department, MemoryVectorStore>;

  constructor(embeddingConfig?: EmbeddingConfig) {
    this.embeddings = createDefaultEmbeddings(embeddingConfig);
    this.vectorStores = new Map();
  }

  /**
   * Initialize vector stores for all departments
   */
  async initializeAll(forceRebuild: boolean = false): Promise<void> {
    const departments: Department[] = ["hr", "it_support", "finance", "legal"];

    console.log("Initializing vector stores for all departments");

    for (const department of departments) {
      await this.initializeDepartment(department, forceRebuild);
    }

    console.log("All vector stores initialized successfully!");
  }

  /**
   * Initialize vector store for a specific department
   */
  async initializeDepartment(
    department: Department,
    forceRebuild: boolean = false
  ): Promise<MemoryVectorStore> {
    console.log(`Initializing vector store for: ${department} department`);

    const storePath = this.getStorePath(department);
    const docsPath = this.getDocsPath(department);
    if (!forceRebuild && fs.existsSync(storePath)) {
      try {
        console.log(`Loading existing vector store from disk`);
        const vectorStore = await this.loadVectorStore(department);
        this.vectorStores.set(department, vectorStore);
        console.log(`Loaded existing vector store for ${department}`);
        
        return vectorStore;
      } catch (error) {
        console.warn(`Failed to load existing store, rebuilding...`);
      }
    }

    console.log("Building new vector store");

    const loader = new DocumentLoader(docsPath);
    const chunks = await loader.loadAndSplit();
    if (chunks.length === 0) {
      throw new Error(`No documents found in ${docsPath}. Please populate the template files.`);
    }

    const vectorStore = await MemoryVectorStore.fromDocuments(
      chunks,
      this.embeddings
    );
    await this.saveVectorStore(department, vectorStore);
    this.vectorStores.set(department, vectorStore);

    console.log(`Created and saved vector store for ${department}`);

    return vectorStore;
  }

  /**
   * Get vector store for a department
   */
  getVectorStore(department: Department): MemoryVectorStore {
    const store = this.vectorStores.get(department);
    if (!store) {
      throw new Error(`Vector store for ${department} not initialized. Call initializeAll() first.`);
    }

    return store;
  }

  getAllVectorStores(): Map<Department, MemoryVectorStore> {
    return this.vectorStores;
  }

  private async saveVectorStore(
    department: Department,
    vectorStore: MemoryVectorStore
  ): Promise<void> {
    const storePath = this.getStorePath(department);
    const storeDir = path.dirname(storePath);
    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir, { recursive: true });
    }

    const memoryVectors = vectorStore.memoryVectors;
    const serialized = JSON.stringify(memoryVectors);

    fs.writeFileSync(storePath, serialized, "utf-8");
    console.log(`Saved vector store to ${storePath}`);
  }

  private async loadVectorStore(department: Department): Promise<MemoryVectorStore> {
    const storePath = this.getStorePath(department);
    if (!fs.existsSync(storePath)) {
      throw new Error(`Vector store file not found: ${storePath}`);
    }

    const serialized = fs.readFileSync(storePath, "utf-8");
    const memoryVectors = JSON.parse(serialized);
    const documents: Document[] = memoryVectors.map((vec: any) => {
      return new Document({
        pageContent: vec.content,
        metadata: vec.metadata || {},
      });
    });

    const vectorStore = await MemoryVectorStore.fromDocuments(
      documents,
      this.embeddings
    );

    return vectorStore;
  }

  private getDocsPath(department: Department): string {
    const deptFolder = department === "it_support" ? "it_docs" : `${department}_docs`;
    return path.join(process.cwd(), "data", deptFolder);
  }

  private getStorePath(department: Department): string {
    return path.join(
      process.cwd(),
      config.vectorStore.path,
      `${department}_store.json`
    );
  }
}
