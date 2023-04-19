
import { SHORTCUTS } from '../constants';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

interface SearchResult {
  name: string;
  url: string;
  modified_at: Date;
}

export async function search(q: string, currentUser: any): Promise<SearchResult[]> {
  return await db.$transaction(async (t) => {
    let result;
    if (currentUser) {
      result = await t.article.findMany({
        where: {
          OR: [
            {
              title: {
                contains: q,
                mode: 'insensitive',
              },
            },
            {
              content: {
                contains: q,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: {
          title: true,
          slug: true,
          published_at: true,
          updated_at: true,
          created_at: true,
        },
        orderBy: {
          published_at: 'desc',
          updated_at: 'desc',
          created_at: 'desc',
        },
      });
    } else {
      result = await t.article.findMany({
        where: {
          title: {
            contains: q,
            mode: 'insensitive',
          },
          published_at: {
            not: null,
          },
        },
        select: {
          title: true,
          slug: true,
          published_at: true,
          updated_at: true,
          created_at: true,
        },
        orderBy: {
          published_at: 'desc',
          updated_at: 'desc',
          created_at: 'desc',
        },
      });
    }

    // Also include predefined shortcuts in search
    SHORTCUTS.forEach((shortcut) => {
      if (shortcut.name.toLowerCase().includes(q.toLowerCase())) {
        result.push({
          name: shortcut.name,
          url: shortcut.url,
          modified_at: new Date(),
        });
      }
    });

    return result.map((item) => ({
      name: item.title,
      url: `/blog/${item.slug}`,
      modified_at: item.published_at || item.updated_at || item.created_at,
    }));
  });
}
