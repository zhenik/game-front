<template>
  <div class="dashboard">
<!--    <h2>This is dashboard</h2>-->

    <!--debugging purposes-->
<!--    <button type="button"-->
<!--            class="btn btn-primary btn-lg"-->
<!--            v-on:click="show"-->
<!--    >Update</button>-->

    <div v-if="true" class="analytics-container">
      <user-total-feedback :feedback="userAnalytics.allListsFeedback.feedback"></user-total-feedback>
      <user-last-and-best-delivery :twoListsFeedback="userAnalytics.twoListsFeedback"></user-last-and-best-delivery>
      <user-grouped-answers-count :allListsFeedback="userAnalytics.allListsFeedback"></user-grouped-answers-count>
      <top-ten-users class="top-ten-list"></top-ten-users>
    </div>


  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import UserTotalFeedback from "./user-total-feedback/UserTotalFeedback";
  import UserLastAndBestDelivery from "./user-last-best-delivery/UserLastAndBestDelivery";
  import UserGroupedAnswersCount from "./answers-grouped-count/UserGroupedAnswersCount";
  import TopTenUsers from "./top/TopTenUsers";
  import { store } from "@/store";

  export default {
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('fetchUserAnalytics')
      next();
    },
    computed: {
      ...mapGetters(["isAdmin", "userAnalytics"]),
    },
    components: {
      UserTotalFeedback,
      UserLastAndBestDelivery,
      UserGroupedAnswersCount,
      TopTenUsers
    },
    methods: {
      fetchUserAnalytics() {
        console.log("Fetch user analytics")
        this.$store.dispatch("fetchUserAnalytics");
      },
      show() {
        console.log("index: ", JSON.stringify(this.userAnalytics));
      }
    },
  }
</script>

<style scoped>
  .dashboard {

  }

  .analytics-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .analytics-chart {
    max-width: 400px;
    /*margin:  100px auto;*/
  }

  .analytics-pie {

  }

  .top-ten-list {
  }

</style>
