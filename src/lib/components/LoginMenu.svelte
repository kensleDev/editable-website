<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Session } from '@supabase/supabase-js';
	import PrimaryButton from './PrimaryButton.svelte';
	export let session: Session | null;
</script>

<div>
	<div class="py-4 text-center">Signed in as {session?.user?.email}</div>
	<div class="flex flex-col">
		<PrimaryButton on:click={() => goto('/logout')}>Sign out</PrimaryButton>
	</div>
</div>
