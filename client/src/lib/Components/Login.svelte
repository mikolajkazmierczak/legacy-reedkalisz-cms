<script>
  import { fetch } from '$lib/REST.js';
  import { goto } from '$app/navigation';
  import Input from '$lib/Components/Input.svelte';
  import Button from '$lib/Components/Button.svelte';

  let email = 'cap@avengers.com';
  let password = 'password123';
  let rememberme = false;

  let error;

  async function login() {
    const res = await fetch('POST', '/auth/login', {
      email: email,
      password: password,
      rememberme: rememberme,
    });
    if (res.error) {
      error = res.error;
    } else {
      goto('/admin');
    }
  }
</script>

<div class="login">
  <div class="circle">
    <img src="/icons/security.svg" alt="security icon" />
  </div>
  <form>
    <Input bind:value={email}>Email</Input>
    <Input type="password" bind:value={password}>Hasło</Input>
    <Input type="checkbox" bind:checked={rememberme}>Pamiętaj mnie</Input>
    <br />
    <Button submit={true} onclick={login}>Zaloguj</Button>
  </form>
</div>

<style>
  .login {
    position: relative;
    box-shadow: var(--shadow);
    padding: 30px 40px;
    width: 280px;
    background-color: var(--grey-0);
  }

  .circle {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow);
    border: solid 2px var(--main-1);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: var(--grey-0);
  }
  .circle img {
    width: 60%;
  }

  form {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
</style>
