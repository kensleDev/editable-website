import { contentStore } from '$lib/stores/content.store';
import { writable } from 'svelte/store';

export type BulletListT = { id: string; items: BulletListItem[] };

export type BulletListItem = {
	text: string;
	icon?: string;
	description?: string;
};
//

const BULLETLIST_PLACEHOLDER: BulletListT = {
	id: 'test',
	items: [
		{ text: 'We treat you as an individual', description: '', icon: 'checklist' },
		{ text: 'We give you full support', icon: 'checklist' },
		{ text: 'Our advice is free', icon: 'checklist' }
	]
};

export const newBulletListStore = () => {
	const bulletLists = writable<BulletListT[]>([BULLETLIST_PLACEHOLDER]);

	const { add, remove, getOne } = contentStore<BulletListT>(bulletLists);

	return {
		subscribe: bulletLists.subscribe,
		add,
		remove,
		getOne
	};
};

export const bulletListStore = newBulletListStore();
