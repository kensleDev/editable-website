export async function load({ locals: { getSession } }) {
  const session = await getSession()

  return {
    session
  };
}
