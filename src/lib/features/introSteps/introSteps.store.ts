import { writable } from 'svelte/store';

export type IntroStepT = {
	label: string;
	title: string;
	description: string;
};

export const newIntroStepsStore = () => {
	// const introSteps = writable<IntroStepT[]>(introStepsPlaceholder);
	//
	// function setStep(index: number, step?: IntroStepT) {
	// 	introSteps.update((s) => {
	// 		if (step) s[index - 1] = step;
	// 		return s;
	// 	});
	// }

	const stepOne = writable<IntroStepT>({
		label: 'THE PROBLEM',
		title: 'The problem statement',
		description: 'Describe the problem you are solving in a short sentence.'
	});

	const stepTwo = writable<IntroStepT>({
		label: 'THE DREAM',
		title: 'This is how it should be.',
		description: 'Describe why it should be like that.'
	});

	const stepThree = writable<IntroStepT>({
		label: 'THE REALITY',
		title: 'A statement why it is not that easy.',
		description: 'Describe the reality a bit more.'
	});

	const stepFour = writable<IntroStepT>({
		label: 'THE PROMISE',
		title: 'Still the solution is worth it.',
		description: 'And why this is, should be described here.'
	});

	return {
		stepOne,
		stepTwo,
		stepThree,
		stepFour
		// subscribe: introSteps.subscribe,
		// setStep: setStep
		// addTestimonial,
		// deleteTestimonial,
		// moveTestimonial
	};
};

export const introStepsStore = newIntroStepsStore();

// introStep1 = JSON.parse(
// 	JSON.stringify(
// 		data.page?.introStep1 || {
// 			label: 'THE PROBLEM',
// 			title: 'The problem statement',
// 			description: 'Describe the problem you are solving in a short sentence.'
// 		}
// 	)
// );
// introStep2 = JSON.parse(
// 	JSON.stringify(
// 		data.page?.introStep2 || {
// 			label: 'THE DREAM',
// 			title: 'This is how it should be.',
// 			description: 'Describe why it should be like that.'
// 		}
// 	)
// );
// introStep3 = JSON.parse(
// 	JSON.stringify(
// 		data.page?.introStep3 || {
// 			label: 'THE REALITY',
// 			title: 'A statement why it is not that easy.',
// 			description: 'Describe the reality a bit more.'
// 		}
// 	)
// );
// introStep4 = JSON.parse(
// 	JSON.stringify(
// 		data.page?.introStep4 || {
// 			label: 'THE PROMISE',
// 			title: 'Still the solution is worth it.',
// 			description: 'And why this is, should be described here.'
// 		}
// 	)
// );
