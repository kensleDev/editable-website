<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import LoginRegisterForm from './LoginRegisterForm.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let modalOpen = false;
	export let isLoggedIn = false;

	export let data: {
		supabase: SupabaseClient<any, 'public', any>;
		session: Session | null;
	};

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await data.supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

{#if !isLoggedIn}
	<Button on:click={() => (modalOpen = true)}>Login/Signup</Button>
{:else}
	<form action="/logout" method="POST" use:enhance={submitLogout}>
		<button type="submit" class="btn btn-primary">Logout</button>
	</form>
{/if}

<Modal bind:open={modalOpen} size="xs" autoclose={false} class="w-full">
	<LoginRegisterForm />
</Modal>
