import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __kysely_db: Kysely<DB> | undefined;
}

let db: Kysely<DB>;

if (!globalThis.__kysely_db) {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  });

  db = new Kysely<DB>({ dialect });
  globalThis.__kysely_db = db;
} else {
  db = globalThis.__kysely_db;
}

export { db };

export async function getAllArticles() {
  return await db!
    .selectFrom("posts")
    .select(["id", "slug", "title", "summary", "published_at", "updated_at"])
    .orderBy("published_at", "desc")
    .execute();
}

export async function getArticleBySlug(slug: string) {
  const article = await db!
    .selectFrom("posts")
    .select([
      "id",
      "slug",
      "title",
      "summary",
      "body",
      "published_at",
      "updated_at",
    ])
    .where("slug", "=", slug)
    .executeTakeFirst();

  return article;
}
