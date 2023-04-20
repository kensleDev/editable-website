<script lang="ts">
	import type { Session } from '@supabase/supabase-js';

	export let session: Session | null;
</script>

{#await import('$lib/components/EditorControls.svelte') then EditorToolbar}
	<EditorToolbar.default {session} on:cancel on:save />
{/await}
