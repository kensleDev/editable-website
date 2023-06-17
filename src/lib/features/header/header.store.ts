import { contentStore } from '$lib/stores/content.store';
import { writable } from 'svelte/store';

export type HeaderT = { id: string; content: string; tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' };

const HEADER_PLACEHOLDER: HeaderT = {
	id: 'test',
	content: 'Testing 1 2',
	tag: 'h2'
};

export const newHeaderStore = () => {
	const headers = writable<HeaderT[]>([HEADER_PLACEHOLDER]);

	const { add, remove, getOne } = contentStore<HeaderT>(headers);

	return {
		subscribe: headers.subscribe,
		add,
		remove,
		getOne
	};
};

export const headerStore = newHeaderStore();
