import { db } from '$lib/plugins/drizzle';
import { getCurrentTimestamp } from '$lib/utils/datetime';
import { createMessage } from '$lib/server/api/message';
import type { Actions } from '@sveltejs/kit';
// import { chats, messages } from '../../db/schema';
// import { desc, eq } from 'drizzle-orm';
import { createChat, deleteChat, renameChat } from '$lib/server/api/chat';

export async function load() {
	const chats = await db.query.chats.findMany({
		with: {
			messages: true
		}
	});

	// const sortedChats = chats.map((chat) => {
	// 	chat.messages = chat.messages.sort(
	// 		(a, b) =>
	// 			new Date(a.timestamp as string).getTime() - new Date(b.timestamp as string).getTime()
	// 	);
	//
	// 	return chat;
	// });

	return { chats };
}

export const actions: Actions = {
	async newMessage({ request, fetch }) {
		try {
			const formData = await request.formData();
			const chatId = formData.get('chatId');
			const prompt = formData.get('prompt');

			console.log({ chatId });

			const newMessage = {
				chatId: parseInt(chatId as string),
				host: true,
				avatar: 1,
				name: 'You',
				timestamp: getCurrentTimestamp(),
				message: prompt
			};

			console.log({ newMessage });

			await createMessage(newMessage as any);

			return { success: true, message: newMessage };
		} catch (error) {
			console.error(error);
			throw error; // Re-throw the error after logging it
		}
	},

	async createChat({ request }) {
		try {
			const formData = await request.formData();
			const chatName = formData.get('chatName');

			const newChat = {
				name: chatName || 'New Chat'
			};

			await createChat(newChat);

			return { success: true };
		} catch (error) {
			console.log({ error });
		}
	},

	async deleteChat({ request }) {
		const formData = await request.formData();
		const chatId = formData.get('chatId');

		await deleteChat(+(chatId as string));
		return { success: true };
	},

	async renameChat({ request }) {
		const formData = await request.formData();
		const chatId = formData.get('chatId');
		const chatName = formData.get('chatName');

		await renameChat(+(chatId as string), chatName as string);
		return { success: true };
	}
};
