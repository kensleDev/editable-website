<!-- <script> -->
<!-- 	import { useChat } from 'ai/svelte' -->
<!---->
<!-- 	const { input, handleSubmit, messages } = useChat() -->
<!-- </script> -->
<!---->
<!-- <svelte:head> -->
<!-- 	<title>Home</title> -->
<!-- 	<meta name="description" content="Svelte demo app" /> -->
<!-- </svelte:head> -->
<!---->
<!-- <section> -->
<!-- 	<h1>useChat</h1> -->
<!-- 	<ul> -->
<!-- 		{#each $messages as message} -->
<!-- 			<li>{message.role}: {message.content}</li> -->
<!-- 		{/each} -->
<!-- 	</ul> -->
<!-- 	<form on:submit={handleSubmit}> -->
<!-- 		<input bind:value={$input} /> -->
<!-- 		<button type="submit">Send</button> -->
<!-- 	</form> -->
<!-- </section> -->
<!---->
<!-- <style> -->
<!-- 	section { -->
<!-- 		display: flex; -->
<!-- 		flex-direction: column; -->
<!-- 		justify-content: center; -->
<!-- 		align-items: center; -->
<!-- 		flex: 0.6; -->
<!-- 	} -->
<!---->
<!-- 	h1 { -->
<!-- 		width: 100%; -->
<!-- 	} -->
<!-- </style> -->

<script lang="ts">
	// import { faker } from '@faker-js/faker';
	// import type { Chat } from '$lib/stores/chats.store';

	// Components
	import MessageFeed from '$lib/components/chat/MessageFeed.svelte';
	import Prompt from '$lib/components/chat/Prompt.svelte';
	import ChatList from '$lib/components/chat/ChatList.svelte';
	import { currentChat } from '$lib/stores/chats.store';

	export let data;
	const { chats } = data;

	// const lorem = faker.lorem.paragraph();

	// const chats: Chat[] = [
	// 	{
	// 		id: '0',
	// 		name: 'test chat',
	// 		messages: [
	// 			{
	// 				id: '0',
	// 				host: true,
	// 				avatar: 48,
	// 				name: 'Jane',
	// 				timestamp: 'Yesterday @ 2:30pm',
	// 				message: lorem,
	// 				color: 'variant-soft-primary'
	// 			},
	// 			{
	// 				id: '1',
	// 				host: false,
	// 				avatar: 14,
	// 				name: 'Michael',
	// 				timestamp: 'Yesterday @ 2:45pm',
	// 				message: lorem,
	// 				color: 'variant-soft-primary'
	// 			}
	// 		]
	// 	},
	//
	// 	{
	// 		id: '1',
	// 		name: 'test chat 2',
	// 		messages: [
	// 			{
	// 				id: '3',
	// 				host: true,
	// 				avatar: 48,
	// 				name: 'Jane',
	// 				timestamp: 'Yesterday @ 2:31pm',
	// 				message: lorem,
	// 				color: 'variant-soft-primary'
	// 			},
	// 			{
	// 				id: '4',
	// 				host: false,
	// 				avatar: 14,
	// 				name: 'Michael',
	// 				timestamp: 'Yesterday @ 2:46pm',
	// 				message: lorem,
	// 				color: 'variant-soft-primary'
	// 			}
	// 		]
	// 	}
	// ];

	currentChat.set(chats[0]);
</script>

<section class="card">
	<div class="chat w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr]">
		<!-- Navigation -->
		<div class="hidden lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500/30">
			<!-- Header -->
			<header class="border-b border-surface-500/30 p-4">
				<input class="input" type="search" placeholder="Search..." />
			</header>

			<!-- List -->
			<ChatList {chats} />
		</div>

		<!-- Chat -->
		<div class="grid grid-row-[1fr_auto]">
			<!-- Conversation -->
			<MessageFeed />

			<!-- Prompt -->
			<Prompt chatId="test" />
		</div>
	</div>
</section>
