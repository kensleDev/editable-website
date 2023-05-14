<script lang="ts">
	export let editable: boolean;
	export let content: string;
	export let multiLine = false;
</script>

{#if editable}
	{#await import('./RichTextEditor.svelte')}
		{@html content}
	{:then RichTextEditor}
		<RichTextEditor.default {multiLine} bind:content />
	{/await}
{:else}
	<div>
		{@html content}
	</div>
{/if}
