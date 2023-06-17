import { contentStore } from '$lib/stores/content.store';
import { writable } from 'svelte/store';

export type ButtonT = {
	id: string;
	text: string;
	variant: string;

	// 'filled' | 'ringed' | 'ghost' | 'soft';
	// style:
	// 	| 'surface'
	// 	| 'primary'
	// 	| 'secondary'
	// 	| 'tertiary'
	// 	| 'error'
	// 	| 'warning'
	// 	| 'success'
	// 	| 'info';
	link?: string;
};

const BUTTON_PLACEHOLDER: ButtonT = {
	id: 'test',
	text: 'Testing 1 2',
	variant: 'variant-filled-primary'
};

export const newButtonStore = () => {
	const buttons = writable<ButtonT[]>([BUTTON_PLACEHOLDER]);

	const { add, remove, getOne } = contentStore<ButtonT>(buttons);

	return {
		subscribe: buttons.subscribe,
		add,
		remove,
		getOne
	};
};

export const buttonStore = newButtonStore();
