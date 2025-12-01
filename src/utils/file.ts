import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load prompt template from file
 */
export function LoadPromptTemplate(filePath: string): string {
  const promptPath = path.join(__dirname, filePath);
  
  return fs.readFileSync(promptPath, 'utf-8');
}
