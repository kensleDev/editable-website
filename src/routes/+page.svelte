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

{#if showUserMenu}
	<Modal on:close={() => (showUserMenu = false)}>
		<form class="w-full block" method="POST">
			<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
				<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
				<LoginMenu {session} />
			</div>
		</form>
	</Modal>
{/if}

<div>
	<div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24">
		<NotEditable {editable}>
			<svg
				class="pb-8 w-14 sm:w-24 mx-auto"
				viewBox="0 0 200 200"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M164 110L64 163.768V200L164 147.059V110Z" fill="#111827" />
				<path d="M136 66L36 119.768V156L136 103.059V66Z" fill="#111827" />
				<path d="M164 0L64 53.7684V90L164 37.0588V0Z" fill="#111827" />
			</svg>
		</NotEditable>
		<h1 class="text-4xl md:text-7xl font-bold text-center">
			<PlainText {editable} bind:content={title} />
		</h1>
		<NotEditable {editable}>
			<div class="text-center pt-8 pb-4 bounce text-xl">↓</div>
			<div class="text-center">
				<PrimaryButton size="lg" type="button" on:click={toggleEdit}>Edit</PrimaryButton>
			</div>
		</NotEditable>
	</div>
</div>

<IntroSteps {editable} />

<Testimonals testimonials={$testimonialsStore} {session} {editable} />

<ArticleList {editable} view="preview" articles={data?.articles} />

<Bio {editable} {session} />

<Faq {editable} />

<Footer counter="/" {editable} />
