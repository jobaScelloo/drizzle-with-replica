import { RequestMigration } from "@pooler/middleware/migration/request.migration";
import { MySql2Database } from "drizzle-orm/mysql2";
import { Redis } from "ioredis";

declare global {
  // biome-ignore lint/style/noVar: <explanation>
  var db: MySQLWithReplicas<MySql2Database<Record<string, never>>>  
  
  // biome-ignore lint/style/noVar: <explanation>
  var redis: Redis;
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: number;
      REDIS_URL: string;
      PORT: number;
    }
  }
}