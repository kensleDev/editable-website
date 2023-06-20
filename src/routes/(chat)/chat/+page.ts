import { chatsStore, currentChatStore } from '$lib/stores/chat';
// import { get } from 'svelte/store';

export const load = async ({ data, parent }) => {
	await parent();
	console.log({ client: data });

	chatsStore.set(data.chats);
	// currentChatStore.set(data.chats[0]);
	// console.log(get(chatsStore));
};
