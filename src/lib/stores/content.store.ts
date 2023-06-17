import { get, type Writable } from 'svelte/store';

export function contentStore<T extends { id: string }>(store: Writable<T[]>) {
	return {
		add: (item: T) => store.update((items: T[]) => [...items, item]),

		remove: (id: string) => store.update((items: T[]) => items.filter((item) => item.id !== id)),

		getOne: (id: string) => {
			const items = get(store);
			return items.filter((list) => list.id === id)[0];
		}
	};
}
