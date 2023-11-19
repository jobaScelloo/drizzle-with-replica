import { createId } from "@paralleldrive/cuid2";
import "dotenv/config";
import { sql } from "drizzle-orm";
import {
  date,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 767 })
      .$defaultFn(() => createId())
      .unique()
      .notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    version: date("version"),
    created_at: timestamp("created_at", { mode: "string" })
      .default(sql`current_timestamp`)
      .notNull(),
    updated_at: timestamp("updated_at", { mode: "string" })
      .default(sql`current_timestamp`)
      .onUpdateNow()
      .notNull(),
  },
  (table) => {
    return {
      usersId: primaryKey(table.id),
    };
  },
);

export type User = typeof users.$inferSelect;
