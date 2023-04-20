import { getArticles, getPage } from '$lib/_api';
import type { PageServerLoad } from './$types';

export async function load({ locals: { getSession } }: PageServerLoad) {
	const session = await getSession();

	const articles = await getArticles(session);
	const page = await getPage('home');

	return {
		articles: articles.slice(0, 3),
		page
		// session
	};
}
