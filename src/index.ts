import { MySql2Database, drizzle  } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { MySQLWithReplicas, withReplicas } from 'drizzle-orm/mysql-core';
import { migrate } from "drizzle-orm/mysql2/migrator";
import { fileURLToPath } from "node:url";
import { users } from "./schema/user.js";

const main = async () => { 
 try {
   const { createPool } = mysql;

const primaryClient = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const read1Client = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


let db: MySQLWithReplicas<MySql2Database<Record<string, never>>> ;


  const primaryDb = drizzle(primaryClient, {
    logger: true,
  });

  const read1 = drizzle(read1Client, {
    logger: true,
  });
  db = withReplicas(primaryDb, [read1]);

  await migrate(db, {
    migrationsFolder: fileURLToPath(
      new URL("../src/migrations/user", import.meta.url),
    ),
  });


   /**
    * Query:  select  from `users` limit ? -- params: [1]
    * Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL 
    * server version for the right syntax to use near 'from `users` limit 1' at line 1
    */
  const fetchUser = await db.select().from(users).limit(1);

   /**
    *TODO:  Comment out the fetchUser to see the error for insertUser
    * Error: TypeError: Cannot read properties of undefined (reading 'email')
    */
   const insertUser = await db.insert(users).values({
  email: "test@test.com"
})
  
  
  console.log("user", fetchUser, insertUser);
 } catch (error) {
    console.log(error);
 }
}

await main();

console.log("done");