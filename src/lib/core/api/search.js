import _db from '../_db';
/** Use a singleton DB instance */
const db = _db.instance;
import { SHORTCUTS } from '../constants';

/**
 * Search within all searchable items (including articles and website sections)
 */
export async function search(q, currentUser) {
  return await db.tx('search', async t => {
    let result;
    if (currentUser) {
      result = await t.any(
        "SELECT title AS name, CONCAT('/blog/', slug) AS url, COALESCE(published_at, updated_at, created_at) AS modified_at FROM articles WHERE title ILIKE $1 ORDER BY modified_at DESC",
        [`%${q}%`]
      );
    } else {
      result = await t.any(
        "SELECT title AS name, CONCAT('/blog/', slug) AS url, COALESCE(published_at, updated_at, created_at) AS modified_at FROM articles WHERE title ILIKE $1 AND published_at IS NOT NULL ORDER BY modified_at DESC",
        [`%${q}%`]
      );
    }

    // Also include prefined shortcuts in search
    SHORTCUTS.forEach(shortcut => {
      if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
        result.push(shortcut);
      }
    });

    return result;
  });
}
