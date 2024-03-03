<script>
  import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  /**
	 * @type {any | null}
	 */
  let errorMessage = '';
</script>

<svelte:head>
  <title>Login Page</title>
</svelte:head>

<div class="bg-slate-200 h-screen">
  <div class="flex self-center h-screen justify-center items-center">
    <div class="bg-slate-50 gap-y-14 flex flex-col py-24 px-20 rounded-lg">
      <div>
        <h1 class="text-center">Hello!</h1>
        <h2>Make your cashier easy!</h2>
      </div>
  
      <form 
        method="POST"
        action="?/login"
        class="flex flex-col gap-y-14"
        use:enhance={() => {
          return async({result}) => {
            if (result.type === 'redirect') {
              goto(result.location);
            } else if (result.type === 'failure') {
              errorMessage = result.data?.errorMessage;
            }
          }
        }}>
        <div class="flex flex-col gap-y-6">
          <input placeholder="Username" type="text" name="username" bind:value={username}>
          <input placeholder="Password" type="password" name="password" bind:value={password}>
        </div>
      
        <div>
          <p class="text-red-500 text-center text-s">{errorMessage}</p>
          <button class="bg-black text-white w-full py-3 rounded-md" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>