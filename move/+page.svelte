<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { Provider } from '@supabase/supabase-js';

	export let data;

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		const provider = action.searchParams.get('provider') as Provider;

		if (provider) {
			const res = await data.supabase.auth.signInWithOAuth({
				provider: provider
			});

			console.log({ res });
			cancel();
		}
	};
</script>

<main>
	<h1>Login</h1>
	<form action="?/login" method="POST" class="auth-form">
		<label for=""> Email </label>
		<input type="text" name="email" />
		<label for=""> Password </label>
		<input type="password" name="password" />
		<button type="submit" class="btn btn-primary">Login</button>
	</form>

	<!-- <form method="post" class="socials">
		<button formaction="?/login&provider=google" class="btn btn-primary"> Google</button>
	</form> -->

	<form class="socials" method="POST" use:enhance={submitSocialLogin}>
		<!-- <button formaction="?/login&provider=github" class="btn btn-ghost">Github</button>
		<button formaction="?/login&provider=discord" class="btn btn-ghost">Discord</button> -->
		<button formaction="?/login&provider=google" class="btn">Google</button>
	</form>
</main>

<!-- <main class="bg-gray-100 min-h-screen flex justify-center items-center">
	<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
		<h1 class="text-2xl font-bold mb-4">Login</h1>
		<form action="?/login" method="POST" class="auth-form">
			<div class="mb-4">
				<label for="email" class="block font-medium mb-1">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					required
					class="w-full border-gray-300 rounded-lg py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
				/>
			</div>
			<div class="mb-6">
				<label for="password" class="block font-medium mb-1">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					class="w-full border-gray-300 rounded-lg py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
				/>
			</div>
			<button
				type="submit"
				class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
				>Login</button
			>
		</form>
	</div>
</main> -->
