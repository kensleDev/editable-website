<script lang="ts">
	import PlainText from '$lib/components/PlainText.svelte';
	import { buttonStore } from '$lib/features/button/button.store';

	export let editable: boolean = false;
	export let id = 'tester';

	const buttonData = buttonStore.getOne(id);
</script>

{#if buttonData.link}
	<a href={buttonData.link} class={`btn ${buttonData.variant}`}>
		<PlainText {editable} bind:content={buttonData.text} />
	</a>
{:else}
	<button class="btn">
		<PlainText {editable} bind:content={buttonData.text} />
	</button>
{/if}
