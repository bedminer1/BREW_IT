<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    
    function loginWithGoogle() {
      // Redirect to Google login page
      // You can replace this with your actual Google login URL
      // For example, if you have a backend server handling authentication:
      // window.location.href = "https://your-backend-server.com/auth/google";
    }
    function loginWithApple() {
      // Redirect to Apple login page
      // You can replace this with your actual Apple login URL
      // For example, if you have a backend server handling authentication:
      // window.location.href = "https://your-backend-server.com/auth/apple";
    }

    function loginWithEmail() {
        window.location.href = "/login-email";
      
    }
    
  
    

    
  </script>

<div class="w-full h-screen flex flex-col justify-center items-center gap-4">
    <h1 class="text-4xl font-bold text-center">My Little Goal</h1>
    <p class="text-lg text-center">Start from a little goal</p>

    <Button on:click={loginWithGoogle} class="w-[600px] flex items-center justify-center gap-2 border">
        Continue with Google
      </Button>

      <Button on:click={loginWithApple} class="w-[600px] flex items-center justify-center gap-2 border">
        Continue with Apple
      </Button>

      <Button on:click={loginWithEmail} class="w-[600px] flex items-center justify-center gap-2 border">
        Continue with Email
      </Button>
</div>



