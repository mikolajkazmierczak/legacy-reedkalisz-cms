<script>
  export let onclick;
  export let submit = false;
</script>

{#if submit}
  <button type="submit" on:click|preventDefault={onclick}><slot /></button>
{:else}
  <button on:click={onclick}><slot /></button>
{/if}

<style>
  button {
    cursor: pointer;
    background-color: var(--main-1);
    color: var(--grey-0);
    border: none;
    padding: 6px 7px;
  }
  button:hover {
    background-color: var(--main-0);
  }
</style>
