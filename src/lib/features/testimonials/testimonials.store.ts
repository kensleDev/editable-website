import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

export type TestimonialT = {
	text: string;
	image: string;
	name: string;
};

const TESTIMONIALS_PLACEHOLDER: TestimonialT[] = [
	{
		text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.”',
		image: '/images/person-placeholder.jpg',
		name: 'Jane Doe · jane-doe.org'
	}
];

export const newTestimonialStore = () => {
	const testimonials = writable<TestimonialT[]>(
		JSON.parse(JSON.stringify(TESTIMONIALS_PLACEHOLDER))
	);

	function addTestimonial() {
		testimonials.update((s) => {
			s.push({
				text: '“Add a quote text here”',
				image: '/images/person-placeholder.jpg',
				name: 'Firstname Lastname · example.com'
			});
			return s;
		});
	}

	function deleteTestimonial(index: number) {
		testimonials.update((s) => {
			s.splice(index, 1);
			return s;
		});
	}

	function moveTestimonial(index: number, direction: 'up' | 'down') {
		testimonials.update((s) => {
			let toIndex;
			if (direction === 'up' && index > 0) {
				toIndex = index - 1;
			} else if (direction === 'down' && index < s.length - 1) {
				toIndex = index + 1;
			} else {
				return s; // operation not possible
			}
			// Remove item from original position
			const element = s.splice(index, 1)[0];
			// Insert at new position
			s.splice(toIndex, 0, element);
			// testimonials = testimonials; // trigger update
			return s;
		});
	}

	return {
		subscribe: testimonials.subscribe,
		set: testimonials.set,
		addTestimonial,
		deleteTestimonial,
		moveTestimonial
	};
};

export const testimonialsStore = newTestimonialStore();
