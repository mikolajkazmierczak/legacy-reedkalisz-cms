<script>
  export let type = 'text';
  export let value = '';
  export let checked = false;
</script>

{#if type == 'checkbox'}
  <label class="checkbox">
    <input type="checkbox" bind:checked />
    <span><slot /></span>
  </label>
{:else if type == 'password'}
  <label class="password">
    <span><slot /></span>
    <input type="password" bind:value />
  </label>
{:else}
  <label class="text">
    <span><slot /></span>
    <input type="text" bind:value />
  </label>
{/if}

<style>
  label {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: start;
  }
  label.checkbox {
    flex-flow: row;
    justify-content: start;
    align-items: center;
  }

  span {
    display: block;
    padding: 5px 7px;
  }

  input {
    border-radius: 0;
    border: var(--border);
    padding: 5px 7px;
    width: 100%;
  }

  input[type='checkbox'] {
    cursor: pointer;
    margin: 0;
    width: 16px;
    height: 16px;
    border: none;
    accent-color: var(--main-1);
  }
</style>
