<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fetch } from '$lib/REST.js';

  async function test() {
    try {
      const res = await fetch('GET', '/');
    } catch (err) {
      console.log(err);
      // goto('/admin/login');
    }
  }

  onMount(() => {
    test();
  });
</script>

<nav>
  <a href="/admin">Start</a>
  <a href="/admin/products">Produkty</a>
  <a href="/admin/categories">Kategorie</a>
</nav>

<slot />
