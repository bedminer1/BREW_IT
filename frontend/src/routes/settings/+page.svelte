<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label";
</script>

<div class="settings-container">
  <!-- EDIT USER INFO SECTION -->
  <section class="settings-section">
    <div class="section-header">
      <Label for="edit-user-info" class="section-title">Edit Your Information</Label>
      <p class="section-subtitle">You can update your information here.</p>
    </div>

    <div class="section-divider"></div>
  
    <!-- Email input -->
    <div class="input-group">
      <Label for="email" class="input-label">Your email address</Label>
      <Input type="email" placeholder="email" class="input-field" />
      <p class="input-hint">You can manage verified email addresses in your email settings.</p>
    </div>
    
    <!-- Username input -->
    <div class="input-group">
      <Label for="username" class="input-label">Your username</Label>
      <Input type="text" id="username" placeholder="username" class="input-field" />
      <p class="input-hint">Choose a unique username for your account.</p>
    </div>

    <!-- Password change -->
    <div class="input-group">
      <Label for="new-password" class="input-label">Change Password</Label>
      <Input type="password" id="new-password" placeholder="Enter new password" class="input-field" />
      <p class="input-hint">Make sure your password is strong and unique.</p>
    </div>

    <Button class="save-button">
      Save Changes
    </Button>
  </section>

  <!-- APPEARANCE SECTION -->
  <section class="settings-section">
    <div class="section-header">
      <Label for="switch-mode" class="section-title">Appearance</Label>
      <p class="section-subtitle">Customize your viewing experience</p>
    </div>

    <div class="section-divider"></div>

    <div class="input-group">
      <Label class="input-label">Theme Preference</Label>
      <Button on:click={toggleMode} class="mode-button">
        Switch Mode
      </Button>
      <p class="input-hint">Toggle between light and dark mode</p>
    </div>
  </section>
</div>