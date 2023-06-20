import type { InferModel } from 'drizzle-orm';
import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const counterTable = pgTable('page', {
	counter_id: text('counter_id').primaryKey(),
	count: integer('count').notNull()
});

export const counterSchema = {
	insert: createInsertSchema(counterTable),
	select: createSelectSchema(counterTable)
};

export type Counter = InferModel<typeof counterTable>; // return type when queried
export type CounterSelect = z.infer<typeof counterSchema.select>;
export type CounterInsert = z.infer<typeof counterSchema.insert>;

// model Counter {
//   counter_id     String    @id
//   count          Int
// }
