<script lang="ts">
	import WebsiteNav from '$lib/components/WebsiteNav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import EditorToolbar from '$lib/components/EditorToolbar.svelte';
	import type { PageData } from './$types';

	import Head from '$lib/features/userMenu/Head.svelte';
	import UserMenu from '$lib/features/userMenu/UserMenu.svelte';

	import {
		initPage,
		savePage,
		getPageComponents,
		type PageComponent
	} from '$lib/services/page.service';

	export let data: PageData;

	$: session = data.session;

	let editable: boolean;
	let showUserMenu: boolean;
	let sections: string[];

	let components: PageComponent[];
	// --------------------------------------------------------------------------
	// Page logic
	// --------------------------------------------------------------------------

	async function initOrReset() {
		sections = await initPage(data.page);
		components = await getPageComponents(data.page);
		editable = false;
	}

	function toggleEdit() {
		editable = true;
		showUserMenu = false;
	}

	function closeUserMenu() {
		showUserMenu = false;
	}

	async function save() {
		await savePage('home', session, sections);
		editable = false;
		showUserMenu = false;
	}

	initOrReset();
</script>

<Head />

{#if editable}
	<EditorToolbar {session} on:cancel={initOrReset} on:save={save} />
{/if}

<WebsiteNav bind:showUserMenu {session} bind:editable />

<UserMenu
	{session}
	sections={Object.keys(data.page)}
	{showUserMenu}
	{toggleEdit}
	{closeUserMenu}
	on:save={save}
/>

{#if components}
	{#each components as componentModule}
		{#if componentModule.view}
			<svelte:component
				this={componentModule.component}
				{editable}
				{session}
				view={componentModule.view}
			/>
		{:else}
			<svelte:component this={componentModule.component} {editable} {session} />
		{/if}
	{/each}
{/if}

<Footer counter="/" {editable} />
