<script lang="ts">
	import '@fontsource/jost/400.css';
	import '@fontsource/jost/500.css';
	import '@fontsource/jost/600.css';
	import '@fontsource/jost/700.css';

	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	console.log({ data });

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<p>layout</p>
<slot />
