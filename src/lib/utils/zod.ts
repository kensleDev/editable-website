import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export function createZodDbSchemas(drizzleSchema: any) {
	return {
		insert: createInsertSchema<typeof drizzleSchema>(drizzleSchema),
		select: createSelectSchema<typeof drizzleSchema>(drizzleSchema)
	};
}
