import { getPage } from '$lib/_api';

export async function load() {
  return {
    page: getPage('imprint')
  };
}
