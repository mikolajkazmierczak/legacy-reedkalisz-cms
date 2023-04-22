<script context="module">
  import api from '$lib/API.js';

  export async function load({ fetch }) {
    const res = await api(fetch, 'GET', '/slides');
    return { props: { slides: res.json.docs } };
  }
</script>

<script>
  export let slides;
</script>

<h1>Slider</h1>

{#if slides}
  {#each slides as slide}
    {slide.name}
    {slide.src}
    <img src={slide.src} alt={slide.name} />
  {/each}
{:else}
  Nie ma zdjęć
{/if}
