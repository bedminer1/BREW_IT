<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher"
	let { children } = $props();
</script>

<ModeWatcher />

<div class="h-screen flex flex-col justify-between">
	{@render children()}
	<footer class="flex w-full justify-evenly pb-8">
		<a href="/">Home</a>
		<a href="/chat">Chat</a>
		<a href="/map">Map</a>
		<a href="/profile">Profile</a>
	</footer>
</div>
