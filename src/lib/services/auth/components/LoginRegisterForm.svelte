<script lang="ts">
	import { goto } from '$app/navigation';
	import PrimaryButton from '$lib/components/PrimaryButton.svelte';

	export let formAction = 'login';
</script>

<form action={`?/${formAction}`} method="POST" class="flex flex-col space-y-6">
	<h1>{formAction}</h1>
	<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
		{`${formAction === 'login' ? 'Log in' : 'Sign up'} to our platform`}
	</h3>

	<label for="email">Email</label>
	<input type="email" name="email" placeholder="name@company.com" required />

	<label for="password">Your password</label>
	<input type="password" name="password" placeholder="•••••" required />

	<div class="flex items-start">
		<label for="remember"> Remember me</label>
		<input type="checkbox" name="remember" />

		{#if formAction === 'login'}
			<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
				>Lost password?</a
			>
		{/if}
	</div>

	<PrimaryButton type="submit">Login to your account</PrimaryButton>

	{#if formAction === 'login'}
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <button
				on:click={() => goto('/register')}
				class="text-blue-700 hover:underline dark:text-blue-500">Create account</button
			>
		</div>
	{:else}
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Already registered? <button
				on:click={() => goto('/login')}
				class="text-blue-700 hover:underline dark:text-blue-500">Login</button
			>
		</div>
	{/if}
</form>
