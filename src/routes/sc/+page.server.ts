import { getPage } from '$lib/_api';

export async function load({ locals }) {
	const session = await locals.getSession();
	const page = await getPage('sc');
	return {
		session,
		page
	};
}
