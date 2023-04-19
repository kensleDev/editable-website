import slugify from 'slugify';
import _db from '../_db';

/** Use a singleton DB instance */
const db = _db.instance;

/**
 * Creates a new draft
 */
export async function createArticle(title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');

  const slug = slugify(title, {
    lower: true,
    strict: true
  });

  return await db.tx('create-article', async t => {
    let newArticle = await t.one(
      'INSERT INTO articles (slug, title, content, teaser, published_at) values($1, $2, $3, $4, NOW()) RETURNING slug, created_at',
      [slug, title, content, teaser]
    );
    return newArticle;
  });
}

/**
 * We automatically extract a teaser text from the document's content.
 */
export async function updateArticle(slug, title, content, teaser, currentUser) {
  if (!currentUser) throw new Error('Not authorized');
  return await db.tx('update-article', async t => {
    return await t.one(
      'UPDATE articles SET title= $1, content = $2, teaser = $3, updated_at = NOW() WHERE slug = $4 RETURNING slug, updated_at',
      [title, content, teaser, slug]
    );
  });
}

/**
 * List all available articles (newest first)
 */
export async function getArticles(currentUser) {
  return await db.tx('get-articles', async t => {
    let articles;
    if (currentUser) {
      // When logged in show both, drafts and published articles
      articles = await t.any(
        'SELECT *, COALESCE(published_at, updated_at, created_at) AS modified_at FROM articles ORDER BY modified_at DESC'
      );
    } else {
      articles = await t.any(
        'SELECT * FROM articles WHERE published_at IS NOT NULL ORDER BY published_at DESC'
      );
    }
    return articles;
  });
}

/**
 * Given a slug, determine article to "read next"
 */
export async function getNextArticle(slug) {
  return db.tx('get-next-article', async t => {
    return t.oneOrNone(
      `
      (
        SELECT
          title,
          teaser,
          slug,
          published_at
        FROM articles
        WHERE
          published_at < (SELECT published_at FROM articles WHERE slug= $1)
        ORDER BY published_at DESC
        LIMIT 1
      )
      UNION
      (
        SELECT title, teaser, slug, published_at FROM articles ORDER BY published_at DESC LIMIT 1
      )
      ORDER BY published_at ASC
      LIMIT 1;
    `,
      [slug]
    );
  });
}

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug) {
  return await db.tx('get-article-by-slug', async t => {
    const article = await t.one('SELECT * FROM articles WHERE slug = $1', [slug]);
    return article;
  });
}

/**
 * Remove the entire article
 */
export async function deleteArticle(slug, currentUser) {
  if (!currentUser) throw new Error('Not authorized');
  return await db.tx('delete-article', async t => {
    await t.any('DELETE FROM articles WHERE slug = $1', [slug]);
    return true;
  });
}
