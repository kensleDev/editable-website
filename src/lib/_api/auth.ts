import { db } from './client';

const ADMIN_PASSWORD: string = import.meta.env.VITE_ADMIN_PASSWORD as string;

interface AuthResult {
  sessionId: string;
}

/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
export async function getCurrentUser(
  sessionId: string
): Promise<any | null> {
  const session = await db.session.findFirst({
    where: {
      session_id: sessionId,
    },
    select: {
      session_id: true,
    },
  });
  if (session) {
    return {
      name: 'Admin',
    };
  } else {
    return null;
  }
}

/*
  Log out of the admin session ...
*/
export async function destroySession(sessionId: string): Promise<boolean> {
  await db.session.delete({
    where: {
      session_id: sessionId,
    },
  });
  return true;
}

/*
  This can be replaced with any user-based authentication system
*/

export async function authenticate(
  password: string,
  sessionTimeout: number
): Promise<AuthResult> {
  const expires: string = __getDateTimeMinutesAfter(sessionTimeout);
  if (password === ADMIN_PASSWORD) {
    const { session_id } = await db.session.create({
      data: {
        expires,
      },
      select: {
        session_id: true,
      },
    });
    return { sessionId: session_id };
  } else {
    throw new Error('Authentication failed.');
  }
}

function __getDateTimeMinutesAfter(minutes: number): string {
  return new Date(new Date().getTime() + minutes * 60000).toISOString();
}
