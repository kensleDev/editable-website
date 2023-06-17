import type { Session } from '@supabase/supabase-js';
import { db } from './client';
import type { Image } from '@prisma/client';

export async function createImage(
	src: string,
	layout: string,
	width: number,
	height: number,
	alt?: any,
	session?: Session
): Promise<Image> {
	if (!session) throw new Error('Not authorized');

	return await db.image.create({
		data: {
			src,
			layout,
			width,
			height,
			alt
		}
	});
}
