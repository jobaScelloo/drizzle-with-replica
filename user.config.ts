import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema/*",
  out: "./src/migrations/user",
  driver: "mysql2",
  dbCredentials: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  introspect: {
    casing: "preserve",
  },
} satisfies Config;
