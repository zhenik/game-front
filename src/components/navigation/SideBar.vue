<template>
  <nav id="sidebar">
    <!--sidebar-header logo-->
    <div class="sidebar-logo">
      <router-link to="/">Welcome to OCN</router-link>
    </div>

    <!--sidebar-header block-->
    <div class="sidebar-header">
      <h3>{{profile.role}}</h3>
      <h4>{{profile.email}}</h4>
      <h5>{{profile.name}}</h5>
    </div>

    <!--deadline block-->
    <div class="deadline">
      <p>{Closest deadline}</p>
    </div>

    <!--todo: lists component-->
    <div class="lists-component">
      <p>
        LISTS COMPONENT
      </p>
    </div>


    <!--temporary navigation-->
    <nav class="router-nav-group">
      <ul v-if="authenticated">
        <li>
          <router-link to="/lists">Lists</router-link>
        </li>
        <li>
          <router-link to="/profile">Profile</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <button @click="onLogout" class="logout">Logout</button>
        </li>
      </ul>
    </nav>



  </nav>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    computed: {
      authenticated () {
        return this.$store.getters.authenticatedAndAuthorized
      },
      ...mapGetters({
        profile: 'profile'
      })
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    }
  }
</script>

<style scoped>
  #sidebar {
    min-width: 250px;
    max-width: 250px;
    background: #353535;
    color: white;
    transition: all 0.3s;
    min-height: 100vh;
  }
  .sidebar-logo {
    text-align: center;
    font-weight: bold;
    color: white;
  }
  .sidebar-logo a {
    text-decoration: none;
    color: white;
  }
  .sidebar-header {
    width: 100%;
    padding: 20px;
    text-align: center;
    margin: 0;
    background: #5f5f5f;
  }
  .deadline {
    text-align: center;
    font-weight: bold;
    padding: 20px;
    background: #ad8557;
  }
  .lists-component {
    color: #1E1E1E;
    height: 250px;
    background-color: aqua;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow:column nowrap;
  }

  li a {
    text-decoration: none;
    color: white;
  }
  /*reset button padding*/
  li button {
    padding: 0;
  }
  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }
  .logout:hover {
    color: #fa923f;
  }
</style>
