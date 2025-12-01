import { describe, it, expect, beforeAll } from "vitest";
import * as path from "path";
import { VectorStoreManager } from "../src/vectorstores/vector-store-manager.js";
import { DocumentLoader } from "../src/vectorstores/document-loader.js";

describe("Document Loading and Vector Stores", () => {
  describe("DocumentLoader", () => {
    it("should load HR documents successfully", async () => {
      const docsPath = path.join(process.cwd(), "data", "hr_docs");
      const loader = new DocumentLoader(docsPath);
      const chunks = await loader.loadAndSplit();

      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks[0]).toHaveProperty("pageContent");
      expect(chunks[0]).toHaveProperty("metadata");
    }, 30000);

    it("should load IT documents successfully", async () => {
      const docsPath = path.join(process.cwd(), "data", "it_docs");
      const loader = new DocumentLoader(docsPath);
      const chunks = await loader.loadAndSplit();

      expect(chunks.length).toBeGreaterThan(0);
    }, 30000);

    it("should load Finance documents successfully", async () => {
      const docsPath = path.join(process.cwd(), "data", "finance_docs");
      const loader = new DocumentLoader(docsPath);
      const chunks = await loader.loadAndSplit();

      expect(chunks.length).toBeGreaterThan(0);
    }, 30000);

    it("should load Legal documents successfully", async () => {
      const docsPath = path.join(process.cwd(), "data", "legal_docs");
      const loader = new DocumentLoader(docsPath);
      const chunks = await loader.loadAndSplit();

      expect(chunks.length).toBeGreaterThan(0);
    }, 30000);

    it("should create chunks with proper metadata", async () => {
      const docsPath = path.join(process.cwd(), "data", "hr_docs");
      const loader = new DocumentLoader(docsPath);
      const chunks = await loader.loadAndSplit();

      const firstChunk = chunks[0];
      expect(firstChunk.metadata).toHaveProperty("source");
      expect(firstChunk.metadata).toHaveProperty("fileName");
      expect(firstChunk.metadata.fileName).toBeTruthy();
    }, 30000);

    it("should create chunks meeting minimum requirements per department", async () => {
      const departments = [
        { name: "hr", path: "hr_docs" },
        { name: "it_support", path: "it_docs" },
        { name: "finance", path: "finance_docs" },
        { name: "legal", path: "legal_docs" },
      ];

      for (const dept of departments) {
        const docsPath = path.join(process.cwd(), "data", dept.path);
        const loader = new DocumentLoader(docsPath);
        const chunks = await loader.loadAndSplit();

        // Each department should have at least 50 chunks
        expect(chunks.length).toBeGreaterThanOrEqual(50);
      }
    }, 60000);

    it("should split documents with proper chunk sizes", async () => {
      const docsPath = path.join(process.cwd(), "data", "hr_docs");
      const loader = new DocumentLoader(docsPath);
      const chunks = await loader.loadAndSplit();

      // Most chunks should be reasonable size (not too small or too large)
      const chunkSizes = chunks.map(chunk => chunk.pageContent.length);
      const averageSize = chunkSizes.reduce((a, b) => a + b, 0) / chunkSizes.length;

      expect(averageSize).toBeGreaterThan(100);
      expect(averageSize).toBeLessThan(2000);
    }, 30000);
  });

  describe("VectorStoreManager", () => {
    let vectorStoreManager: VectorStoreManager;

    beforeAll(() => {
      vectorStoreManager = new VectorStoreManager();
    });

    it("should initialize vector store for HR department", async () => {
      await vectorStoreManager.initializeDepartment("hr");
      const store = vectorStoreManager.getVectorStore("hr");

      expect(store).toBeDefined();
    }, 60000);

    it("should initialize vector store for IT Support department", async () => {
      await vectorStoreManager.initializeDepartment("it_support");
      const store = vectorStoreManager.getVectorStore("it_support");

      expect(store).toBeDefined();
    }, 60000);

    it("should initialize vector store for Finance department", async () => {
      await vectorStoreManager.initializeDepartment("finance");
      const store = vectorStoreManager.getVectorStore("finance");

      expect(store).toBeDefined();
    }, 60000);

    it("should initialize vector store for Legal department", async () => {
      await vectorStoreManager.initializeDepartment("legal");
      const store = vectorStoreManager.getVectorStore("legal");

      expect(store).toBeDefined();
    }, 60000);

    it("should throw error when accessing uninitialized store", () => {
      const newManager = new VectorStoreManager();

      expect(() => {
        newManager.getVectorStore("hr");
      }).toThrow();
    });

    it("should initialize all departments at once", async () => {
      const manager = new VectorStoreManager();
      await manager.initializeAll();

      const hrStore = manager.getVectorStore("hr");
      const itStore = manager.getVectorStore("it_support");
      const financeStore = manager.getVectorStore("finance");
      const legalStore = manager.getVectorStore("legal");

      expect(hrStore).toBeDefined();
      expect(itStore).toBeDefined();
      expect(financeStore).toBeDefined();
      expect(legalStore).toBeDefined();
    }, 120000);

    it("should return all vector stores", async () => {
      const manager = new VectorStoreManager();
      await manager.initializeAll();

      const allStores = manager.getAllVectorStores();

      expect(allStores.size).toBe(4);
      expect(allStores.has("hr")).toBe(true);
      expect(allStores.has("it_support")).toBe(true);
      expect(allStores.has("finance")).toBe(true);
      expect(allStores.has("legal")).toBe(true);
    }, 120000);
  });

  describe("Vector Store Retrieval", () => {
    let vectorStoreManager: VectorStoreManager;

    beforeAll(async () => {
      vectorStoreManager = new VectorStoreManager();
      await vectorStoreManager.initializeAll();
    }, 120000);

    it("should retrieve relevant documents for HR queries", async () => {
      const store = vectorStoreManager.getVectorStore("hr");
      const retriever = store.asRetriever(5);

      const results = await retriever.getRelevantDocuments("How many vacation days do I get?");

      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(5);

      // Should retrieve PTO-related content
      const content = results.map(doc => doc.pageContent.toLowerCase()).join(" ");
      const hasRelevantContent =
        content.includes("vacation") ||
        content.includes("pto") ||
        content.includes("time off") ||
        content.includes("paid time off");

      expect(hasRelevantContent).toBe(true);
    }, 30000);

    it("should retrieve relevant documents for IT queries", async () => {
      const store = vectorStoreManager.getVectorStore("it_support");
      const retriever = store.asRetriever(5);

      const results = await retriever.getRelevantDocuments("How do I connect to the VPN?");

      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(5);

      const content = results.map(doc => doc.pageContent.toLowerCase()).join(" ");
      const hasRelevantContent =
        content.includes("vpn") ||
        content.includes("virtual private network") ||
        content.includes("connect") ||
        content.includes("network");

      expect(hasRelevantContent).toBe(true);
    }, 30000);

    it("should retrieve relevant documents for Finance queries", async () => {
      const store = vectorStoreManager.getVectorStore("finance");
      const retriever = store.asRetriever(5);

      const results = await retriever.getRelevantDocuments("What is the expense policy?");

      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(5);

      const content = results.map(doc => doc.pageContent.toLowerCase()).join(" ");
      const hasRelevantContent =
        content.includes("expense") ||
        content.includes("reimburs") ||
        content.includes("budget") ||
        content.includes("cost");

      expect(hasRelevantContent).toBe(true);
    }, 30000);

    it("should retrieve relevant documents for Legal queries", async () => {
      const store = vectorStoreManager.getVectorStore("legal");
      const retriever = store.asRetriever(5);

      const results = await retriever.getRelevantDocuments("What is the NDA process?");

      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(5);

      const content = results.map(doc => doc.pageContent.toLowerCase()).join(" ");
      const hasRelevantContent =
        content.includes("nda") ||
        content.includes("non-disclosure") ||
        content.includes("confidential") ||
        content.includes("agreement");

      expect(hasRelevantContent).toBe(true);
    }, 30000);

    it("should return different results for different queries", async () => {
      const store = vectorStoreManager.getVectorStore("hr");
      const retriever = store.asRetriever(3);

      const results1 = await retriever.getRelevantDocuments("How many vacation days do I get?");
      const results2 = await retriever.getRelevantDocuments("What is the remote work policy?");

      // Results should be different
      const content1 = results1.map(doc => doc.pageContent).join("");
      const content2 = results2.map(doc => doc.pageContent).join("");

      expect(content1).not.toBe(content2);
    }, 30000);

    it("should retrieve documents with semantic similarity", async () => {
      const store = vectorStoreManager.getVectorStore("hr");
      const retriever = store.asRetriever(5);

      // These queries are semantically similar, should retrieve similar docs
      const results1 = await retriever.getRelevantDocuments("How much PTO do I have?");
      const results2 = await retriever.getRelevantDocuments("How many vacation days are available?");

      expect(results1.length).toBeGreaterThan(0);
      expect(results2.length).toBeGreaterThan(0);

      // Both should contain PTO-related content
      const content1 = results1.map(doc => doc.pageContent.toLowerCase()).join(" ");
      const content2 = results2.map(doc => doc.pageContent.toLowerCase()).join(" ");

      const hasPTO1 = content1.includes("pto") || content1.includes("vacation") || content1.includes("time off");
      const hasPTO2 = content2.includes("pto") || content2.includes("vacation") || content2.includes("time off");

      expect(hasPTO1).toBe(true);
      expect(hasPTO2).toBe(true);
    }, 30000);
  });

  describe("Vector Store Persistence", () => {
    it("should load existing vector store from disk if available", async () => {
      const manager1 = new VectorStoreManager();
      await manager1.initializeDepartment("hr");

      // Create second manager that should load from disk
      const manager2 = new VectorStoreManager();
      await manager2.initializeDepartment("hr", false); // Don't force rebuild

      const store = manager2.getVectorStore("hr");
      expect(store).toBeDefined();
    }, 60000);

    it("should rebuild vector store when forced", async () => {
      const manager = new VectorStoreManager();
      await manager.initializeDepartment("hr", true); // Force rebuild

      const store = manager.getVectorStore("hr");
      expect(store).toBeDefined();
    }, 60000);
  });

  describe("Document Content Quality", () => {
    it("should have substantial content per department", async () => {
      const departments = [
        { name: "hr", path: "hr_docs" },
        { name: "it_support", path: "it_docs" },
        { name: "finance", path: "finance_docs" },
        { name: "legal", path: "legal_docs" },
      ];

      for (const dept of departments) {
        const docsPath = path.join(process.cwd(), "data", dept.path);
        const loader = new DocumentLoader(docsPath);
        const chunks = await loader.loadAndSplit();

        const totalContent = chunks.map(chunk => chunk.pageContent).join(" ");
        const wordCount = totalContent.split(/\s+/).length;

        // Each department should have substantial content (at least 10,000 words)
        expect(wordCount).toBeGreaterThan(10000);
      }
    }, 60000);
  });
});
