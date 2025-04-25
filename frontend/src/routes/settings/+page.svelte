<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label";
  import Card from "$lib/components/ui/card/card.svelte";
  import * as Avatar from "$lib/components/ui/avatar/index.js"; 
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { cn } from "$lib/utils.js";
  import { Languages, LanguagesIcon } from "@lucide/svelte";
  import * as Accordion from "$lib/components/ui/accordion/index.js";

  const frameworks = [
    { value: "English", label: "English" },
    { value: "Chinese", label: "中文" },
    { value: "Japanese", label: "日本語" },
    { value: "Spanish", label: "Español" },
    { value: "French", label: "Français" },
    { value: "German", label: "Deutsch" },
    { value: "Russian", label: "Русский" },
    { value: "Korean", label: "한국어" },
    { value: "Italian", label: "Italiano" },
    { value: "Portuguese", label: "Português" }
  ];
  let open = false;
  let value = "";

  $: selectedValue = frameworks.find((f) => f.value === value)?.label ?? "Select a Languages";

  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }


</script>

<!-- PROFILE SECTION -->
<div class="w-full h-screen flex flex-col justify-center items-center gap-4">
  <Avatar.Root class="w-24 h-24">
    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>

  <h1 class="text-4xl font-bold text-center">Ark.Zhang</h1>
  <p class="text-sm text-gray-500 text-center">Joined Mar 2025</p>

  <Accordion.Root class="w-full sm:max-w-[70%]">
    <!-- Edit Information -->
  <Accordion.Item value="Edit Information">
    <Accordion.Trigger>Edit Information</Accordion.Trigger>
    <Accordion.Content>
      <div class="mb-6">
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
    </Accordion.Content>
  </Accordion.Item>

  <!-- Appearance -->
  <Accordion.Item value="Appearance">
    <Accordion.Trigger>Appearance</Accordion.Trigger>
    <Accordion.Content>
      <div class="mb-6">
        <p class="text-sm italic text-gray-500">Customize your viewing experience</p>
      </div>

      <div class="section-divider"></div>

      <div class="mb-6">
        <Label class="mb-2">Theme Preference</Label>
        <Button on:click={toggleMode} class="mode-button">
          Switch Mode
        </Button>
      </div>
    </Accordion.Content>
  </Accordion.Item>
  <!--LANGUAGE SELECTION-->
    <Accordion.Item value="Language">
      <Accordion.Trigger>Language</Accordion.Trigger>
      <Accordion.Content>
        <Popover.Root bind:open let:ids>
          <Popover.Trigger asChild let:builder>
            <Button
              builders={[builder]}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              class="w-[200px] justify-between"
            >
              {selectedValue}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </Popover.Trigger>
          <Popover.Content class="w-[200px] p-0">
            <Command.Root>
              <Command.Input placeholder="Search framework..." />
              <Command.Empty>No framework found.</Command.Empty>
              <Command.Group>
                {#each frameworks as framework}
                  <Command.Item
                    value={framework.value}
                    onSelect={(currentValue: string) => {
                      value = currentValue;
                      closeAndFocusTrigger(ids.trigger);
                    }}
                  >
                    <Check
                      class={cn(
                        "mr-2 h-4 w-4",
                        value !== framework.value && "text-transparent"
                      )}
                    />
                    {framework.label}
                  </Command.Item>
                {/each}
              </Command.Group>
            </Command.Root>
          </Popover.Content>
        </Popover.Root>
</Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Notification">
      <Accordion.Trigger>Notification</Accordion.Trigger>
      <Accordion.Content>
        Notification.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Likes">
      <Accordion.Trigger>Likes</Accordion.Trigger>
      <Accordion.Content>
        Likes.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="About Us">
      <Accordion.Trigger>About Us</Accordion.Trigger>
      <Accordion.Content>
        About us.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Terms of Use">
      <Accordion.Trigger>Terms of Use</Accordion.Trigger>
      <Accordion.Content>
        Terms of use.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Privacy Policy">
      <Accordion.Trigger>Privacy Policy</Accordion.Trigger>
      <Accordion.Content>
        privacy policy.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="Log Out">
      <Accordion.Trigger>Log Out</Accordion.Trigger>
      <Accordion.Content>
        Log out.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
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
