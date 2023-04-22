<script>
  import { goto } from '$app/navigation';

  function admin() {
    goto('/admin');
  }
</script>

<h1>Welcome to the website you filthy animal</h1>

<br />
<button on:click={admin}>admin</button>
