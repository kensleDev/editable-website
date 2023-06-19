export const load = async () => {
	const { data: chats, error } = await supabase.from('chat').select('*').expand('messages');

	if (error) {
		throw new Error(error.message);
	}

	return { chats };
};
