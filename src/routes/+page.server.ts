import { getArticles, getPage } from '$lib/_api';

export async function load({ locals: { getSession } }: any) {
	const session = await getSession();

	const articles = await getArticles(session);
	const page = await getPage('home');

	return {
		articles: articles.slice(0, 3),
		page: page.data,
		sections: page.sections
	};
}
