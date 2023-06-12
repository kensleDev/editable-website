import { z } from 'zod';

// Name has a default value just to display something in the form.
export const headSchema = z.object({
	title: z.string().default('Hello world!'),
	metaTag: z.string(),
	linksTags: z.array(z.string())
});
