<script lang="ts">
  import { mode } from 'mode-watcher';
  import { superForm } from 'sveltekit-superforms';
  import Card from '$lib/components/ui/card/card.svelte';
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Form from "$lib/components/ui/form";  

  
  export let data: { form: any };
  
  const { form, errors, enhance, message } = superForm(data?.form || {
    email: '',
    password: ''
  });
</script>


<div class="flex justify-center items-center min-h-screen w-full">
  <Card class="p-10 w-1/2">
    <h1 class="text-3xl font-semibold mb-3 text-center tracking-tight">Login</h1>
    <p class="text-sm text-gray-500 text-center mb-8">Please enter your account</p>

    <form method="POST" use:enhance class="flex flex-col gap-6">
      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-medium">Email Address</label>
        <Input
          type="email"
          name="email"
          bind:value={$form.email}
          placeholder="your@email.com"
          class="p-3"
        />
        {#if $errors.email}
          <div class="text-xs text-gray-500 mt-1 italic">
            {$errors.email}
          </div>
        {/if}
      </div>

      <div class="flex flex-col gap-2">
        <label for="password" class="text-sm font-medium">Password</label>
        <Input
          type="password"
          name="password"
          bind:value={$form.password}
          placeholder="••••••••"
          class="p-3"
        />
        {#if $errors.password}
          <div class="text-xs text-gray-500 mt-1 italic">
            {$errors.password}
          </div>
        {/if}
      </div>

      <button
        type="submit"
        disabled={$message === "success"}
        class="p-3 border border-black rounded-none text-base font-medium cursor-pointer mt-2 transition-colors hover:border-black disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
      >
        {#if $message === "success"}
          Signing in...
        {:else}
          Sign In
        {/if}
      </button>
    </form>

    <div class="flex justify-center gap-3 mt-6 text-sm text-gray-500">
      <a href="/forgot-password" class="text-gray-500 hover:underline">Forgot password?</a>
      <span>•</span>
      <a href="/signup" class="text-gray-500 hover:underline">Create account</a>
    </div>
  </Card>
</div>