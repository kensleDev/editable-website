<script lang="ts">
	import PlainText from '$lib/components/PlainText.svelte';
	import { bulletList } from 'prosemirror-schema-list';

	export let editable = true;

	const card1 = {
		heading: { title: 'We can help you be free from debt', tag: 'h1' },
		list: {
			variant: 'checklist',
			items: [
				{ title: 'We treat you as an individual', description: '' },
				{ title: 'We give you full support' },
				{ title: 'Our advice is free' }
			]
		}
	};

	const card2 = {
		heading: { title: 'Start getting your finances back on track', tag: 'h2' },
		button: { title: 'Get debt help', theme: 'primary', link: 'https://stepchange.org' },
		bulletList: [
			{
				icon: 'padlock',
				text: 'Our debt advice is 100% impartial and confidential',
				description: '',
				link: 'https://stepchange.org'
			}
		],
		image: { href: 'womenChatting', alt: '' }
	};
</script>

<h1>SC</h1>

<div class="container flex w-full">
	<section>
		<svelte:element this={card1.heading.tag}>
			<PlainText {editable} bind:content={card1.heading.title} />
		</svelte:element>

		<dl class="list-dl">
			{#each card1.list.items as item}
				<div>
					<span class="badge bg-primary-500">💀</span>
					<span class="flex-auto">
						<dt>
							<PlainText {editable} bind:content={item.title} />
						</dt>
						{#if item.description}
							<dd>
								<PlainText {editable} bind:content={item.description} />
							</dd>
						{/if}
					</span>
				</div>
			{/each}
		</dl>
	</section>

	<section>
		<svelte:element this={card2.heading.tag}>
			<PlainText {editable} bind:content={card2.heading.title} />
		</svelte:element>

		<button class="btn">{card2.button.title} </button>

		{#if card2.bulletList.length === 1}
			<div class="flex items-center">
				<span class="badge bg-primary-500">💀</span>
				<span class="flex-auto">
					<dt>
						<PlainText {editable} bind:content={card2.bulletList[0].text} />
					</dt>
					{#if card2.bulletList[0].description}
						<dd>
							<PlainText {editable} bind:content={card2.bulletList[0].description} />
						</dd>
					{/if}
				</span>
			</div>
		{/if}
	</section>
</div>
