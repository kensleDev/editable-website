import type { Chat, ChatMessage } from '@prisma/client';
import { get, writable } from 'svelte/store';

// export interface Chat {
// 	id: string;
// 	name: string;
// 	messages: Message[];
// }
//
// export interface Message {
// 	id: string;
// 	host: boolean;
// 	avatar: number;
// 	name: string;
// 	timestamp: string;
// 	message: string;
// 	color: string;
// }
//
// function getCurrentTimestamp(): string {
// 	return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
// }

function newChatsStore() {
	const chats = writable<Chat[]>([]);

	return {
		subscribe: chats.subscribe,
		addChat: (chat: Chat) => chats.update((chats) => [...chats, chat]),
		addMessage: (id: number, message: ChatMessage) => {
			return chats.update((chats) =>
				chats.map((chat) => {
					if (chat.id === id) {
						chat.messages.push(message);
					}
					return chat;
				})
			);
		}
	};
}

export const chatsStore = newChatsStore();

export const currentMessage = writable<ChatMessage | null>(null);

export const currentChat = writable<Chat>(<Chat>{});

currentChat.subscribe((res) => console.log({ res }));
