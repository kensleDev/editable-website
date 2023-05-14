// See https://kit.svelte.dev/docs/types#app

import type { Session, SupabaseClient } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Locals {
			supabase: SupabaseClient; // Your type here
			getSession: () => Promise<Session | null>;
		}

		interface PageData {
			session: import('@supabase/supabase-js').Session | null;
		}
	}
}

export {};

declare module '*.md' {
	const value: string;
	export default value;
}
