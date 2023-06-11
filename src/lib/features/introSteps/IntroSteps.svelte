<script lang="ts">
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import IntroStep from './IntroStep.svelte';
	import { introStepsStore } from './introSteps.store';

	export let editable: boolean;
</script>

<div class="pt-12 md:pt-24 border-gray-100 border-b-2">
	<div class="max-w-screen-md mx-auto px-6">
		<div class="relative">
			<div class="w-1 bg-gray-900 absolute inset-0 -top-8 bottom-12 mx-auto z-0">
				<div class="w-4 h-4 rounded-full bg-gray-900 absolute -top-1 -left-[6px]" />
			</div>
			<div class="z-10">
				<IntroStep {editable} bind:intro={$introStepsStore[0]} />
				<IntroStep {editable} bind:intro={$introStepsStore[1]} />
				<IntroStep {editable} bind:intro={$introStepsStore[2]} />
				<IntroStep {editable} bind:intro={$introStepsStore[3]} />
			</div>
		</div>
		<div class="relative h-14">
			<div class="w-1 bg-gray-900 absolute inset-0 -top-16 bottom-12 mx-auto z-0">
				<div
					class="absolute -bottom-2 -left-[7px] h-0 w-0 border-x-[9px] border-x-transparent border-t-[10px] border-gray-900"
				/>
			</div>
		</div>
		<div class="text-center mb-32">
			<PrimaryButton
				size="lg"
				type="button"
				on:click={() =>
					document
						.getElementById('contact')
						?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
				>Create an editable website</PrimaryButton
			>
		</div>
	</div>
</div>
