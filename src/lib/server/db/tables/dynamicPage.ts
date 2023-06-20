import type { InferModel } from 'drizzle-orm';
import { pgTable, text, json } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const dynamicPageTable = pgTable('page', {
	dynamic_page_id: text('dynamic_page_id').primaryKey(),
	path: text('path').notNull(),
	theme: text('theme'),
	data: json('data').notNull(),
	head: json('head').notNull()
});

export const dynamicPageSchema = {
	insert: createInsertSchema(dynamicPageTable),
	select: createSelectSchema(dynamicPageTable)
};

export type DynamicPage = InferModel<typeof dynamicPageTable>; // return type when queried
export type dynamicPageSelect = z.infer<typeof dynamicPageSchema.select>;
export type DynamicPageInsert = z.infer<typeof dynamicPageSchema.insert>;

// model Dpage {
//   dpage_id       String    @id
//   path           String    @unique
//   theme          String
//   data           Json      @default("{}")
//   head           Json      @default("{}")
// }
//
