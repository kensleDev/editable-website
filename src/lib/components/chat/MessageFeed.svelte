<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { onMount } from 'svelte/internal';

	// Components
	import { Avatar } from '@skeletonlabs/skeleton';
	import { currentChat } from '$lib/stores/chats.store';

	interface MessageFeed {
		id: number;
		host: boolean;
		avatar: number;
		name: string;
		timestamp: string;
		message: string;
		color: string;
	}

	let elemChat: HTMLElement;

	// For some reason, eslint thinks ScrollBehavior is undefined...
	// eslint-disable-next-line no-undef
	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	// When DOM mounted, scroll to bottom
	onMount(() => {
		scrollChatBottom();
	});
</script>

<section bind:this={elemChat} class="max-h-[500px] p-4 overflow-y-auto space-y-4">
	{#each $currentChat.messages as bubble}
		{#if bubble.host === true}
			<div class="grid grid-cols-[auto_1fr] gap-2">
				<Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
				<div class="card p-4 variant-soft rounded-tl-none space-y-2">
					<header class="flex justify-between items-center">
						<p class="font-bold">{bubble.name}</p>
						<small class="opacity-50">{bubble.timestamp}</small>
					</header>
					<p>{bubble.message}</p>
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-[1fr_auto] gap-2">
				<div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
					<header class="flex justify-between items-center">
						<p class="font-bold">{bubble.name}</p>
						<small class="opacity-50">{bubble.timestamp}</small>
					</header>
					<p>{bubble.message}</p>
				</div>
				<Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
			</div>
		{/if}
	{/each}
</section>
