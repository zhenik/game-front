<template>
  <div class="mdc-card analytics-chart">

      <button
              class="btn btn-success custom-btn-update"
              v-on:click="[fetchNewTop(), track('refresh')]"
      >
          <i aria-hidden="true" class="material-icons">refresh</i>
          Oppdater</button>

      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
          <button type="button"
                  data-toggle="modal"
                  data-target="#data-info-top-10">
              <i class="material-icons">
                  help
              </i>
          </button>
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
      <!--Modal info-->
      <div class="modal fade bd-example-modal-sm" id="data-info-top-10" tabindex="-1" role="dialog" aria-labelledby="listUpdateModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                  Din totale prosent positiv feedback versus andre brukere.
              </div>
          </div>
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
      },
        track(value) {
            this.$gtag.event(
                'top 10', {
                    'event_category': 'top 10',
                    'value': value
                })
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

  .dashboard-header {
      background-color: rgba(111, 111, 111, 0.4);
      display: flex;
  }
  .dashboard-header button {
      background-color: rgba(0, 0, 0, 0);
      border: 0;
      outline: 0;
      margin-left: auto;
  }
  .dashboard-header button:hover i {
      color: rgba(255, 255, 255, 1);
  }
  .custom-btn-update {
      width: 30%;
      margin: auto;
      margin-top: 1em;
      margin-bottom: 1em;
      text-align: center;
      background-color: rgba(10, 61, 194, 0.5);
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 3px;
      border: none;
      text-decoration: none;
      font-size: 1rem;
      padding: 8px 8px;
      display: block;
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
  .modal-content {
      background-color: rgba(0, 0, 0, 1);
      padding: 2em;
  }
</style>
