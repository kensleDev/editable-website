<script lang="ts">
	import PlainText from '$lib/components/PlainText.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import { titleStore } from './title.store';

	export let title = $titleStore;
	export let tag = 'h1';
	export let editable = true;

	console.log($titleStore);
</script>

<svelte:element this={tag}>
	<PlainText {editable} bind:content={title} />
</svelte:element>
