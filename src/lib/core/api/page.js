import _db from '../_db';
/** Use a singleton DB instance */
const db = _db.instance;

/**
 * Update the page
 */
export async function createOrUpdatePage(pageId, page, currentUser) {
  if (!currentUser) throw new Error('Not authorized');
  return await db.tx('create-or-update-page', async t => {
    const pageExists = await t.oneOrNone('SELECT page_id FROM pages WHERE page_id = $1', [pageId]);
    if (pageExists) {
      return await t.one('UPDATE pages SET data = $1 WHERE page_id = $2 RETURNING page_id', [
        page,
        pageId
      ]);
    } else {
      return await t.one('INSERT INTO pages (page_id, data) values($1, $2) RETURNING page_id', [
        pageId,
        page
      ]);
    }
  });
}

/**
 * E.g. getPage("home") gets all dynamic data for the home page
 */
export async function getPage(pageId) {
  return await db.tx('get-page', async t => {
    const page = await t.oneOrNone('SELECT data FROM pages WHERE page_id = $1', [pageId]);
    return page?.data;
  });
}
