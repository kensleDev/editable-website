
import { SHORTCUTS } from '../constants';
import {db} from './client'


/**
 * Search within all searchable items (including articles and website sections)
 */

export async function search(q, currentUser) {

  const articles = await db.article.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: q,
            mode: 'insensitive'
          }
        }
      ]
    },
    select: {
      title: true,
      slug: true,
      published_at: true,
      updated_at: true,
      created_at: true
    }
  });

  const pages = await db.page.findMany({
    where: {
      title: {
        contains: q,
        mode: 'insensitive'
      }
    },
    select: {
      title: true,
      slug: true
    }
  });

  const results = articles.map(article => ({
    name: article.title,
    url: `/blog/${article.slug}`,
    modified_at: article.published_at || article.updated_at || article.created_at
  })).concat(pages.map(page => ({
    name: page.title,
    url: `/${page.slug}`,
    modified_at: page.updated_at || page.created_at
  })));

  // Also include prefined shortcuts in search
  SHORTCUTS.forEach(shortcut => {
    if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
      results.push(shortcut);
    }
  });

  return results;

}

