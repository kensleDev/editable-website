import { writable } from 'svelte/store';

export type IntroStepT = {
	label: string;
	title: string;
	description: string;
};

const INTRO_STEPS_PLACEHOLDER = [
	{
		label: 'THE PROBLEM',
		title: 'The problem statement',
		description: 'Describe the problem you are solving in a short sentence.'
	},
	{
		label: 'THE DREAM',
		title: 'This is how it should be.',
		description: 'Describe why it should be like that.'
	},
	{
		label: 'THE REALITY',
		title: 'A statement why it is not that easy.',
		description: 'Describe the reality a bit more.'
	},
	{
		label: 'THE PROMISE',
		title: 'Still the solution is worth it.',
		description: 'And why this is, should be described here.'
	}
];

export const newIntroStepsStore = () => {
	const introSteps = writable<IntroStepT[]>(INTRO_STEPS_PLACEHOLDER);

	return {
		subscribe: introSteps.subscribe,
		set: introSteps.set
	};
};

export const introStepsStore = newIntroStepsStore();
