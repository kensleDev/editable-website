import { db } from './client';

export async function createOrUpdateCounter(counterId: string) {
	const counterExists = await db.counter.findFirst({
		where: {
			counter_id: counterId
		},
		select: {
			counter_id: true
		}
	});

	if (counterExists) {
		return await db.counter.update({
			where: {
				counter_id: counterId
			},
			data: {
				count: {
					increment: 1
				}
			},
			select: {
				count: true
			}
		});
	} else {
		return await db.counter.create({
			data: {
				counter_id: counterId,
				count: 1
			},
			select: {
				count: true
			}
		});
	}
}
