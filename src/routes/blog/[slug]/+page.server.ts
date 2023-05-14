import { getArticleBySlug, getNextArticle } from '$lib/_api';

export async function load({ params, locals: { getSession } }) {
	const session = await getSession();
	const data = await getArticleBySlug(params.slug);
	const articles = [await getNextArticle(params.slug)];

	return {
		...data,
		session,
		articles
	};
}
