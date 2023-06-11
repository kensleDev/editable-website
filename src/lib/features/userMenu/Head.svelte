<script lang="ts">
	import { headStore } from '../head/head.store';
</script>

<svelte:head>
	<title>{$headStore.title}</title>
	<meta {...$headStore.metaTag} />
	{#each $headStore.links as link}
		<link {...link} />
	{/each}
</svelte:head>
