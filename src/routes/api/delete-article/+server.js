import { json } from '@sveltejs/kit';
import { deleteArticle } from '$lib/_api';

export async function POST({ request, locals: { getSession } }) {
	const session = await getSession();
	const { slug } = await request.json();
	const result = await deleteArticle(slug, session);
	return json(result);
}
