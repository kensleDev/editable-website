import { authActions } from '$lib/plugins/auth/actions';
import type { Actions } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';

export const load = async ({ locals: { getSession } }: LayoutServerLoadEvent) => {
	return {
		session: await getSession()
	};
};

// export const actions: Actions = {
// 	...authActions
// };
