<template>
  <div class="dashboard">
    <h2>This is dashboard</h2>

    <div v-if="gamefication">
      <user-total-feedback :score="userTotalFeedback.score"></user-total-feedback>
      <user-last-and-best-delivery :userLastAndBestFeedback="userLastAndBestFeedback"></user-last-and-best-delivery>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import UserTotalFeedback from "./user-total-feedback/UserTotalFeedback";
  import UserLastAndBestDelivery from "./last-best-delivery/UserLastAndBestDelivery";

  export default {
    // mocked data
    data () {
      return {
        // gamefication is on
        gamefication: true,

        // #1 user total feedback
        userTotalFeedback: {
          score: 75.0
        },
        // #2 user last and best feedback
        userLastAndBestFeedback: {
          last: {
            score: 66.0,
            questions: {
              right: 5,
              wrong: 4
            },
            date: "12312423"
          },
          best: {
            score: 100.0,
            questions: {
              right: 5,
              wrong: 4
            },
            date: "231232432"
          }
        },
        // #3 user answers state grouped count
        userGroupedAnswersCount: {
          IRRELEVANT: 1,
          NO: 1,
          YES: 1,
          NONE: 1
        },
        // #4 top10 user total feedback
        top: [
          {
            "email": "user@gmail.com",
            "percent": 75.0
          },
          {
            "email": "changiz@gmail.com",
            "percent": 66.66667
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        profile: "profile",
        isAdmin: "isAdmin"
      }),
    },
    components: {
      UserTotalFeedback,
      UserLastAndBestDelivery
    },
  }
</script>
