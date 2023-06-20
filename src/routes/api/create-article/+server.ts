import { json } from '@sveltejs/kit';
import { createArticle } from '$lib/_api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { getSession } }) => {
  const session = await getSession()
  const { title, content, teaser } = await request.json();
  const { slug } = await createArticle(title, content, teaser, session);
  return json({ slug });
}
