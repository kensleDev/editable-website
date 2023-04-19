import {db} from './client'


const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
/**
 * In this minimal setup there is only one user, the website admin.
 * If you want to support multiple users/authors you want to return the current user record here.
 */
export async function getCurrentUser(sessionId) {
  const session = await db.session.findFirst({
    where: {
      session_id: sessionId
    },
    select: {
      session_id: true
    }
  })
  if(session) {
    return {
      name: 'Admin'
    }
  } else {
    return null
  }
}

/*
  Log out of the admin session ...
*/
export async function destroySession(sessionId) {
  await db.session.delete({
    where: {
      session_id: sessionId
    }
  })
  return true
}

/*
  This can be replaced with any user-based authentication system
*/
  
export async function authenticate(password, sessionTimeout) {
  
  const expires = __getDateTimeMinutesAfter(sessionTimeout);
  if (password === ADMIN_PASSWORD) {
    const { sessionId } = await db.session.create({
      data: {
        expires
      },
      select: {
        session_id: true
      }
    })
    return { sessionId };
  } else {
    throw 'Authentication failed.';
  }
}

function __getDateTimeMinutesAfter(minutes) {
  return new Date(new Date().getTime() + minutes * 60000).toISOString();
}
