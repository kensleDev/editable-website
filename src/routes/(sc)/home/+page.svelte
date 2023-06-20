<script lang="ts">
	import BulletList from '$lib/features/bulletList/BulletList.svelte';
	import Button from '$lib/features/button/Button.svelte';
	import Header from '$lib/features/header/Header.svelte';
	import { unpackPageData } from '$lib/services/page.service';
	import { editable } from '$lib/stores/editable.store';

	const pageData = [
		{
			component: 'card',

			// styles: {
			// 	background: 'bg-primary-500',
			// 	text: 'text-white',
			// 	align: 'left'
			// },

			header: {
				id: 'weCanHelpyouBeFreeFromDebt',
				content: 'We can help you be free from debt',
				tag: 'h1'
			},

			bulletList: {
				id: 'weCanHelpyouBeFreeFromDebt',
				items: [
					{ text: 'We treat you as an individual', icon: 'check', description: '' },
					{ text: 'We give you full support', icon: 'check' },
					{ text: 'Our advice is free', icon: 'check' }
				]
			}
		},

		{
			component: 'card',

			// styles: {
			// 	background: 'bg-secondary-500',
			// 	text: 'text-white',
			// 	align: 'left'
			// },

			header: {
				id: 'startGettingFinancesBackOnTrack',
				content: 'Start getting your finances back on track',
				tag: 'h2'
			},

			button: {
				id: 'getDebtHelp',
				text: 'Get debt help',
				variant: 'variant-filled-secondary',
				link: 'https://stepchange.org'
			},

			bulletList: {
				id: 'startGettingFinancesBackOnTrack',
				items: [
					{
						icon: 'padlock',
						text: 'Our debt advice is 100% impartial and confidential',
						description: '',
						link: 'https://stepchange.org'
					}
				]
			},

			image: { href: 'womenChatting', alt: '' }
		}
	];

	unpackPageData(pageData);
</script>

<div
	class="container grid grid-cols-1 md:grid-cols-2 md:gap-6 justify-center w-full max-w-[900px] mx-auto px-4"
>
	<section class="card p-2 bg-primary-500">
		<Header editable={$editable} id={pageData[0].header.id} />

		<BulletList editable={$editable} id={pageData[0].bulletList.id} />
	</section>

	<section class="card px-8 py-2 bg-[#FFF0DF]">
		<Header editable={$editable} id={pageData[1].header.id} />

		<Button editable={$editable} id={pageData[1].button?.id} />

		<BulletList editable={$editable} id={pageData[1].bulletList.id} />
	</section>
</div>
