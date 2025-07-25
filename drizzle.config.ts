import {config}  from 'dotenv';
import { defineConfig } from 'drizzle-kit';




config({path:".env.local"})

export default defineConfig({
  out: './drizzle',
  schema: './database/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url:process.env.DATABASEURL!,
  },
});
