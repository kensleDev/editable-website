import { createOrUpdateCounter } from '$lib/_api/counter';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const counterId = url.searchParams.get('c') as string
  return json(await createOrUpdateCounter(counterId));
}
