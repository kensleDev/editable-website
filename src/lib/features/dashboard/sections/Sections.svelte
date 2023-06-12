<script lang="ts">
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { fetchJSON } from '$lib/util';
	import { createEventDispatcher, onMount } from 'svelte';

	export let pageData: any;
	export let view: 'edit' | 'add' = 'edit';

	const sections = Object.keys(pageData)
		.map((section) => pageData[section])
		.sort((a, b) => a.order - b.order);

	let avalibleComponents: { dir: string; name: string }[];

	const emit = createEventDispatcher();

	function addComponentToPage(componentName: string) {
		emit('addComponent', componentName);
	}

	onMount(async () => {
		avalibleComponents = await fetchJSON('GET', '/api/get-avalible-components');
		console.log({ avalibleComponents });
	});
</script>

{#if view === 'edit'}
	<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
		<PrimaryButton on:click={() => emit('changeView', 'add sections')}>Add section</PrimaryButton>
	</div>

	<h2 class="w-full">Sections</h2>
	{#each sections as section}
		<p>{section.content}</p>
	{/each}
{/if}

{#if view === 'add' && avalibleComponents}
	<h2 class="w-full mx-auto text-center p-4">Add Component</h2>
	<div class="grid grid-cols-3">
		{#each avalibleComponents as component}
			<p
				class="w-full h-20 flex items-center justify-center"
				on:click={() => addComponentToPage(component.name)}
				on:keyup={null}
			>
				{component.name}
			</p>
		{/each}
	</div>
{/if}
