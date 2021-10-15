<script>
  import Login from '$lib/Components/Login.svelte';
</script>

<svelte:head>
  <title>REED Kalisz - Login</title>
</svelte:head>

<div class="wrapper">
  <Login />
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('/img/dot_grid.png');
  }
</style>
