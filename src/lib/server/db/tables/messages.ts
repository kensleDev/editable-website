import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { chatsTable, type Chat } from './chats';
import type { z } from 'zod';

export const messagesTable = pgTable('messages', {
	id: serial('id').primaryKey(),
	chatId: integer('chatId').notNull(),
	host: boolean('host'),
	avatar: integer('avatar'),
	name: varchar('name', { length: 100 }),
	timestamp: varchar('timestamp', { length: 100 }),
	message: varchar('message', { length: 5000 })
});

export const messagesRelations = relations(messagesTable, ({ one }) => ({
	chat: one(chatsTable, { fields: [messagesTable.chatId], references: [chatsTable.id] })
}));

export const messageSchema = {
	insert: createInsertSchema(messagesTable),
	select: createSelectSchema(messagesTable)
};

export type Message = InferModel<typeof messagesTable>; // return type when queried
export type MessageSelect = z.infer<typeof messageSchema.select>;
export type MessageInsert = z.infer<typeof messageSchema.insert>;

export type ChatWithMessages = Chat & { messages: Message[] };
