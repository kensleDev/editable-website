<script lang="ts">
	import BaseButton from '$lib/components/BaseButton.svelte';
	export let disabled: boolean | undefined = undefined;
	export let type: 'button' | 'reset' | 'submit' | null | undefined = 'button';
	export let size: 'sm' | 'default' | 'lg' = 'default';
	export let href: string | undefined = undefined;
</script>

<BaseButton
	{href}
	{type}
	{size}
	{disabled}
	styles="font-medium hover:bg-gray-100 focus:ring-gray-100 border-2 border-gray-100 bg-white"
	on:click
>
	<slot />
</BaseButton>
