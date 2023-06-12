// import { type Actions, redirect } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';

export const load = async ({ locals: { getSession } }: LayoutServerLoadEvent) => {
	return {
		session: await getSession()
	};
};
