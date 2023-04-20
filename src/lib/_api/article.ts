import slugify from 'slugify';
import { db } from './client';
import type { Article, Session } from '@prisma/client';

export async function createArticle(
	title: string,
	content: string,
	teaser: string,
	currentUser: any
): Promise<Article> {
	if (!currentUser) throw new Error('Not authorized');

	const slug = slugify(title, {
		lower: true,
		strict: true
	});

	return await db.article.create({
		data: {
			slug,
			title,
			content,
			teaser,
			published_at: new Date()
		}
	});
}

export async function updateArticle(
	slug: string,
	title: string,
	content: string,
	teaser: string,
	currentUser: any
): Promise<Article> {
	if (!currentUser) throw new Error('Not authorized');

	return await db.article.update({
		where: {
			slug
		},
		data: {
			title,
			content,
			teaser,
			updated_at: new Date()
		}
	});
}

export async function getArticles(session: Session | null): Promise<Article[]> {
	if (session) {
		return await db.article.findMany({
			orderBy: {
				updated_at: 'desc'
			}
		});
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
		});
	}
}

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
	return await db.article.findFirst({
		where: {
			slug
		}
	});
}

export async function getNextArticle(slug: string): Promise<Article[]> {
	return await db.article.findMany({
		where: {
			published_at: {
				lt: (
					await db.article.findFirst({
						where: {
							slug
						},
						select: {
							published_at: true
						}
					})
				)?.published_at
			}
		},
		orderBy: {
			published_at: 'desc'
		},
		take: 1
	});
}

export async function deleteArticle(slug: string, currentUser: any): Promise<Article> {
	if (!currentUser) throw new Error('Not authorized');
	return await db.article.delete({
		where: {
			slug
		}
	});
}
