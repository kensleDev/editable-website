import { json } from '@sveltejs/kit';
import { addComponentToPage, createArticle } from '$lib/_api';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { getSession } }) => {
	const session = await getSession();
	if (!session) return json({ error: 'Not authorized' }, { status: 401 });

	const { pageId, componentName } = await request.json();
	const page = await addComponentToPage(pageId, componentName, session.user);
	return json({ page });
};
