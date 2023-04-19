import { json } from '@sveltejs/kit';
import { updateArticle } from '$lib/_api';

export async function POST({ request, locals: { getSession } }) {
  const session = await getSession()
  const { slug, title, content, teaser } = await request.json();
  await updateArticle(slug, title, content, teaser, session);
  return json({ slug, status: 'ok' });
}
