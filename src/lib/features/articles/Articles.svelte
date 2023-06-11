<script lang="ts">
	import ArticleTeaser from './ArticleTeaser.svelte';
	import NotEditable from '$lib/components/NotEditable.svelte';
	import type { Article } from '@prisma/client';
	import { articlesStore } from './articles.store';

	export let editable: boolean;
	export let view: 'preview' | 'list';
	export let articles: Article[] = $articlesStore;
</script>

{#if view === 'preview'}
	{#if articles.length > 0}
		<NotEditable {editable}>
			<div class="bg-white border-t-2 border-gray-100 pb-10 sm:pb-16">
				<div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24">
					<div class="font-bold text-sm sm:text-base">FROM THE BLOG</div>
				</div>
				{#each articles as article, i}
					<ArticleTeaser {article} firstEntry={i === 0} />
				{/each}
			</div>
		</NotEditable>
	{/if}
{/if}

{#if view === 'list'}
	<div class="pb-8">
		<div class="max-w-screen-md mx-auto px-6 pt-12 sm:pt-24">
			<div class="font-bold text-sm">LATEST ARTICLES</div>
			{#if articles.length === 0}
				<div class="md:text-xl py-4">No blog posts have been published so far.</div>
			{/if}
		</div>

		{#each articles as article, i}
			<ArticleTeaser {article} firstEntry={i === 0} />
		{/each}
	</div>
{/if}
