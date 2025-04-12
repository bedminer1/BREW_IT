<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label";
  import Card from "$lib/components/ui/card/card.svelte";
</script>

<div class="settings-container">
  <!-- EDIT USER INFO SECTION -->
  <Card class="p-5">
    <div class="mb-6">
      <Label for="edit-user-info">Edit Your Information</Label>
      <p class="text-sm italic text-gray-500">You can update your information here.</p>
    </div>

    <div class="section-divider"></div>
  
    <!-- Email input -->
    <div class="mb-4 flex flex-col">
      <Label for="email" class="mb-3">Email</Label>
      <Input type="email" placeholder="New Email" />
      <p class="text-xs italic pl-2 text-gray-500">You can manage verified email addresses in your email settings.</p>
    </div>
    
    <!-- Username input -->
    <div class="mb-4 flex flex-col">
      <Label for="username" class="mb-3">Username</Label>
      <Input type="text" id="username" placeholder="New Username" />
      <p class="text-xs italic pl-2 text-gray-500">Choose a unique username for your account.</p>
    </div>

    <!-- Password change -->
    <div class="mb-8 flex flex-col">
      <Label for="new-password" class="mb-3">Change Password</Label>
      <Input type="password" id="new-password" placeholder="Enter new password" />
      <p class="text-xs italic pl-2 text-gray-500">Make sure your password is strong and unique.</p>
    </div>

    <div class="w-full flex justify-center mb-3">
      <Button class="save-button">
        Save Changes
      </Button>
    </div>
  </Card>

  <!-- APPEARANCE SECTION -->
  <Card class="p-5">
    <div class="mb-6">
      <Label for="switch-mode">Appearance</Label>
      <p class="text-sm italic text-gray-500">Customize your viewing experience</p>
    </div>

    <div class="section-divider"></div>

    <div class="mb-6">
      <Label class="mb-2">Theme Preference</Label>
      <Button on:click={toggleMode} class="mode-button">
        Switch Mode
      </Button>
    </div>
  </Card>
</div>

<style>
  .settings-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
</style>