import { getPage } from '$lib/core/api';

export async function load({ locals }) {
  const currentUser = locals.user;
  const page = await getPage('sc');
  return {
    currentUser,
    page
  };
}
