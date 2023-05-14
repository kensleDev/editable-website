import { getPage } from '$lib/_api';

export async function load({ locals }) {
	const currentUser = locals.user;
	const page = await getPage('imprint');
	return {
		currentUser,
		page
	};
}
