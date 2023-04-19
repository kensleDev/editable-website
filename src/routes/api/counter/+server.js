import { createOrUpdateCounter } from '$lib/core/api';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const counterId = url.searchParams.get('c');
  return json(await createOrUpdateCounter(counterId, true));
}
