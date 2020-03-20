<template>
  <div id="app">
    <side-bar/>
    <router-view></router-view>
  </div>
</template>

<script>
  import SideBar from './components/navigation/SideBar.vue'

  export default {
    name: 'app',
    components: {
      SideBar
    }
  }
</script>

<style>
  body, html {
    margin: 0;
    color: #cccccc;
    background-color: #1E1E1E;
    /*font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;*/
  }
</style>
