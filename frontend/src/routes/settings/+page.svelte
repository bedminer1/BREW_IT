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

<style>
  .settings-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .settings-section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .section-header {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    display: block;
    margin-bottom: 0.5rem;
  }

  .section-subtitle {
    font-size: 0.875rem;
    color: #666;
  }

  .section-divider {
    height: 1px;
    background: #eee;
    margin: 1.5rem 0;
  }

  .input-group {
    margin-bottom: 2rem;
  }

  .input-label {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    display: block;
    margin-bottom: 0.5rem;
  }

  .input-field {
    width: 100%;
    max-width: 400px;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .input-field:focus {
    outline: none;
    border-color: #4f46e5;
  }

  .input-hint {
    font-size: 0.875rem;
    color: #666;
    margin-top: 0.5rem;
  }

  .save-button {
    background: #4f46e5;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: background 0.2s;
  }

  .save-button:hover {
    background: #4338ca;
  }

  .mode-button {
    background: #f3f4f6;
    color: #1a1a1a;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s;
    border: 1px solid #e5e7eb;
  }

  .mode-button:hover {
    background: #e5e7eb;
  }
</style>
