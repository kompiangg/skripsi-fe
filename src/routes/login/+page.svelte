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

<div>
  <h1>Hello!</h1>
  <h2>Make your cashier easy!</h2>
</div>

<form 
  method="POST"
  action="?/login"
  use:enhance={() => {
    return async({result}) => {
      console.log(result);
      if (result.type === 'redirect') {
        goto(result.location);
      } else if (result.type === 'failure') {
        errorMessage = result.data?.errorMessage;
      }
    }
  }}>
  <div>
    <input type="text" name="username" bind:value={username}>
    <input type="password" name="password" bind:value={password}>
  </div>

  <div>
    {#if errorMessage !== ''}
      <p>{errorMessage}</p>
    {/if}
    <button type="submit">Submit</button>
  </div>
</form>