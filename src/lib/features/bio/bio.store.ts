import { writable } from 'svelte/store';

export type BioT = {
	image: string;
	title: string;
	content: string;
};

const BIO_PLACEHOLDER = {
	content: `
<p>Modern tools, such as Svelte and Tailwind allow you to easily hand-craft fast and beautiful websites. What’s missing is the ability to <strong>make edits without changing the source code</strong>.</p>
<p>With this <a href="https://github.com/michael/editable-website">open-source website template</a>, I want to fill that gap.</p>
<p>If you have questions or need any help, contact me.</p>
  `,
	image: '/images/person-placeholder.jpg',
	title: "Hi, I'm Michael — I want your website to be editable."
};

// const BIO_IMAGE_PLACEHOLDER = '/images/person-placeholder.jpg';
// const BIO_TITLE_PLACEHOLDER = "Hi, I'm Michael — I want your website to be editable.";

export const newTestimonialStore = () => {
	const bio = writable<BioT>(BIO_PLACEHOLDER);

	return {
		subscribe: bio.subscribe,
		set: bio.set
	};
};

export const bioStore = newTestimonialStore();
