<script lang="ts">
	import {
		AppBar,
		AppShell,
		Drawer,
		type DrawerSettings,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import ChatList from '$lib/components/chat/ChatList.svelte';
	import { currentChatStore, chatsStore } from '$lib/stores/chat';

	import Icon from '@iconify/svelte';

	const chatsDraw: DrawerSettings = { id: 'chatList' };
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<button class="p-1" on:click={() => drawerStore.open(chatsDraw)}
					><Icon icon="bi:chat" class="md:hidden" /></button
				></svelte:fragment
			>
			(title)
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div class="hidden md:block h-full min-w-[30vw]">
			<ChatList {chatsStore} {currentChatStore} />
		</div>
	</svelte:fragment>

	<slot />
</AppShell>

<Drawer>
	{#if $drawerStore.id === 'chatList'}
		<ChatList {chatsStore} {currentChatStore} />
	{/if}
</Drawer>
