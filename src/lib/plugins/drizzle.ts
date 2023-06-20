import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import postgres from 'postgres';
import { PUBLIC_SUPABASE } from '$env/static/public';
import * as schema from '../../db/schema';

const connectionString = PUBLIC_SUPABASE;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

await migrate(db, { migrationsFolder: 'drizzle' });
