import { writable } from 'svelte/store';

const newTitleStore = () => {
	const title = writable<string>('Change me!');

	return {
		subscribe: title.subscribe,
		set: title.set
	};
};

export const titleStore = newTitleStore();
