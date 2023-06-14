<script lang="ts">
	import WebsiteNav from '$lib/components/WebsiteNav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import EditorToolbar from '$lib/components/EditorToolbar.svelte';
	import type { PageData } from './$types';

	import Head from '$lib/features/dashboard/head/Head.svelte';
	import UserMenu from '$lib/features/dashboard/userMenu/UserMenu.svelte';
	import { editable } from '$lib/stores/editable.store';
	import { session } from '$lib/stores/session.store';

	import {
		initPage,
		savePage,
		getPageComponents,
		addComponentToPage,
		type PageComponent
	} from '$lib/services/page.service';

	let showUserMenu: boolean;
	let sections: string[];
	let components: PageComponent[];

	export let data: PageData;

	$: session.set(data?.session);

	// --------------------------------------------------------------------------
	// Page logic
	// --------------------------------------------------------------------------

	async function initOrReset() {
		sections = await initPage(data.page);
		components = await getPageComponents(data.page);
		editable.set(false);
		console.log({ components });
	}

	function toggleEdit() {
		editable.set(true);
		showUserMenu = false;
	}

	function closeUserMenu() {
		showUserMenu = false;
	}

	async function save() {
		await savePage('home', session, sections);
		editable.set(false);
		showUserMenu = false;
	}

	async function addComponent(componentName: string) {
		const page = await addComponentToPage('home', componentName);
		console.log({ page });
	}

	initOrReset();
</script>

<Head />

{#if $editable}
	<EditorToolbar session={$session} on:cancel={initOrReset} on:save={save} />
{/if}

<WebsiteNav bind:showUserMenu session={$session} bind:editable={$editable} />

<UserMenu
	session={$session}
	pageData={data.page}
	{showUserMenu}
	{toggleEdit}
	{closeUserMenu}
	on:save={save}
	on:addComponent={(e) => addComponent(e.detail)}
/>

{#if components}
	{#each components as componentModule}
		{#if componentModule.view}
			<svelte:component this={componentModule.component} view={componentModule.view} />
		{:else}
			<svelte:component this={componentModule.component} />
		{/if}
	{/each}
{/if}

<Footer counter="/" editable={$editable} />
