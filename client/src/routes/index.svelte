<script>
  let auth = '';

  async function fetchPOST(url, data) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  async function login() {
    auth = await fetchPOST('http://localhost:8000/auth/login', {
      email: 'test',
      password: 'test',
    });
  }

  async function account() {
    const res = await fetch('http://localhost:8000/auth/me', {
      credentials: 'include',
    });
    auth = await res.text();
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button on:click={login}>Login</button>
<button on:click={account}>Account</button>
{auth}
