import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAvalibleComponents } from '$lib/_api/components';

export const GET: RequestHandler = async ({ request, locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const result = await getAvalibleComponents();
	console.log({ result });
	return json(result);
};
