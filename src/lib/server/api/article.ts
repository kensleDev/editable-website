import slugify from 'slugify';
import {
	articlesTable,
	type Article,
	type ArticleSelect,
	articleSchema,
	type ArticleInsert
} from '$lib/server/db/schema';
import type { Session } from '@supabase/supabase-js';
import { db } from '$lib/plugins/drizzle';
import { desc, eq, isNotNull, lt } from 'drizzle-orm';

export async function createArticle(createArgs: ArticleInsert, currentUser: any) {
	if (!currentUser) throw new Error('Not authorized');
	const args = articleSchema.insert.parse(createArgs);

	args.slug = slugify(args.title as string, {
		lower: true,
		strict: true
	});

	return await db.insert(articlesTable).values({ ...args, published_at: new Date() });
}

export async function updateArticle(updateArgs: ArticleSelect, currentUser: any): Promise<Article> {
	if (!currentUser) throw new Error('Not authorized');
	const args = articleSchema.select.parse(updateArgs);

	return await db
		.update(articlesTable)
		.set(args)
		.where(eq(articlesTable.slug, args.slug as string));
}

export async function getArticles(session: Session | null): Promise<Article[]> {
	if (session) {
		return await db.select().from(articlesTable).orderBy(desc(articlesTable.updated_at));
	} else {
		return await db
			.select()
			.from(articlesTable)
			.where(isNotNull(articlesTable.published_at))
			.orderBy(desc(articlesTable.published_at));
	}
}

export async function deleteArticle(slug: string, currentUser: any): Promise<Article> {
	if (!currentUser) throw new Error('Not authorized');

	return await db.delete(articlesTable).where(eq(articlesTable.slug, slug));
}

/**
 * Retrieve article based on a given slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
	return await db.query.first(articlesTable).where(eq(articlesTable.slug, slug));
}

export async function getNextArticle(slug: string): Promise<Article[]> {
	const articleQ = await db
		.select({ published_at: articlesTable.published_at })
		.from(articlesTable)
		.where(eq(articlesTable.slug, slug))
		.limit(1);

	return await db
		.select()
		.from(articlesTable)
		.where(lt(articlesTable.published_at, articleQ[0].published_at))
		.orderBy(desc(articlesTable.published_at))
		.limit(1);
}
