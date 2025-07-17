import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { config } from './lib/config';



export default defineConfig({
  out: './drizzle',
  schema: './database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.databaseurl!,
  },
});
