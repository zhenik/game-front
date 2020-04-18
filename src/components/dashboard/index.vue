<template>
  <div class="container-fluid">
    <div v-if="gamefication && doesUserHasAnalytics"  class="dashboard-row row no-gutters">
      <user-total-feedback :feedback="userAnalytics.allListsFeedback.feedback"
                           class="dashboard-element col-xs-12 col-sm-6 col-lg-4"></user-total-feedback>
      <user-last-and-best-delivery :twoListsFeedback="userAnalytics.twoListsFeedback"
                                   class="dashboard-element col-xs-12 col-sm-6 col-lg-4"></user-last-and-best-delivery>
      <user-grouped-answers-count :allListsFeedback="userAnalytics.allListsFeedback"
                                  class="dashboard-element col-xs-12 col-sm-6 col-lg-4"></user-grouped-answers-count>
      <top-ten-users class="dashboard-element col-xs-12 col-sm-6 col-lg-4" ></top-ten-users>
    </div>
    <div v-else>
      No analytics, until you deliver list.
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
      ...mapGetters(["isAdmin", "userAnalytics", "doesUserHasAnalytics", "gamefication"]),
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
        console.log("does user has analytics: ", JSON.stringify(this.doesUserHasAnalytics));
      }
    },
  }
</script>

<style scoped>
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
