import { db } from './client';

type PageData<T> = {
	page_id: string;
	data?: T;
};

export async function createOrUpdatePage({
	pageId,
	page,
	currentUser
}: any): Promise<PageData<any>> {
	if (!currentUser) throw new Error('Not authorized');

	const pageExists = await db.page.findFirst({
		where: {
			page_id: pageId
		},
		select: {
			page_id: true
		}
	});

	if (pageExists) {
		return await db.page.update({
			where: {
				page_id: pageId
			},
			data: {
				data: page
			},
			select: {
				page_id: true
			}
		});
	} else {
		return await db.page.create({
			data: {
				page_id: pageId,
				data: page
			},
			select: {
				page_id: true
			}
		});
	}
}

export async function getPage(pageId: string): Promise<any> {
	const page = await db.page.findFirst({
		where: {
			page_id: pageId
		},
		select: {
			data: true
		}
	});
	return page?.data ?? null;
}
