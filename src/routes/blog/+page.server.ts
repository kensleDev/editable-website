import { getArticles } from '$lib/_api';
import type { PageServerLoadEvent } from '../$types';
import type { Session } from '@supabase/auth-helpers-svelte'
export async function load({ locals: { getSession } }: PageServerLoadEvent) {

  const session = await getSession();
  const articles = await getArticles(session as Session);

  return {
    session,
    articles
  };
}
