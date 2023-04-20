import { getArticles } from '$lib/_api';
export async function load({ locals: { getSession } }) {
  const session = await getSession();
  const articles = await getArticles(session);

  return {
    session,
    articles
  };
}
