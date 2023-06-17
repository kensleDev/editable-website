<script lang="ts">
	const columns = 1;
	const rows = 3;
</script>

<h1>Layout</h1>

<div class="layout flex w-[100vw]">
	<div class="left w-1/2">
		<p>left</p>
	</div>

	<div class="right w-1/2 debug">
		<p>right</p>
		<div class="debug w-full h-[30px]" />
	</div>
</div>
