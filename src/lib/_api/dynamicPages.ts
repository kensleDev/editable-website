import { db } from './client';

export const getDynamicPage = async (path: string) => {
	console.log({ path });
	return await db.dpage.findFirst({
		where: {
			path: {
				equals: path
			}
		}
	});
};
