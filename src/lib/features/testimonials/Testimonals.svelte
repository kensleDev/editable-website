<script lang="ts">
	import { type TestimonialT, testimonialsStore } from './testimonials.store';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import Testimonial from './Testimonial.svelte';

	export let testimonials: TestimonialT[];
	export let editable: boolean;
	export let session: any;
</script>

<div class="bg-white pb-6 sm:pb-12">
	<div class="max-w-screen-md mx-auto px-6">
		<div class="font-bold text-sm sm:text-base py-12 sm:pt-24 pb-8">WHAT PEOPLE SAY</div>
	</div>
	{#each testimonials as testimonial, i}
		<Testimonial
			{editable}
			{session}
			bind:testimonial
			firstEntry={i === 0}
			lastEntry={i === testimonials.length - 1}
			on:delete={() => testimonialsStore.deleteTestimonial(i)}
			on:up={() => testimonialsStore.moveTestimonial(i, 'up')}
			on:down={() => testimonialsStore.moveTestimonial(i, 'down')}
		/>
	{/each}

	{#if editable}
		<div class="text-center pb-12 border-b border-gray-100">
			<SecondaryButton on:click={testimonialsStore.addTestimonial}>Add testimonial</SecondaryButton>
		</div>
	{/if}
</div>
