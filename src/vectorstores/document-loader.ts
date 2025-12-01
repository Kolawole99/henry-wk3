import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import * as fs from "fs";
import * as path from "path";
import { config } from "../config.js";

export class DocumentLoader {
  private docsPath: string;
  private textSplitter: RecursiveCharacterTextSplitter;

  constructor(docsPath: string) {
    this.docsPath = docsPath;
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: config.rag.chunkSize,
      chunkOverlap: config.rag.chunkOverlap,
      separators: ["\n\n", "\n", " ", ""],
    });
  }

  /**
   * Load all documents from the directory
   */
  async loadAll(): Promise<Document[]> {
    if (!fs.existsSync(this.docsPath)) {
      throw new Error(`Documents directory not found: ${this.docsPath}`);
    }

    const files = fs.readdirSync(this.docsPath).filter((f) => f.endsWith(".md"));
    if (files.length === 0) {
      console.warn(`No markdown files found in ${this.docsPath}`);
      
      return [];
    }

    console.log(`Loading documents from ${this.docsPath}...`);

    const loader = new DirectoryLoader(this.docsPath, {
      ".md": (path) => new TextLoader(path),
    });

    const docs = await loader.load();
    const docsWithMetadata = docs.map((doc) => {
      const fileName = path.basename(doc.metadata.source);
      return new Document({
        pageContent: doc.pageContent,
        metadata: { ...doc.metadata, fileName },
      });
    });

    console.log(`Found ${docsWithMetadata.length} documents`);

    return docsWithMetadata;
  }

  async splitDocuments(documents: Document[]): Promise<Document[]> {
    if (documents.length === 0) {
      return [];
    }

    console.log("Splitting documents into chunks");
    const chunks = await this.textSplitter.splitDocuments(documents);
    console.log(`Created ${chunks.length} chunks`);

    return chunks;
  }

  async loadAndSplit(): Promise<Document[]> {
    const docs = await this.loadAll();
    
    return this.splitDocuments(docs);
  }
}
