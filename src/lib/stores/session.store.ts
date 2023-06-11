import type { Session } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export let session = writable<Session | null>(null);
