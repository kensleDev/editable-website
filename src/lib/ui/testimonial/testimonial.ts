import { writable } from 'svelte/store';

export type Testimonial = {
	text: string;
	image: string;
	name: string;
};

function newTestimonialStore() {
	const testimonials = writable<Testimonial[]>([]);

	function addPlaceholder(pageData: any, placeholder: Testimonial[]) {
		testimonials.update((s) => {
			s = JSON.parse(JSON.stringify(pageData || placeholder));
			return s;
		});
	}

	function add() {
		const newTestimonial = {
			text: '“Add a quote text here”',
			image: '/images/person-placeholder.jpg',
			name: 'Firstname Lastname · example.com'
		};

		testimonials.update((s) => {
			s.push(newTestimonial);
			return s;
		});
	}

	function remove(index: number) {
		testimonials.update((s) => {
			s.splice(index, 1);
			return s;
		});
	}

	function move(index: number, direction: 'up' | 'down') {
		testimonials.update((s) => {
			let toIndex;
			if (direction === 'up' && index > 0) {
				toIndex = index - 1;
			} else if (direction === 'down' && index < s.length - 1) {
				toIndex = index + 1;
			}
			// Remove item from original position

			const element = s.splice(index, 1)[0];
			// Insert at new position
			s.splice(toIndex as number, 0, element);
			return s;
		});
	}

	return {
		subscribe: testimonials.subscribe,
		set: testimonials.set,
		add,
		addPlaceholder,
		remove,
		move
	};

	// function addTestimonial() {
	//   testimonials.push({
	//     text: '“Add a quote text here”',
	//     image: '/images/person-placeholder.jpg',
	//     name: 'Firstname Lastname · example.com'
	//   });
	//   testimonials = testimonials; // trigger update
	// }
	//
	// function deleteTestimonial(index) {
	//   testimonials.splice(index, 1);
	//   testimonials = testimonials; // trigger update
	// }
	//
	// function moveTestimonial(index, direction) {
	//   let toIndex;
	//   if (direction === 'up' && index > 0) {
	//     toIndex = index - 1;
	//   } else if (direction === 'down' && index < testimonials.length - 1) {
	//     toIndex = index + 1;
	//   } else {
	//     return; // operation not possible
	//   }
	//   // Remove item from original position
	//   const element = testimonials.splice(index, 1)[0];
	//   // Insert at new position
	//   testimonials.splice(toIndex, 0, element);
	//   testimonials = testimonials; // trigger update
	// }
}

export const testimonials = newTestimonialStore();
