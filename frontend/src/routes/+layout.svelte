<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher"
	import { Telescope, Beer, Map, Settings, Inspect } from '@lucide/svelte';
	import { page } from "$app/state"

	let { children } = $props();
</script>

<ModeWatcher />

<div class="h-screen flex flex-col justify-between">
	{@render children()}
	<footer class="flex w-full justify-evenly py-6 border-2">
		<a href="/brewery" class={page.url.pathname === "/brewery" ? "opacity-100" : "opacity-55"}><Beer /></a>
		<a href="/explore" class={page.url.pathname === "/explore" ? "opacity-100" : "opacity-55"}><Telescope /></a>
		<a href="/map" class={page.url.pathname === "/map" ? "opacity-100" : "opacity-55"}><Map /></a>
		<a href="/settings" class={page.url.pathname === "/settings" ? "opacity-100" : "opacity-55"}><Settings /></a>
	</footer>
</div>
