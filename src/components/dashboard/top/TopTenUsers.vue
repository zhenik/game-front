<template>
  <div class="mdc-card analytics-chart">

      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
        <i class="material-icons">filter_list</i>
        <h3>Toppliste feedback</h3>
        <i aria-hidden="true" class="material-icons" v-on:click="fetchNewTop()">refresh</i>
      </div>
      <div class="dashboard-content">
      <ul class="list-group">
        <li v-for="(topUser, index) in topTenUsersAnalytics"
            :key="index"
            class="d-flex justify-content-between align-items-center top-user-list-element">
          <h6>{{topUser.email}}</h6>
          <span class="user-score">{{topUser.percent.toPrecision(2)}} %</span>
        </li>
        <!--      <li class="list-group-item d-flex justify-content-between align-items-center">-->
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

  .dashboard-header i {
    cursor: pointer;
  }
  .dashboard-header i:hover {
    color: white;
    border-radius: 50%;
    background-color: #1e1e1e;
  }

  .dashboard-header{
    background-color: rgba(111, 111, 111, 0.4);
  }
  .dashboard-content{
    padding: 1em;
    margin: 1em;
  }
  h3{
    font-size: 1em;
    padding: 0.5em;
    color: #C9C9C9;
    font-weight: 300;
    margin-bottom: 0;
  }
  ul{
    padding: 0;
  }
  .top-user-list-element{
    border-bottom: 1px solid rgba(111, 111, 111, 0.4);;
    margin-bottom: 1em;
  }
  h6, .user-score{
    color: #C9C9C9;
    font-weight: 300;
  }
  i{
    padding: 0.5em;
    color: #C9C9C9;
  }

</style>
