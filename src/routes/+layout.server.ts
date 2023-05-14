import type { ServerLoad } from '@sveltejs/kit';

export const load = async ({ locals: { getSession } }: any) => {
	return {
		session: await getSession()
	};
};
