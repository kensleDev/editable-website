<script lang="ts">
	import MessageFeed from '$lib/components/chat/MessageFeed.svelte';
	import Prompt from '$lib/components/chat/Prompt.svelte';
	import { chatsStore, currentChatStore } from '$lib/stores/chat.js';

	// chatsStore.subscribe((chats) => console.log({ chats }));
	// currentChatStore.subscribe((current) => console.log({ current }));
</script>

<section class="chat-feed card h-full">
	<div class="chat w-full h-full max-h-[100vh] grid grid-cols-1">
		<MessageFeed {currentChatStore} />
		<Prompt {currentChatStore} {chatsStore} />
	</div>
</section>

<!-- Navigation -->
<!-- <div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30"> -->
<!-- 	<header class="border-b border-surface-500/30 p-4"> -->
<!-- 		<input class="input" type="search" placeholder="Search..." /> -->
<!-- 	</header> -->
<!---->
<!-- 	<ChatList {chatsStore} {currentChatStore} /> -->
<!-- </div> -->

<!-- Chat -->
<!-- <div class="grid grid-row-[1fr_auto]"> -->
<!-- Conversation -->
