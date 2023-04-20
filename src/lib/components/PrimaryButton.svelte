<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	export let size: 'sm' | 'default' | 'lg' = 'default';
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let href: string | undefined = undefined;
	export let disabled = false;
</script>

<BaseButton
	{type}
	{size}
	{disabled}
	{href}
	styles="font-medium hover:bg-gray-800 focus:ring-gray-900 border-2 border-transparent bg-gray-900 text-white"
	on:click
>
	<slot />
</BaseButton>
