<template>
  <nav id="sidebar">
    <!--sidebar-logo-->
    <div class="sidebar-logo">
      <p style="float: left; text-align: start;">prosjektNAME</p>
      <p style="float: right; text-align: end;">prosjektNR</p>
<!--      <router-link to="/">Welcome to OCN</router-link>-->
    </div>


    <!--sidebar-user block-->
    <div class="sidebar-user">
      <img src="@/assets/dog.png" alt="Avatar">
      <h4>{{profile.role.toLowerCase()}}</h4>
      <p v-if="profile.role == 'USER'">Sjekkliste {{profile.name}}</p>
      <p>{{profile.email}}</p>
    </div>

    <!--user related side bar-->
    <div v-if="profile.role == 'USER'">
      <!--user lists component, block with segments-->
      <LastWIPList :gamefication="gamefication"></LastWIPList>
    </div>
    <div v-else>
      <!--admin lists components-->
    </div>

    <!--temporary navigation; todo: remove-->
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
  import LastWIPList from "./LastWIPList";
  export default {
    components: {
      LastWIPList
    },
    props: {
      gamefication: {
        type: Boolean,
        required: true
      }
    },
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
    background-color: #353535;
    color: white;
    transition: all 0.3s;
    min-height: 100vh;
  }
  .sidebar-logo {
    text-align: center;
    font-weight: bold;
    color: white;

    width: 100%;
    box-sizing: border-box;
    position: relative;
    margin: 10px auto 30px;
  }
  .sidebar-logo a {
    text-decoration: none;
    color: white;
  }
  .sidebar-logo p {
    font-size: 0.6em;
    color: #C9C9C9;
    width: 50%;
    opacity: 0.8;
    /*margin: 0px 2px 1em;*/
  }

  .sidebar-user {
    width: 100%;
    text-align: center;
    margin: 0;
    background: #363636;
  }
  .sidebar-user img {
    border-radius: 50%;
    width: 25%;
    margin: 20px auto 20px auto;
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
