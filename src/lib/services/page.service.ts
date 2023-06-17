import { get } from 'svelte/store';
import { fetchJSON } from '$lib/util';
import { bulletListStore } from '$lib/features/bulletList/bulletList.store';
import { headerStore } from '$lib/features/header/header.store';
import { buttonStore } from '$lib/features/button/button.store';

export type PageComponent = {
	name: string;
	component: any;
	order: number;
	view?: string;
};

export async function initPage(pageData: any) {
	const sections = Object.keys(pageData);
	// get the required stores from sections
	sections.forEach(async (section) => {
		// import store
		const storeModule = await import(`../features/${section}/${section}.store.ts`); // this will work
		const store = storeModule[`${section}Store`];
		store.set(pageData[section].content);
	});

	return sections;
}

export async function savePage(pageTitle: string, session: any, sections: string[]) {
	console.log({ sections });
	try {
		// Only persist the start page when logged in as an admin
		if (session) {
			const pageReq: any = {};

			// assemble page data
			sections.forEach(async (section) => {
				// import store
				const storeModule = await import(`../features/${section}/${section}.store.ts`); // this will work
				const store = storeModule[`${section}Store`];

				pageReq[section] = get(store);
			});

			console.log({ pageReq });

			await fetchJSON('POST', '/api/save-page', {
				pageId: pageTitle,
				page: pageReq
			});
		}
	} catch (err) {
		console.error(err);
		alert('There was an error. Please try again.');
	}
}

export async function getPageComponents(pageData: any) {
	const sections = Object.keys(pageData);
	const firstToUpper = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

	const components = await Promise.all(
		sections.map(async (section) => {
			const componentModule = await import(
				`../features/${section}/${firstToUpper(section)}.svelte`
			); // this will work
			const component = componentModule.default;

			if (pageData[section].view)
				return {
					name: section,
					component,
					order: pageData[section].order,
					view: pageData[section].view
				};

			return { name: section, component, order: pageData[section].order };
		})
	);

	const sortedComponents: PageComponent[] = components.sort((a, b) => a.order - b.order);

	return sortedComponents;
}

export async function addComponentToPage(pageId: string, componentName: string) {
	console.log({ pageId, componentName });
	const componentRes = await fetchJSON('POST', '/api/add-component-to-page', {
		pageId,
		componentName
	});

	return componentRes;
}

export function unpackPageData(pageData: any) {
	pageData.forEach((page: any) => {
		const components = Object.keys(page);

		components.forEach((componentName) => {
			const currentComponent = page[componentName];

			if (componentName === 'header') {
				headerStore.add(currentComponent);
			}

			if (componentName === 'bulletList') {
				bulletListStore.add(currentComponent);
			}

			if (componentName === 'button') {
				buttonStore.add(currentComponent);
			}
		});
	});
}
