<script lang="ts">
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';

	function addSection() {
		console.log('add section');
	}
</script>

<div class="w-full flex flex-col space-y-4 p-4 sm:p-6">
	<PrimaryButton on:click={addSection}>Add section</PrimaryButton>
</div>
