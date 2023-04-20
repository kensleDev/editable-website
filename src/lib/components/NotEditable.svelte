<script lang="ts">
	import { classNames } from '$lib/util';

	export let editable: boolean;
</script>

<div class={classNames(editable ? 'opacity-25 cursor-not-allowed relative' : '')}>
	{#if editable}
		<div class="absolute inset-0 z-50" />
	{/if}
	<slot />
</div>
