import { json, type RequestHandler } from '@sveltejs/kit';
import { createOrUpdatePage } from '$lib/_api';

export const POST: RequestHandler = async ({ request, locals }) => {
	console.log({ locals });
	console.log(await locals.getSession());
	const session = await locals.getSession();
	const currentUser = session?.user;
	const { pageId, page } = await request.json();
	await createOrUpdatePage({ pageId, page, currentUser });
	return json({ pageId, status: 'ok' });
};
