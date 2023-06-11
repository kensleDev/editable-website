<script lang="ts">
	import { titleStore } from './title.store';

	export let title = $titleStore;
	export let tag = 'h1';

	console.log($titleStore);
</script>

<svelte:element this={tag}>{title}</svelte:element>
