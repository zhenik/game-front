<template>
  <div id="signin">
    <h2>fellow</h2>
    <div class="signin-form">
      <form @submit.prevent="submit">
        <div class="input">
          <label for="email">Brukernavn</label>
          <input
                  placeholder="e-post"
                  type="email"
                  id="email"
                  v-model="email">
        </div>
        <div class="input">
          <label for="password">Passord</label>
          <input
                  placeholder="passord"
                  type="password"
                  id="password"
                  autocomplete="on"
                  v-model="password">
        </div>
        <div class="submit">
          <button type="submit">Logg inn</button>
          <a class="col-12 text-center" href="mailto:c3masterprosjekt@gmail.com?subject=Glemt%20innlogging&body=Hei,%20jeg%20trenger%20hjelp%20med%20innlogging.%20Hilsen%20<skriv%20ditt%20navn>.">Glemt passord/brukernavn?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters({
      error: "error",
      loading: "loading",
      auth: "authenticatedAndAuthorized"
    }),
  },
  watch: {
    // }===|==>---- only when user authenticated and then authorized
    auth(yes) {
      if (yes) this.$router.push('/');
    }
  },
  methods: {
    submit () {
      const payload = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('signUserIn', payload);
    }
  }
}
</script>

<style scoped>
  #signin {
    margin: 10px;
  }

  #signin > h2 {
    font-style: italic;
    color: #FFB800;
    font-weight: bolder;
    text-transform: uppercase;
    margin-top: 1.5em;
    text-align: center;
  }
  .signin-form {
    width: 400px;
    margin: 30px auto;
    padding: 20px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #3D3D3D;
    border-radius: 3px;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #c1c1c1;
    margin-bottom: 6px;
  }

  .input input {
    width: 100%;
    background: rgba(255, 255, 255, 0.3);
    color: rgba(0, 0, 0, 0.7);
    border: none;
    outline: none;
    padding: 10px;
    font-size: 0.8em;
    margin-bottom: 1em;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #123495;
    background-color: #ffffff;
  }

  .input input:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  .input input:active {
    background: rgba(255, 255, 255, 0.7);
  }
  ::placeholder {
    color: white;
    opacity: 0.6;
  }
  :-ms-input-placeholder {
    color: white;
    opacity: 0.6;
  }

  .submit {
    margin-top: 1.7em;
    display: flex;
    flex-direction: column;
  }

  .submit button {
    margin: auto;
    border-radius: 3px;
    border: none;
    background-color: rgba(10, 61, 194, 0.5);
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: rgba(255, 255, 255, 0.7);
  }

  .submit button:hover,
  .submit button:active {
    background-color: rgba(10, 61, 194, 0.8);
    color: rgba(255, 255, 255, 1);
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  .submit a {
    opacity: 0.7;
    font-style: italic;
    font-size: 0.8em;
    margin-top: 1em;
  }
  .submit a:hover {
    opacity: 1;
  }
</style>
