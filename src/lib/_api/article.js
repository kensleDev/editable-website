import slugify from 'slugify';
import {db} from './client'

export async function createArticle(title, content, teaser, currentUser) {

  if(!currentUser) throw new Error('Not authorized')

  const slug = slugify(title, {
    lower: true,
    strict: true
  });

  return await db.article.create({
    data: {
      slug: slug,
      title: title,
      content: content,
      teaser: teaser,
      published_at: new Date()
    }
  })
}

export async function updateArticle(slug, title, content, teaser, currentUser) {
  if(!currentUser) throw new Error('Not authorized')
  
  return await db.article.update({
    where: {
      slug: slug
    },
    data: {
      title: title,
      content: content,
      teaser: teaser,
      updated_at: new Date()
    }
  })
}

export async function getArticles(currentUser) {
  if(currentUser) {
    return await db.article.findMany({
      orderBy: {
        updated_at: 'desc'
      }
    })
  } else {
    return await db.article.findMany({
      where: {
        published_at: {
          not: null
        }
      },
      orderBy: {
        published_at: 'desc'
      }
    })
  }
}

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug) {
  return await db.article.findFirst({
    where: {
      slug: slug
    }
  })
}

export async function getNextArticle(slug) {
  return await db.article.findMany({
    where: {
      published_at: {
        lt: (await db.article.findFirst({
          where: {
            slug: slug
          },
          select: {
            published_at: true
          }
        }))?.published_at
      }
    },
    orderBy: {
      published_at: 'desc'
    },
    take: 1
  })
}


export async function deleteArticle(slug, currentUser) {
  if(!currentUser) throw new Error('Not authorized')
  return await db.article.delete({
    where: {
      slug: slug
    }
  })
}

