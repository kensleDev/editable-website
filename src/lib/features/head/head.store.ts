import { writable } from 'svelte/store';

export type HeadT = {
	title: string;
	metaTag: any;
	links: any[];
};

const HEAD_TITLE_PLACEHOLDER = 'Change me!';
const HEAD_META_TAG_PLACEHOLDER = {
	name: 'description',
	content: 'Make changes to your website while browsing it.'
};

const HEAD_LINKS_PLACEHOLDER: any[] = [
	{
		rel: 'alternate',
		hreflang: 'en',
		href: 'https://editable-website'
	},
	{ rel: 'canonical', href: 'https://editable.website' }
];

const HEAD_PLACEHOLDER = {
	title: HEAD_TITLE_PLACEHOLDER,
	metaTag: HEAD_META_TAG_PLACEHOLDER,
	links: HEAD_LINKS_PLACEHOLDER
};

const newHeadStore = () => {
	const head = writable<HeadT>(HEAD_PLACEHOLDER);

	return {
		subscribe: head.subscribe,
		set: head.set
	};
};

export const headStore = newHeadStore();
