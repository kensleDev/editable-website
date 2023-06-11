<script lang="ts">
	import RichText from '$lib/components/RichText.svelte';
	import { faqStore } from './faq.store';

	export let editable: boolean;
</script>

<div class="bg-white">
	<div class="max-w-screen-md mx-auto px-6">
		<div class="font-bold text-sm sm:text-base pt-12 sm:pt-24 -mb-6 md:-mb-12">FAQs</div>
		<div class="prose md:prose-xl pb-12 sm:pb-24">
			<RichText multiLine {editable} bind:content={$faqStore} />
		</div>
	</div>
</div>
