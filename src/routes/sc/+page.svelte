<script lang="ts">
	import WebsiteNav from '$lib/components/WebsiteNav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PlainText from '$lib/components/PlainText.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import LoginMenu from '$lib/components/LoginMenu.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { fetchJSON } from '$lib/util';
	import EditorToolbar from '$lib/components/EditorToolbar.svelte';

	import { testimonials } from '$lib/ui/testimonial/testimonial';
	import Testimonial from '$lib/ui/testimonial/Testimonial.svelte';

	export let data;
	$: session = data.session;

	let editable = false,
		showUserMenu = false,
		title = '',
		sc;

	// --------------------------------------------------------------------------
	// DEFAULT PAGE CONTENT - AJDUST TO YOUR NEEDS
	// --------------------------------------------------------------------------
	const TESTIMONIALS_PLACEHOLDER = [
		{
			text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mi lectus, pellentesque nec urna eget, pretium dictum arcu. In rutrum pretium leo, id efficitur nisl ullamcorper sit amet.”',
			image: '/images/person-placeholder.jpg',
			name: 'Jane Doe · jane-doe.org'
		}
	];

	function initOrReset() {
		title = data.page?.title || 'Stepchange';
		sc =
			data.page?.sc ||
			[
				['Ken Experiences GmbH', 'Mozartstraße 56', '4020 Linz, Austria'].join('<br/>'),
				[
					'Managing Director: DI Michael Aufreiter',
					'Register No: FN 408728x',
					'Court: Linz',
					'VAT ID: ATU68395257'
				].join('<br/>')
			]
				.map((text) => `<p>${text}</p>`)
				.join('\n');

		editable = false;

		testimonials.addPlaceholder(data.page?.testimonials || TESTIMONIALS_PLACEHOLDER);
		// console.log($testimonials);
	}

	initOrReset();

	function toggleEdit() {
		editable = true;
		showUserMenu = false;
	}

	async function savePage() {
		if (!session) return alert('Sorry, you are not authorized.');
		try {
			fetchJSON('POST', '/api/save-page', {
				pageId: 'sc',
				page: {
					title,
					sc
				}
			});
			editable = false;

			testimonials = $testimonials;
		} catch (err) {
			console.error(err);
			alert('There was an error. Please try again.');
		}
	}
</script>

<svelte:head>
	<title>Stepchange</title>
</svelte:head>

{#if showUserMenu}
	<Modal on:close={() => (showUserMenu = false)}>
		<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
			<PrimaryButton on:click={toggleEdit}>Edit page</PrimaryButton>
			<LoginMenu {session} />
		</div>
	</Modal>
{/if}

{#if editable}
	<EditorToolbar {session} on:cancel={initOrReset} on:save={savePage} />
{/if}

<WebsiteNav bind:showUserMenu {session} bind:editable />

<div class="py-12 sm:py-24">
	<div class="max-w-screen-md mx-auto px-6 md:text-xl">
		<h1 class="text-4xl md:text-7xl font-bold pb-8">
			<PlainText {editable} bind:content={title} />
		</h1>
		<div class="prose md:prose-xl pb-12 sm:pb-24">
			<RichText multiLine {editable} bind:content={sc} />
		</div>
	</div>
</div>

{#each $testimonials as testimonial, i}
	<Testimonial
		{editable}
		{session}
		bind:testimonial
		firstEntry={i === 0}
		lastEntry={i === testimonials.length - 1}
		on:delete={() => testimonials.remove(i)}
		on:up={() => testimonials.move(i, 'up')}
		on:down={() => testimonials.move(i, 'down')}
		on:add={() => testimonials.add()}
	/>
{/each}

<Footer counter="/sc" />
