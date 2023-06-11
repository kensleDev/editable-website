import { writable } from 'svelte/store';

export type BioT = {
	image: string;
	title: string;
	content: string;
};

const BIO_CONTENT_PLACEHOLDER = `
  <p>Modern tools, such as Svelte and Tailwind allow you to easily hand-craft fast and beautiful websites. What’s missing is the ability to <strong>make edits without changing the source code</strong>.</p>
  <p>With this <a href="https://github.com/michael/editable-website">open-source website template</a>, I want to fill that gap.</p>
  <p>If you have questions or need any help, contact me.</p>
`;

const BIO_IMAGE_PLACEHOLDER = '/images/person-placeholder.jpg';
const BIO_TITLE_PLACEHOLDER = "Hi, I'm Michael — I want your website to be editable.";

export const newTestimonialStore = () => {
	const bio = writable<BioT>({
		title: BIO_TITLE_PLACEHOLDER,
		image: BIO_IMAGE_PLACEHOLDER,
		content: BIO_CONTENT_PLACEHOLDER
	});

	function setBio(title?: string, image?: string, content?: string) {
		console.log({ title, image, content });
		bio.update((s) => {
			if (title) s.title = title;
			if (image) s.image = image;
			if (content) s.content = content;
			return s;
		});
	}

	return {
		subscribe: bio.subscribe,
		setBio
		// addTestimonial,
		// deleteTestimonial,
		// moveTestimonial
	};
};

export const bioStore = newTestimonialStore();
