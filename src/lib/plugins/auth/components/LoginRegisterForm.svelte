<script>
	import { Button, Label, Input, Checkbox } from 'flowbite-svelte';

	export let formAction = 'login';

	function swapFormAction() {
		if (formAction === 'login') {
			formAction = 'register';
		} else {
			formAction = 'login';
		}
	}
</script>

<form action={`?/${formAction}`} method="POST" class="flex flex-col space-y-6">
	<h1>{formAction}</h1>
	<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
		{`${formAction === 'login' ? 'Log in' : 'Sign up'} to our platform`}
	</h3>

	<Label class="space-y-2">
		<span>Email</span>
		<Input type="email" name="email" placeholder="name@company.com" required />
	</Label>
	<Label class="space-y-2">
		<span>Your password</span>
		<Input type="password" name="password" placeholder="•••••" required />
	</Label>
	<div class="flex items-start">
		<Checkbox>Remember me</Checkbox>

		{#if formAction === 'login'}
			<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
				>Lost password?</a
			>
		{/if}
	</div>
	<Button type="submit" class="w-full1">Login to your account</Button>

	{#if formAction === 'login'}
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <button
				on:click={swapFormAction}
				class="text-blue-700 hover:underline dark:text-blue-500">Create account</button
			>
		</div>
	{:else}
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Already registered? <button
				on:click={swapFormAction}
				class="text-blue-700 hover:underline dark:text-blue-500">Login</button
			>
		</div>
	{/if}
</form>
