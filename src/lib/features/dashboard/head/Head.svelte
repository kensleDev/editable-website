<script lang="ts">
	export let title = 'Make your website editable';
	export let metaTag = {
		name: 'description',
		content: 'Make changes to your website while browsing it.'
	};
	export let links = [
		{
			rel: 'alternate',
			hreflang: 'en',
			href: 'https://editable-website'
		},
		{ rel: 'canonical', href: 'https://editable.website' }
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta {...metaTag} />
	{#each links as link}
		<link {...link} />
	{/each}
</svelte:head>
