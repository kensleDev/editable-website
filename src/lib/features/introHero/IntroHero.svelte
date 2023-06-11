<script lang="ts">
	import NotEditable from '$lib/components/NotEditable.svelte';
	import PlainText from '$lib/components/PlainText.svelte';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';
	import { titleStore } from '../title/title.store';

	export let editable: boolean;
	export let toggleEdit: () => void;
</script>

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
			<PlainText {editable} bind:content={$titleStore} />
		</h1>
		<NotEditable {editable}>
			<div class="text-center pt-8 pb-4 bounce text-xl">↓</div>
			<div class="text-center">
				<PrimaryButton size="lg" type="button" on:click={toggleEdit}>Edit</PrimaryButton>
			</div>
		</NotEditable>
	</div>
</div>
