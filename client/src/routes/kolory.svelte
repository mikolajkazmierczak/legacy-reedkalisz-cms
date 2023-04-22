<script context="module">
  import api from '$lib/API.js';

  export async function load({ fetch }) {
    const res = await api(fetch, 'GET', '/colors');
    return { props: { colors: res.json.docs } };
  }
</script>

<script>
  export let colors;
</script>

<h1>Kolory</h1>

{#each colors as color}
  {color.name} <b>{color.hex}</b> | {color.createdBy.firstName}
  {color.createdBy.lastName}<br />
{/each}
