<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../app.css';

	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }): void {
		console.log(event.currentTarget.scrollTop);
	}
</script>

<slot />
