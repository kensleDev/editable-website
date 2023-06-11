<script lang="ts">
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import type { Session } from '@supabase/supabase-js';
	import Head from './Head.svelte';
	import { headStore } from '../head/head.store';
	import { createEventDispatcher } from 'svelte';

	const emit = createEventDispatcher();

	export let session: Session | null;
	export let showUserMenu: boolean;
	export let toggleEdit: () => void;
	export let closeUserMenu: () => void;

	let view: 'menu' | 'head' = 'menu';

	function save() {
		view = 'menu';
		emit('save');
	}
</script>

{#if showUserMenu}
	<Modal on:close={() => closeUserMenu}>
		{#if view === 'menu'}
			<form class="w-full block" method="POST">
				<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
					<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
					<LoginMenu {session} />
					<PrimaryButton on:click={() => (view = 'head')}>Edit head</PrimaryButton>
				</div>
			</form>
		{/if}
		{#if view === 'head'}
			<!-- <form class="w-full block" method="POST"> -->
			<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
				<p>Head</p>
				<label>Title</label>
				<input type="text" bind:value={$headStore.title} />

				<button on:click={save}>Save</button>
			</div>
			<!-- </form> -->
		{/if}
	</Modal>
{/if}
