<script lang="ts">
	export let editable: boolean;
	export let content: string;
	export let multiLine = false;
</script>

{#if editable}
	{#await import('./PlainTextEditor.svelte')}
		{@html content}
	{:then PlainTextEditor}
		<PlainTextEditor.default {multiLine} bind:content />
	{/await}
{:else}
	{@html content}
{/if}
