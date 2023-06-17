<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { onMount } from 'svelte/internal';

	export let chatId: string;

	import { chatsStore } from '$lib/stores/chats.store';
	const { addMessage } = chatsStore;

	let msg: string = '';

	function onPromptKeydown(event: KeyboardEvent): void {
		if (['Enter'].includes(event.code)) {
			event.preventDefault();
			addMessage(chatId, newUserMessage(msg));
		}
	}

	function getCurrentTimestamp(): string {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	const newUserMessage = (message: string) => ({
		id: chatId,
		host: true,
		avatar: 48,
		name: 'User',
		timestamp: `Today @ ${getCurrentTimestamp()}`,
		message,
		color: 'variant-soft-primary'
	});
</script>

<section class="border-t border-surface-500/30 p-4">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
		<button class="input-group-shim">+</button>
		<textarea
			bind:value={msg}
			class="bg-transparent border-0 ring-0"
			name="prompt"
			id="prompt"
			placeholder="Write a message..."
			rows="1"
			on:keydown={onPromptKeydown}
		/>
		<button
			class={msg ? 'variant-filled-primary' : 'input-group-shim'}
			on:click={() => addMessage(chatId, newUserMessage(msg))}
		>
			<i class="fa-solid fa-paper-plane" />
		</button>
	</div>
</section>
