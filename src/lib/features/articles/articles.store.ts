import type { Article } from '$lib/server/db/schema';
import { writable } from 'svelte/store';

const ARTICLES_PLACEHOLDER = [
	{
		article_id: '1a2b3c',
		slug: 'introduction-to-typescript',
		title: 'Introduction to TypeScript',
		teaser:
			"A beginner's guide to TypeScript, a statically typed superset of JavaScript that adds optional types.",
		content:
			"TypeScript is a statically typed superset of JavaScript, which means it adds optional types to JavaScript. This leads to more robust code and enables powerful tooling, such as better autocompletion and refactoring support. TypeScript code can be compiled to plain JavaScript, so it can be run in any environment that supports JavaScript.\n\nIn this article, we'll start with the basics of TypeScript, explain why it can be a valuable addition to your JavaScript projects, and walk you through some of its key features, such as static typing and interfaces. Whether you're new to TypeScript or just need a refresher, this guide is designed to help you understand and get the most out of TypeScript.",
		created_at: new Date('2023-01-01T00:00:00Z'),
		published_at: new Date('2023-01-02T00:00:00Z'),
		updated_at: new Date('2023-01-03T00:00:00Z')
	}
];

export const newArticleStore = () => {
	const articles = writable<Article[]>(ARTICLES_PLACEHOLDER);

	return {
		subscribe: articles.subscribe,
		set: articles.set
	};
};

export const articlesStore = newArticleStore();
