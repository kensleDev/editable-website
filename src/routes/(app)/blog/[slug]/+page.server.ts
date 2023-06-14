import { getArticleBySlug, getNextArticle } from '$lib/_api';
import type { PageServerLoadEvent } from '../$types';

export async function load({ params, locals: { getSession } }: PageServerLoadEvent) {
  const session = await getSession()
  const data = await getArticleBySlug(params.slug);
  const articles = [await getNextArticle(params.slug)];

  return {
    ...data,
    session,
    articles
  };
}
