<script lang="ts">
	import PlainText from '$lib/components/PlainText.svelte';
	import { fetchJSON } from '$lib/util';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import WebsiteNav from '$lib/components/WebsiteNav.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NotEditable from '$lib/components/NotEditable.svelte';
	import EditorToolbar from '$lib/components/EditorToolbar.svelte';
	import type { PageData } from './$types';

	import Testimonals from '$lib/features/testimonials/Testimonals.svelte';
	import { testimonialsStore } from '$lib/features/testimonials/testimonials.store';

	import { bioStore } from '$lib/features/bio/bio.store';
	import Bio from '$lib/features/bio/Bio.svelte';

	import { faqStore } from '$lib/features/faq/faq.store';
	import Faq from '$lib/features/faq/Faq.svelte';

	import { introStepsStore } from '$lib/features/introSteps/introSteps.store';
	import IntroSteps from '$lib/features/introSteps/IntroSteps.svelte';

	const { stepOne, stepTwo, stepThree, stepFour } = introStepsStore;
	import ArticleList from '$lib/features/articles/ArticleList.svelte';
	import IntroHero from '$lib/features/introHero/IntroHero.svelte';
	import UserMenu from '$lib/features/userMenu/UserMenu.svelte';

	export let data: PageData;

	$: session = data.session;
	// $: currentUser = data.currentUser;
	// $: console.log({ session });

	// --------------------------------------------------------------------------
	// DEFAULT PAGE CONTENT - AJDUST TO YOUR NEEDS
	// --------------------------------------------------------------------------

	let editable: boolean;
	let title: string;
	let showUserMenu: boolean;

	function initOrReset() {
		title = data.page?.title || 'Untitled Website';

		if (data.page?.faqs) faqStore.set(data.page?.faqs);

		// Make a deep copy
		if (data.page?.testimonials)
			testimonialsStore.set(JSON.parse(JSON.stringify(data.page?.testimonials)));

		if (data.page?.introStep1) stepOne.set(data.page?.introStep1);
		if (data.page?.introStep2) stepTwo.set(data.page?.introStep2);
		if (data.page?.introStep3) stepThree.set(data.page?.introStep3);
		if (data.page?.introStep4) stepFour.set(data.page?.introStep4);

		bioStore.setBio(data.page?.bio, data.page?.bioTitle, data.page?.bioTitle);

		editable = false;
	}

	// --------------------------------------------------------------------------
	// Page logic
	// --------------------------------------------------------------------------

	function toggleEdit() {
		editable = true;
		showUserMenu = false;
	}

	function closeUserMenu() {
		showUserMenu = false;
	}

	async function savePage() {
		try {
			// Only persist the start page when logged in as an admin
			if (session) {
				await fetchJSON('POST', '/api/save-page', {
					pageId: 'home',
					page: {
						title,
						faqs: $faqStore,
						testimonials: $testimonialsStore,
						introStep1: $stepOne,
						introStep2: $stepTwo,
						introStep3: $stepThree,
						introStep4: $stepFour,
						bioPicture: $bioStore.image,
						bioTitle: $bioStore.title,
						bio: $bioStore.content
					}
				});
			}
			editable = false;
		} catch (err) {
			console.error(err);
			alert('There was an error. Please try again.');
		}
	}

	initOrReset();
</script>

<svelte:head>
	<title>Make your website editable</title>
	<meta name="description" content="Make changes to your website while browsing it." />
	<link rel="alternate" hreflang="en" href="https://editable.website" />
	<link rel="canonical" href="https://editable.website" />
</svelte:head>

{#if editable}
	<EditorToolbar {session} on:cancel={initOrReset} on:save={savePage} />
{/if}

<WebsiteNav bind:showUserMenu {session} bind:editable />

<UserMenu {session} {showUserMenu} {toggleEdit} {closeUserMenu} />

<IntroHero {editable} {toggleEdit} {title} />

<IntroSteps {editable} />

<Testimonals testimonials={$testimonialsStore} {session} {editable} />

<ArticleList {editable} view="preview" articles={data?.articles} />

<Bio {editable} {session} />

<Faq {editable} />

<Footer counter="/" {editable} />
