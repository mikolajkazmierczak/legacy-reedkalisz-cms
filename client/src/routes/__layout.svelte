<script context="module">
  import api from '$lib/API.js';

  export async function load({ fetch }) {
    const res = await api(fetch, 'GET', '/auth/me');
    console.log(res);
    if (res.ok) return { props: { me: res.json } };
    return { props: { me: null } };
  }
</script>

<script>
  export let me;
</script>

{#if me}<p>{me.firstName} {me.lastName}</p>{/if}
<nav>
  <li><a href="/">Strona główna</a></li>
  <li><a href="/produkty">Produkty</a></li>
  <li><a href="/kolory">Kolory</a></li>
  <li><a href="/slider">Slider</a></li>
</nav>
<br />

<slot />
