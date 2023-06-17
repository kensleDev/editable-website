<script lang="ts">
	import PlainText from '$lib/components/PlainText.svelte';
	import { bulletListStore } from './bulletList.store';

	export let editable: boolean = false;
	export let id = 'tester';

	const initList = bulletListStore.getOne(id);

	console.log({ initList });

	const list = initList.items;
</script>

{#if list.length === 1}
	<div class="flex items-center">
		<span class="badge bg-primary-500">💀</span>
		<span class="flex-auto">
			<dt>
				<PlainText {editable} bind:content={list[0].text} />
			</dt>
			{#if list[0].description}
				<dd>
					<PlainText {editable} bind:content={list[0].description} />
				</dd>
			{/if}
		</span>
	</div>
{:else}
	<ul>
		{#each list as bullet}
			<li class="flex items-center">
				<span class="badge bg-primary-500">💀</span>
				<span class="flex-auto">
					<dt>
						<PlainText {editable} bind:content={bullet.text} />
					</dt>
					{#if bullet.description}
						<dd>
							<PlainText {editable} bind:content={bullet.description} />
						</dd>
					{/if}
				</span>
			</li>
		{/each}
	</ul>
{/if}
