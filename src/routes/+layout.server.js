export const load = async ({ locals: { getSession } }) => {
	console.log(await getSession());
	return {
		session: await getSession()
	};
};
