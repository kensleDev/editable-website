<script lang="ts">
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import type { Session } from '@supabase/supabase-js';
	import { headStore } from '../head/head.store';
	import { createEventDispatcher } from 'svelte';

	const emit = createEventDispatcher();

	export let session: Session | null;
	export let sections: string[];
	export let showUserMenu: boolean;
	export let toggleEdit: () => void;
	export let closeUserMenu: () => void;

	type UserMenuViews = 'menu' | 'head' | 'sections';

	let view: UserMenuViews = 'menu';

	function save() {
		view = 'menu';
		emit('save');
	}

	function changeView(newView: UserMenuViews) {
		view = newView;
		if (newView === 'sections') emit('getSections');
	}
</script>

{#if showUserMenu}
	<Modal on:close={() => closeUserMenu}>
		{#if view === 'menu'}
			<form class="w-full block" method="POST">
				<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
					<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
					<LoginMenu {session} />
					<PrimaryButton on:click={() => changeView('head')}>Edit head</PrimaryButton>
					<PrimaryButton on:click={() => changeView('sections')}>Edit sections</PrimaryButton>
				</div>
			</form>
		{/if}

		{#if view === 'head'}
			<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
				<p>Head</p>
				<label>Title</label>
				<input type="text" bind:value={$headStore.title} />

				<button on:click={save}>Save</button>
			</div>
		{/if}

		{#if view === 'sections'}
			<h2 class="w-full">sections</h2>
			{#each sections as section}
				<p>{section}</p>
			{/each}
		{/if}
	</Modal>
{/if}
