import { writable } from 'svelte/store';

// export type BioT = {
// 	image: string;
// 	title: string;
// 	content: string;
// };

const FAQS_PLACEHOLDER = `
  <h2>Question 1</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
  <h2>Question 2</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.</p>
`;

export const newFaqStore = () => {
	const faqs = writable<string>(FAQS_PLACEHOLDER);

	return {
		subscribe: faqs.subscribe,
		set: faqs.set
		// addTestimonial,
		// deleteTestimonial,
		// moveTestimonial
	};
};

export const faqsStore = newFaqStore();
