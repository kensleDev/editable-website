import { db } from '$lib/plugins/drizzle';
import { eq } from 'drizzle-orm';
import { sessionTable } from '../db/schema';
import type { DateTime } from 'aws-sdk/clients/devicefarm';

const ADMIN_PASSWORD: string = import.meta.env.VITE_ADMIN_PASSWORD as string;

interface AuthResult {
	sessionId: string;
}

/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
export async function getCurrentUser(sessionId: string) {
	const session = await db.query.findFirst({
		where: eq(sessionTable.session_id, sessionId),
		columns: {
			session_id: true
		}
	});

	if (session) {
		return {
			name: 'Admin'
		};
	} else {
		return null;
	}
}

/*
  Log out of the admin session ...
*/
export async function destroySession(sessionId: string): Promise<boolean> {
	await db.query.session.delete({
		where: eq(sessionTable.session_id, sessionId)
	});
	return true;
}

/*
  This can be replaced with any user-based authentication system
*/

export async function authenticate(password: string, sessionTimeout: number): Promise<AuthResult> {
	const expires: DateTime = __getDateTimeMinutesAfter(sessionTimeout);

	if (password === ADMIN_PASSWORD) {
		const { session_id } = await db.insert(sessionTable).values({ expires });

		return { sessionId: session_id };
	} else {
		throw new Error('Authentication failed.');
	}
}

function __getDateTimeMinutesAfter(minutes: number): DateTime {
	return new Date(new Date().getTime() + minutes * 60000);
}
