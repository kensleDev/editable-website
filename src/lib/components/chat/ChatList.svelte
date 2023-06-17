<script lang="ts">
	import { Avatar, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { faker } from '@faker-js/faker';
	import { currentChat } from '$lib/stores/chats.store';

	export let chats: any[];
</script>

<div class="p-4 space-y-4 overflow-y-auto">
	<small class="opacity-50">Chats</small>
	<ListBox active="variant-filled-primary">
		{#each chats as chat}
			<ListBoxItem bind:group={$currentChat} name="chats" value={chat}>
				<svelte:fragment slot="lead">
					<Avatar src="https://i.pravatar.cc/300" width="w-8" />
				</svelte:fragment>
				{chat.name}
			</ListBoxItem>
		{/each}
	</ListBox>
</div>
