import { writable } from 'svelte/store';

export type BulletListT = BulletListItem[];

export type BulletListItem = {
	text: string;
	icon?: string;
	description?: string;
};
//

const BULLETLIST_PLACEHOLDER: BulletListT = [
	{ text: 'We treat you as an individual', description: '', icon: 'checklist' },
	{ text: 'We give you full support', icon: 'checklist' },
	{ text: 'Our advice is free', icon: 'checklist' }
];

export const newBulletListStore = () => {
	const faqs = writable<string>(BULLETLIST_PLACEHOLDER);

	return {
		subscribe: faqs.subscribe,
		set: faqs.set
		// addTestimonial,
		// deleteTestimonial,
		// moveTestimonial
	};
};

export const bulletListStore = newBulletListStore();
