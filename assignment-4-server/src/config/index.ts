import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

// console.log("OPENROUTER_API_KEY =", process.env.OPENROUTER_API_KEY);

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterEmbeddingModel: process.env.OPENROUTER_EMBEDDING_MODEL,
};
