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
  import ListQuestionsRaw from "./ListRow";
  import AdminWhatever from "../trash/AdminWhatever";
  import UserWhatever from "../trash/UserWhatever";
  export default {
    data() {
      return {
        lists: [
          {
            id: "5e4c5d9b801be374512df24b",
            updatedAt: "2020-02-18T22:56:43.505",
            createdAt: "2020-02-18T22:56:43.505",
            assignedToEmail: "cat@gmail.com",
            assignedDate: "2020-02-18T22:56:43.505",
            delivered: null,
            deadline: null,
            questions: [
              {
                id: 0,
                text: "1",
                answer: null,
                comment: "2",
                score: 0
              }
            ],
            state: "WORK_IN_PROGRESS"
          },
          {
            id: "5e4c5de2801be374512df24c",
            updatedAt: "2020-02-18T22:57:54.352",
            createdAt: "2020-02-18T22:57:54.352",
            assignedToEmail: "cat@gmail.com",
            assignedDate: "2020-02-18T22:57:54.352",
            delivered: null,
            deadline: null,
            questions: [
              {
                id: 0,
                text: "Mine",
                answer: null,
                comment: "Yours",
                score: 0
              }
            ],
            state: "WORK_IN_PROGRESS"
          },
          {
            id: "5e4c5e1c801be374512df24d",
            updatedAt: "2020-02-18T22:58:52.842",
            createdAt: "2020-02-18T22:58:52.842",
            assignedToEmail: "chan@gmail.com",
            assignedDate: "2020-02-18T22:58:52.842",
            delivered: null,
            deadline: null,
            questions: [
              {
                id: 0,
                text: "weq",
                answer: null,
                comment: "qweqw",
                score: 0
              }
            ],
            state: "WORK_IN_PROGRESS"
          },
          {
            id: "5e4c5e39801be374512df24e",
            updatedAt: "2020-02-18T22:59:21.104",
            createdAt: "2020-02-18T22:59:21.104",
            assignedToEmail: null,
            assignedDate: null,
            delivered: null,
            deadline: null,
            questions: [
              {
                id: 0,
                text: "dasd",
                answer: null,
                comment: "dfsfsdf",
                score: 0
              }
            ],
            state: "NOT_ASSIGNED"
          }
        ],
        isAdmin: true
      }
    },
    components: {
      listRaw: ListQuestionsRaw,
      adminWhatever: AdminWhatever,
      userWhatever: UserWhatever
    }
  }
</script>


<!--scoped - means no affect to other components (classes or ids)-->
<!--write your custom css here-->
<style scoped>
  .lists-with-questions {
    margin: 5em;
  }
</style>
