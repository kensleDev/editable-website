import { chatSchema, chats, messages } from '../../db/schema';
import { db } from '$lib/plugins/drizzle';
import { eq } from 'drizzle-orm';

export const createChat = async (newChat: any) => {
	const parsedChat = await chatSchema.insert.parseAsync(newChat);
	return db.insert(chats).values(parsedChat);
};

export const deleteChat = async (chatId: number) => {
	// First, find the messages related to the chat
	const messagesToDelete = await db
		.select({ messageId: messages.id })
		.from(messages)
		.innerJoin(chats, eq(chats.id, messages.chatId))
		.where(eq(chats.id, chatId));

	if (messagesToDelete.length > 0) {
		// Then, delete the messages
		for (const { messageId } of messagesToDelete) {
			await db.delete(messages).where(eq(messages.id, messageId));
		}
	}

	// Finally, delete the chat
	await db.delete(chats).where(eq(chats.id, chatId));
};

export const renameChat = async (chatId: number, newName: string) => {
	await db.update(chats).set({ name: newName }).where(eq(chats.id, chatId));
};
