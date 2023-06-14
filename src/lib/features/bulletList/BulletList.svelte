<script lang="ts">
	import RichText from '$lib/components/RichText.svelte';
	import { faqsStore } from './faqs.store';

	import { editable } from '$lib/stores/editable.store';
</script>

<div class="bg-white">
	<div class="max-w-screen-md mx-auto px-6">
		<div class="font-bold text-sm sm:text-base pt-12 sm:pt-24 -mb-6 md:-mb-12">FAQs</div>
		<div class="prose md:prose-xl pb-12 sm:pb-24">
			<RichText multiLine editable={$editable} bind:content={$faqsStore} />
		</div>
	</div>
</div>
