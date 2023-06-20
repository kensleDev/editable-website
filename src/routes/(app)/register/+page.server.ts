import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { fail } from 'assert';

export const load = async ({ request, locals }: any) => {
	const session = await locals.getSession();
	if (session.user) throw redirect(303, '/');
};

export const actions = {
	register: async ({ request, locals }: any) => {
		const body = Object.fromEntries(await request.formData());

		const { error: err } = await locals.supabase.auth.signUp({
			email: body.email as string,
			password: body.password as string
		});

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: 'Invalid email or password'
				});
			}
			return fail(500, {
				error: 'Server error. Please try again later.'
			});
		}

		throw redirect(303, '/');
	}
};