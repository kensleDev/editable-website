<script lang="ts">
	import Image from '$lib/components/Image.svelte';
	import NotEditable from '$lib/components/NotEditable.svelte';
	import PlainText from '$lib/components/PlainText.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import SecondaryButton from '$lib/components/SecondaryButton.svelte';
	import { bioStore } from './bio.store';

	export let editable: boolean;
	export let session: any;

	const EMAIL = 'michael@letsken.com';

	// Can contain spaces but must not contain the + sign
	const PHONE_NUMBER = '43 664 1533015';

	// export let data = {
	// 	bio: {
	// 		picture: '/images/michael.jpg',
	// 		title: 'Michael Aufreiter',
	// 		bio
	// 	}
	// };
</script>

<!-- Bio -->
<div id="contact" class="bg-white border-t-2 border-b-2 border-gray-100 pb-12 sm:pb-24">
	<div class="max-w-screen-md mx-auto px-6">
		<div class="pt-12 sm:pt-24 pb-12 text-center">
			<Image
				className="inline-block w-48 h-48 md:w-72 md:h-72 rounded-full"
				maxWidth="384"
				maxHeight="384"
				quality="0.8"
				{editable}
				{session}
				bind:src={$bioStore.image}
				alt="Michael Aufreiter"
			/>
		</div>
		<div class="">
			<h1 class="text-3xl md:text-5xl font-bold">
				<PlainText {editable} bind:content={$bioStore.title} />
			</h1>
		</div>
		<div class="prose md:prose-xl pb-6">
			<RichText multiLine {editable} bind:content={$bioStore.content} />
		</div>

		<NotEditable {editable}>
			<div class="flex flex-col sm:flex-row sm:space-x-6 md:space-x-8 space-y-4 sm:space-y-0">
				<PrimaryButton size="lg" href={`mailto:${EMAIL}`}>Email</PrimaryButton>
				<SecondaryButton size="lg" href={`https://wa.me/${PHONE_NUMBER.replace(/\s+/g, '')}`}>
					WhatsApp (+{PHONE_NUMBER})
				</SecondaryButton>
			</div>
		</NotEditable>
	</div>
</div>
