<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher"
	import { Telescope, Beer, Map, User } from '@lucide/svelte';
	let { children } = $props();
</script>

<ModeWatcher />

<div class="h-screen flex flex-col justify-between">
	{@render children()}
	<footer class="flex w-full justify-evenly py-6 border-2">
		<a href="/brew"><Beer /></a>
		<a href="/explore"><Telescope /></a>
		<a href="/map"><Map /></a>
		<a href="/profile"><User /></a>
	</footer>
</div>
