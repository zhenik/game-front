<template>
  <div>
    <div class="segment-header">
      <i class="material-icons ml-2">filter_list</i>
      <p>Toppliste</p>
    </div>
    <div class="container-fluid">
      <div v-if="gamefication"  class="dashboard-row row no-gutters">

        <top-ten-users class="dashboard-element col-6" ></top-ten-users>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import TopTenUsers from "./top/TopTenUsers";

  export default {
    computed: {
      ...mapGetters(["isAdmin", "gamefication"]),
    },
    components: {
      TopTenUsers
    },
    methods: {
      show() {
        console.log("index: ", JSON.stringify(this.userAnalytics));
        console.log("does user has analytics: ", JSON.stringify(this.doesUserHasAnalytics));
      }
    },
  }
</script>

<style scoped>
  .segment-header {
    top: 0;
    width: 100%;
    color: #fff;
    background: #3D3D3D;
    height: 4em;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 2;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  .segment-header p {
    flex-grow: 3;
    font-size: large;
    margin: auto auto auto 10px;
    z-index: 2;
    width: 70%;
  }
  .dashboard-row {
    margin-top: 6em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .analytics-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .analytics-chart {
    background-color: #3D3D3D;
    margin: 1em;
  }
</style>
