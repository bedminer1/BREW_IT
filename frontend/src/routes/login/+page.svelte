<script lang="ts">
    import { superForm } from 'sveltekit-superforms';
    
    export let data: { form: any };
    
    const { form, errors, enhance, isSubmitting } = superForm(data?.form || {
      email: '',
      password: ''
    });
  </script>
  
  <div class="login-container">
    <div class="login-card">
      <h1>Login</h1>
      <p class="subtitle">Please enter your account</p>
  
      <form method="POST" use:enhance class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            name="email"
            bind:value={$form.email}
            placeholder="your@email.com"
            class:invalid={$errors.email}
          />
          {#if $errors.email}
            <div class="error-message">
              {$errors.email.join(', ')}
            </div>
          {/if}
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            bind:value={$form.password}
            placeholder="••••••••"
            class:invalid={$errors.password}
          />
          {#if $errors.password}
            <div class="error-message">
              {$errors.password.join(', ')}
            </div>
          {/if}
        </div>
  
        <button type="submit" disabled={$isSubmitting} class="submit-button">
          {#if $isSubmitting}
            Signing in...
          {:else}
            Sign In
          {/if}
        </button>
      </form>
  
      <div class="footer-links">
        <a href="/forgot-password">Forgot password?</a>
        <span>•</span>
        <a href="/signup">Create account</a>
      </div>
    </div>
  </div>
  
  <style>
    :global(body) {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: white;
    }
  
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      width: 100vw;
      background-color: white;
    }
  
    .login-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 0;
      padding: 2.5rem;
      width: 100%;
      max-width: 400px;
      box-shadow: none;
    }
  
    h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: black;
      margin-bottom: 0.75rem;
      text-align: center;
      letter-spacing: -0.5px;
    }
  
    .subtitle {
      color: #666;
      font-size: 0.95rem;
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  
    label {
      font-size: 0.9rem;
      font-weight: 500;
      color: black;
    }
  
    input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 0;
      font-size: 1rem;
      background: white;
      color: black;
    }
  
    input:focus {
      outline: none;
      border-color: black;
    }
  
    input.invalid {
      border-color: #888;
    }
  
    .error-message {
      color: #666;
      font-size: 0.8rem;
      margin-top: 0.25rem;
      font-style: italic;
    }
  
    .submit-button {
      background: black;
      color: white;
      padding: 0.85rem;
      border: 1px solid black;
      border-radius: 0;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      margin-top: 0.5rem;
      transition: all 0.2s;
    }
  
    .submit-button:hover {
      background: white;
      color: black;
    }
  
    .submit-button:disabled {
      background: #eee;
      color: #888;
      border-color: #ddd;
      cursor: not-allowed;
    }
  
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 0.75rem;
      margin-top: 1.5rem;
      font-size: 0.85rem;
      color: #666;
    }
  
    .footer-links a {
      color: #666;
      text-decoration: none;
    }
  
    .footer-links a:hover {
      text-decoration: underline;
      color: black;
    }
  </style>