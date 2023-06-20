import { relations, type InferModel } from 'drizzle-orm';
import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { messagesTable } from './messages';
import type { z } from 'zod';

// Chat

export const chatsTable = pgTable('chats', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 })
});

export const chatsRelations = relations(chatsTable, ({ many }) => ({
	messages: many(messagesTable)
}));

export const chatSchema = {
	insert: createInsertSchema(chatsTable),
	select: createSelectSchema(chatsTable)
};

export type Chat = InferModel<typeof chatsTable>; // return type when queried
export type ChatSelect = z.infer<typeof chatSchema.select>;
export type ChatInsert = z.infer<typeof chatSchema.insert>;
