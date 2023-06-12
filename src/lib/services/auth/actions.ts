import { AuthApiError, type Provider } from '@supabase/supabase-js';
import { redirect, type Actions } from '@sveltejs/kit';
import { fail } from 'assert';

const OAUTH_PROVIDERS = ['google', 'discord', 'github'];

export const authActions: Actions = {
	login: async ({ request, locals, url }: any) => {
		const provider = url.searchParams.get('provider') as Provider;

		if (provider) {
			if (!OAUTH_PROVIDERS.includes(provider)) {
				return fail(400, {
					error: 'Provider not supported.'
				});
			}
			const oauthRes = await locals.supabase.auth.signInWithOAuth({
				provider
			});

			if (oauthRes.error) {
				console.log(oauthRes.error);
				return fail(400, {
					message: 'Something went wrong.'
				});
			}

			console.log({ data: oauthRes.data });

			throw redirect(303, oauthRes.data.url);
		}

		const body = Object.fromEntries(await request.formData());

		if (body) {
			const { error: err } = await locals.supabase.auth.signInWithPassword({
				email: body.email as string,
				password: body.password as string
			});

			if (err) {
				if (err instanceof AuthApiError && err.status === 400) {
					return fail(400, {
						error: 'Invalid credentials'
					});
				}
				return fail(500, {
					message: 'Server error. Try again later.'
				});
			}

			throw redirect(303, '/');
		}
	},

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
