<template>

  <div id="app">

    <div class="wrapper">
      <side-bar v-if="authenticated" />

      <div id="content">
        <router-view></router-view>
        Here is some context
      </div>
    </div>

  </div>
</template>

<script>
  // import SideBar from './components/navigation/SideBar.vue'
  import SideBar from './components/navigation/SideBar2.vue'

  export default {
    name: 'app',
    components: {
      SideBar
    },
    computed: {
      authenticated () {
        return this.$store.getters.authenticatedAndAuthorized
      }
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    color: #cccccc;
    background-color: #1E1E1E;
  }
  .wrapper {
    display: flex;
  }
</style>
