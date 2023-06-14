import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { getDynamicPage } from '$lib/_api/dynamicPages';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const pageHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	// const path = event.url.pathname;
	//
	// // if (path === '/' || path.startsWith('/blog') || path.startsWith('/api')) {
	// // 	return response;
	// // } else {
	// // const page = await getDynamicPage(path);
	// // const body = await response.text();
	// // if (page === null) {
	// // 	throw redirect(303, '/');
	// // }
	// // const body = await response.text();
	// //
	// // const newResponse = new Response(body, { headers: response.headers });
	// // // newResponse.body = newResponse.body()
	// // // newResponse.status = 201;
	// // // console.log({ newResponse });
	// // return newResponse;
	// // }
	//
	// // const response = await resolve(event);
	// // const body = await response.text();
	// //
	// // if (response.status === 404) {
	// // 	const page = await getDynamicPath(path);
	// 	console.log({ page });
	// 	const newResponse = '<h1>Testing</h1>';
	// 	response.headers.set('content-length', newResponse.length.toString());
	// 	return new Response(newResponse, { headers: response.headers });
	// }
	//
	// return new Response(body, { headers: response.headers });
	return response;
};

export const authHandle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	// protect requests to all routes that start with /protected-routes
	if (event.url.pathname.startsWith('/editor')) {
		const session = await event.locals.getSession();
		if (!session) {
			// the user is not signed in
			throw redirect(303, '/');
		}
	}

	return resolve(event, {
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

export const handle = sequence(authHandle, pageHandle);
