<script lang="ts">
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import type { Session } from '@supabase/supabase-js';
	import { headStore } from '../head/head.store';
	import { createEventDispatcher } from 'svelte';
	import Sections from '../sections/Sections.svelte';

	const emit = createEventDispatcher();

	export let session: Session | null;
	export let pageData: any;
	export let showUserMenu: boolean;
	export let toggleEdit: () => void;
	export let closeUserMenu: () => void;
	export let view = 'menu';

	type UserMenuViews = 'menu' | 'head' | 'edit sections' | 'add sections';

	function save() {
		view = 'menu';
		emit('save');
	}

	function changeView(newView: UserMenuViews) {
		console.log({ newView });
		view = newView;
		if (newView === 'edit sections') emit('getSections');
	}
</script>

{#if showUserMenu}
	<Modal on:close={() => closeUserMenu}>
		<div class="container p-4">
			{#if view === 'menu'}
				<form class="w-full block" method="POST">
					<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
						<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
						<LoginMenu {session} />
						<PrimaryButton on:click={() => changeView('head')}>Edit head</PrimaryButton>
						<PrimaryButton on:click={() => changeView('edit sections')}>Edit sections</PrimaryButton
						>
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

			{#if view === 'edit sections'}
				<Sections {pageData} on:changeView={(e) => changeView(e.detail)} />
			{/if}

			{#if view === 'add sections'}
				<Sections
					{pageData}
					on:changeView={(e) => changeView(e.detail)}
					on:addComponent={(e) => emit('addComponent', e.detail)}
					view="add"
				/>
			{/if}
		</div>
	</Modal>
{/if}
