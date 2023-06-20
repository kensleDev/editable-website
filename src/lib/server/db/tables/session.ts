import type { InferModel } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const sessionTable = pgTable('session', {
	session_id: uuid('session_id').defaultRandom().primaryKey(),
	expires: timestamp('expires').notNull()
});

export const sessionSchema = {
	insert: createInsertSchema(sessionTable),
	select: createSelectSchema(sessionTable)
};

export type Session = InferModel<typeof sessionTable>; // return type when queried
export type SessionSelect = z.infer<typeof sessionSchema.select>;
export type SessionInsert = z.infer<typeof sessionSchema.insert>;

// model Session {
//   session_id     String    @default(dbgenerated("gen_random_uuid()")) @id
//   expires        DateTime
// }
