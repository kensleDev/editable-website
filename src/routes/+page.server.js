import { getArticles, getPage } from '$lib/_api';

export async function load() {
  const articles = await getArticles();
  const page = await getPage('home');
	// const session = await getSession()

  return {
    articles: articles.slice(0, 3),
    page
    // session
  };
}
