<script lang="ts">
	// Your selected Skeleton theme:
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../../sc-theme.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../../sc.css';

	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }): void {
		console.log(event.currentTarget.scrollTop);
	}
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10" on:scroll={scrollHandler}>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
			<svelte:fragment slot="headline">(headline)</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>
