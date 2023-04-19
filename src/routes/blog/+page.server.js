import { getArticles } from '$lib/core/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const articles = await getArticles(currentUser);

  return {
    currentUser,
    articles
  };
}
