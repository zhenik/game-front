<template>

  <div id="app">

    <div class="wrapper">
      <side-bar :gamefication="gamefication" v-if="authenticated" />
      <div id="content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import SideBar from './components/navigation/SideBar.vue'
  export default {
    name: 'app',
    components: {
      SideBar
    },
    data() {
      return {
        gamefication: true
      }
    },
    computed: {
      authenticated () {
        return this.$store.getters.authenticatedAndAuthorized
      },
    },
  }
</script>

<style>
  body, html {
    margin: 0;
    color: #cccccc;
    background-color: #1e1e1e;
  }
  .wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
  }
  #content {
    width: 100%;
    min-height: 100vh;
    transition: all 0.3s;
  }
</style>
