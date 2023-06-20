import type { InferModel } from 'drizzle-orm';
import { json, pgTable, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const pageTable = pgTable('page', {
	page_id: uuid('page_id').defaultRandom().primaryKey(),
	data: json('data').notNull()
});

export const pageSchema = {
	insert: createInsertSchema(pageTable),
	select: createSelectSchema(pageTable)
};

export type Page = InferModel<typeof pageTable>; // return type when queried
export type PageSelect = z.infer<typeof pageSchema.select>;
export type PageInsert = z.infer<typeof pageSchema.insert>;

// model Page {
//   page_id        String    @id
//   data           Json
//   sections       Json @default("[]")
// }
