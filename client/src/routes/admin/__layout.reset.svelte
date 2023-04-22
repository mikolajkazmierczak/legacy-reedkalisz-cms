<script context="module">
  import api from '$lib/API.js';

  export async function load({ url, fetch }) {
    const res = await api(fetch, 'GET', '/auth/me');
    if (res.ok) return { props: { me: res.json } };
    // TODO: find a better way to redirect back to the previous route
    const path = url.pathname.replace('/admin', '');
    return { redirect: '/admin/login' + path, status: 302 };
  }
</script>

<script>
  export let me;
</script>

<p><b>admin panel</b> {me.firstName} {me.lastName}</p>
<nav>
  <li><a href="/">Strona</a></li>
  <li><a href="/admin">Home</a></li>
  <li><a href="/admin/produkty">Produkty</a></li>
  <li><a href="/admin/slider">Slider</a></li>
</nav>
<br />

<slot />

<style>
  p,
  p * {
    color: var(--main);
  }
</style>
