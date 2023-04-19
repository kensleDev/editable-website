import { json } from '@sveltejs/kit';
import { updateArticle } from '$lib/core/api';

export async function POST({ request, locals }) {
  const currentUser = locals.user;
  const { slug, title, content, teaser } = await request.json();
  await updateArticle(slug, title, content, teaser, currentUser);
  return json({ slug, status: 'ok' });
}
