<script lang="ts">
	import PlainText from '$lib/components/PlainText.svelte';
	import { headerStore } from './header.store';
	export let editable = false;
	export let id: string;

	const header = headerStore.getOne(id);
</script>

<svelte:element this={header.tag}>
	<PlainText {editable} bind:content={header.content} />
</svelte:element>
