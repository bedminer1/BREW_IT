<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from "mode-watcher"
	import { Telescope, Beer, Map, Settings } from '@lucide/svelte';
	import { page } from "$app/state"

	let { children } = $props();
</script>

<ModeWatcher />

<div class="h-screen flex flex-col justify-between">
	<main class="w-full flex flex-col p-4 justify-center items-start pb-24">
		{@render children()}
	</main>
	<footer class="fixed bottom-0 left-0 flex w-full justify-evenly py-6 border-2 bg-background  opacity-100">
		<a href="/brewery" class={page.url.pathname.startsWith("/brewery") ? "opacity-100" : "opacity-55"}><Beer /></a>
		<a href="/explore" class={page.url.pathname.startsWith("/explore") ? "opacity-100" : "opacity-55"}><Telescope /></a>
		<a href="/map" class={page.url.pathname.startsWith("/map") ? "opacity-100" : "opacity-55"}><Map /></a>
		<a href="/settings" class={page.url.pathname.startsWith("/settings") ? "opacity-100" : "opacity-55"}><Settings /></a>
	</footer>
</div>
