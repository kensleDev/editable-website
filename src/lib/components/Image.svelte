<script lang="ts">
	export let editable: boolean;
	export let session: any;
	export let src: string;
	export let alt: string;
	export let maxWidth: number | string;
	export let maxHeight: number | string;
	export let quality: number | string;
	export let className: string;

	// let className = class;
</script>

{#if editable}
	{#await import('./ImageEditor.svelte')}
		<img class={className} {src} {alt} />
	{:then ImageEditor}
		<ImageEditor {session} class={className} bind:src {alt} {maxWidth} {maxHeight} {quality} />
	{/await}
{:else}
	<img class={className} {src} {alt} />
{/if}
