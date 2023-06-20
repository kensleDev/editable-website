import type { Message } from 'ai';
import { messageSchema, messages } from '../../db/schema';
import { db } from '$lib/plugins/drizzle';

export const createMessage = async (newMessage: Message) => {
	const parsedMessage = await messageSchema.insert.parseAsync(newMessage);
	return db.insert(messages).values(parsedMessage);
};
