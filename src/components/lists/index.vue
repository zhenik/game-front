<template>
  <div class="lists-with-questions">
    <h2>This is lists</h2>
    <admin-whatever v-if="isAdmin"></admin-whatever>
    <user-whatever v-else></user-whatever>
    <!--shared: user and admin see the same component, but different data-->
    <!--admin sees all available lists, user sees only lists that assigned to-->
    <div class="list-group">
      <list-raw v-for="listQ in lists" v-bind:listQuestions="listQ" v-bind:key="listQ.id"></list-raw>
    </div>
  </div>
</template>

<script>
  // import { mapGetters } from "vuex";
  import ListQuestionsRaw from "./shared/components/ListQuestionsRaw";
  import AdminWhatever from "./admin/Whatever";
  import UserWhatever from "./user/Whatever";
  export default {
    data() {
      return {
        lists: [
          {
            "id": "5e491e1fc531c6607e6f4822",
            "updatedAt": "2020-02-16T11:49:03.813",
            "createdAt": "2020-02-16T11:49:03.813",
            "collectionId": null,
            "assignedToEmail": "zhenik@gmail.com",
            "assignedDate": "2020-02-16T11:49:03.813",
            "delivered": null,
            "deadline": null,
            "questions": [
              {
                "id": 1,
                "text": "How old are you?",
                "answer": null,
                "comment": null,
                "score": 5
              },
              {
                "id": 2,
                "text": "How old are you?",
                "answer": null,
                "comment": null,
                "score": 5
              }
            ],
            "state": "WORK_IN_PROGRESS"
          },
          {
            "id": "5e49564a23fb7133d650b52f",
            "updatedAt": "2020-02-16T15:48:42.373",
            "createdAt": "2020-02-16T15:48:42.371",
            "collectionId": null,
            "assignedToEmail": null,
            "assignedDate": null,
            "delivered": null,
            "deadline": null,
            "questions": [
              {
                "id": 1,
                "text": "How old are you?",
                "answer": null,
                "comment": null,
                "score": 0
              },
              {
                "id": 2,
                "text": "How old are you?",
                "answer": null,
                "comment": null,
                "score": 0
              },
              {
                "id": 3,
                "text": "Where is your car dude?",
                "answer": null,
                "comment": null,
                "score": 0
              }
            ],
            "state": "NOT_ASSIGNED"
          }
        ],
        isAdmin: true
      }
    },
    // computed: {
    //   ...mapGetters({
    //     isAdmin: "isAdmin"
    //   }),
    // },
    components: {
      listRaw: ListQuestionsRaw,
      adminWhatever: AdminWhatever,
      userWhatever: UserWhatever
    },
  }
</script>
