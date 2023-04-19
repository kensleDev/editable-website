import _db from '../_db';
/** Use a singleton DB instance */
const db = _db.instance;

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

/*
  This can be replaced with any user-based authentication system
*/
export async function authenticate(password, sessionTimeout) {
  return await db.tx('create-session', async t => {
    const expires = __getDateTimeMinutesAfter(sessionTimeout);
    if (password === ADMIN_PASSWORD) {
      const { sessionId } = await t.one(
        'INSERT INTO sessions (expires) values($1) returning session_id',
        [expires]
      );
      return { sessionId };
    } else {
      throw 'Authentication failed.';
    }
  });
}

/*
  Log out of the admin session ...
*/
export async function destroySession(sessionId) {
  return await db.tx('destroy-session', async t => {
    await t.any('DELETE FROM sessions WHERE session_id = $1', [sessionId]);
    return true;
  });
}

/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
export async function getCurrentUser(sessionId) {
  return await db.tx('get-current-user', async t => {
    const session = await t.oneOrNone('SELECT session_id FROM sessions WHERE session_id = $1', [
      sessionId
    ]);
    if (session) {
      return {
        name: 'Admin'
      };
    } else {
      return null;
    }
  });
}

/**
 * Helpers
 */
function __getDateTimeMinutesAfter(minutes) {
  return new Date(new Date().getTime() + minutes * 60000).toISOString();
}
