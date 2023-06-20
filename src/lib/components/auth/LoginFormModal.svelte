<script lang="ts">
	import LoginRegisterForm from './LoginRegisterForm.svelte';
	import { enhance } from '$app/forms';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import PrimaryButton from '../PrimaryButton.svelte';
	import Modal from '../Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let showModal = false;
	export let session: Session | null = null;
	export let supabase: SupabaseClient<any, 'public', any>;

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};
</script>

{#if !session?.user}
	<PrimaryButton on:click={() => (showModal = true)}>Login/Signup</PrimaryButton>
{:else}
	<form action="/logout" method="POST" use:enhance={submitLogout}>
		<button type="submit" class="btn btn-primary">Logout</button>
	</form>
{/if}

{#if showModal}
	<Modal>
		<LoginRegisterForm />
	</Modal>
{/if}
