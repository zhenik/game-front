<template>
  <div class="analytics-chart">
    <div class="card">
      <div class="card-header">
        Top 10 users
        <i aria-hidden="true" class="material-icons" v-on:click="fetchNewTop()">refresh</i>
      </div>
      <ul class="list-group">
        <li v-for="(topUser, index) in topTenUsersAnalytics"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center">
          {{topUser.email}}
          <span class="badge badge-primary badge-pill">{{topUser.percent.toPrecision(2)}} %</span>
        </li>
<!--        <li class="list-group-item d-flex justify-content-between align-items-center">-->
<!--          Oda-->
<!--          <span class="badge badge-primary badge-pill">95%</span>-->
<!--        </li>-->
<!--        <li class="list-group-item d-flex justify-content-between align-items-center">-->
<!--          Dog-->
<!--          <span class="badge badge-primary badge-pill">74%</span>-->
<!--        </li>-->
<!--        <li class="list-group-item d-flex justify-content-between align-items-center">-->
<!--          Girl-->
<!--          <span class="badge badge-primary badge-pill">57%</span>-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    computed: {
      ...mapGetters(["topTenUsersAnalytics"]),
    },
    methods: {
      fetchNewTop() {
        console.log("Fetch new data")
        this.$store.dispatch('fetchTopTenUsersAnalytics')
      }
    }
  }
</script>

<style scoped>
  .card {
    width: 400px;
    height: 400px;
    color: black !important;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .card-header i {
    cursor: pointer;
  }
  .card-header i:hover {
    color: white;
    border-radius: 50%;
    background-color: #1e1e1e;
  }

</style>
