import { fail, type Actions } from '@sveltejs/kit';
import { writeFileSync, unlinkSync } from 'fs';

import { createImage } from '$lib/_api/image';

import { promisify } from 'util';
import SizeOf from 'image-size';
import type { ISizeCalculationResult } from 'image-size/dist/types/interface';

const sizeOf = promisify(SizeOf);

export const actions: Actions = {
	fileUpload: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		if (
			!(formData.fileToUpload as File).name ||
			(formData.fileToUpload as File).name === 'undefined'
		) {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		const { fileToUpload } = formData as { fileToUpload: File };

		const fileToUploadName = `static/media/${fileToUpload.name}`;

		try {
			writeFileSync(
				`static/media/${fileToUpload.name}`,
				Buffer.from(await fileToUpload.arrayBuffer())
			);
		} catch (e) {
			return fail(400, {
				error: true,
				message: 'Unable to write file to disk'
			});
		}

		let dimensions: ISizeCalculationResult | undefined;

		try {
			dimensions = await sizeOf(fileToUploadName);
		} catch (error) {
			return fail(400, {
				error: true,
				message: 'Unable to get image dimensions'
			});
		}

		try {
			const res = await createImage(
				`static/media/${fileToUpload.name}`,
				'constrained',
				dimensions?.width as number,
				dimensions?.height as number
			);

			console.log({ res });
		} catch (error) {
			console.log({ error });
			unlinkSync(fileToUploadName);
			return fail(400, { error: JSON.stringify(error) });
		}

		return {
			success: true
		};
	}
};
