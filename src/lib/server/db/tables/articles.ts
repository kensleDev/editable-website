import type { InferModel } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const articlesTable = pgTable('articles', {
	article_id: text('article_id').primaryKey(),
	slug: text('slug'),
	title: text('title'),
	teaser: text('teaser'),
	content: text('content').notNull(),
	created_at: timestamp('created_at').default(new Date()),
	published_at: timestamp('published_at').notNull(),
	updated_at: timestamp('updated_at').notNull()
});

export const articleSchema = {
	insert: createInsertSchema(articlesTable),
	select: createSelectSchema(articlesTable)
};

export type Article = InferModel<typeof articlesTable>; // return type when queried
export type ArticleSelect = z.infer<typeof articleSchema.select>;
export type ArticleInsert = z.infer<typeof articleSchema.insert>;
