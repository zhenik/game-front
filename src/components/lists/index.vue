<template>
  <div class="lists-with-questions">
    <h2>This is lists</h2>
    <div v-if="isAdmin">Admin lists</div>
    <div v-else>User lists</div>
    <div class="list-group">
      <list-qustions-raw v-bind:listQuestions="listQuestions"></list-qustions-raw>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import ListQuestionsRaw from "./components/ListQuestionsRaw";
  export default {
    data() {
      return {
        listQuestions: {
          id: "5e45bbbd44859a091af2891f",
          updatedAt: "2020-02-13T22:53:24.042",
          createdAt: "2020-02-13T22:53:24.042",
          collectionId: null,
          assignedToEmail: "nik12@gmail.com",
          assignedDate: "2020-02-13T22:12:29.553",
          delivered: null,
          deadline: null,
          questions: [
            {
              id: 1,
              text: "How old are you?",
              answer: null,
              comment: null,
              score: 5
            },
            {
              id: 2,
              text: "How old are you?",
              answer: null,
              comment: null,
              score: 5
            }
          ],
          "state": "WORK_IN_PROGRESS"
        }
      }
    },
    computed: {
      ...mapGetters({
        isAdmin: "isAdmin"
      }),
    },
    components: {
      listQustionsRaw: ListQuestionsRaw
    },
  }
</script>
