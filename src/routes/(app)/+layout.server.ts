import { getDynamicPage } from '$lib/_api/dynamicPages';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';

export const load = async ({ params, locals: { getSession } }: LayoutServerLoadEvent) => {
	let pageData = {};

	const path = Object.entries(params)
		.map(([key, value]) => {
			return '/' + value;
		})
		.join('');

	console.log({ params, path });

	if (params.feature) {
		const dPage = await getDynamicPage(path);
		console.log({ dPage });

		if (dPage === null) {
			throw redirect(303, '/');
		}

		pageData = dPage;
	}

	console.log({ pageData });

	return {
		session: await getSession(),
		myPageData: pageData
	};
};
