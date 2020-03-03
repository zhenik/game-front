<template>
  <div>
    <h3 v-if="isAdmin">Edit list</h3>
    <h2>List element</h2>
    {{ this.list }}

    <div class="le-questions-container">
      <question-raw
          v-for="question in this.list.questions"
          v-bind:question="question"
          :key="question.id"
          v-on:update:question="setQuestionData"
      ></question-raw>
    </div>

    <div class="le-button-group">
      <button type="button" class="btn btn-primary btn-lg">Save</button>
      <button type="button" class="btn btn-info btn-lg">Export</button>
      <button type="button" class="btn btn-warning btn-lg">Deliver</button>
    </div>

  </div>

</template>

<script>
  import {mapGetters} from "vuex";
  import { store } from "@/store";
  import QuestionRaw from './QuestionRaw'

  export default {
    name: "ListElement",
    props: {
      slug: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        list: {
          id: '',
          updatedAt: '',
          createdAt: '',
          assignedToEmail: '',
          assignedDate: '',
          delivered: '',
          deadline: '',
          questions: [],
        },
        picked: ''
      }
    },
    // mounted() {
    //   let currentList = this.$store.getters.getCurrentList
    //   this.list = currentList
    // },
    created() {
      let currentList = this.$store.getters.getCurrentList
      this.list = currentList
    },
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('fetchCurrentList', to.params.slug)
      next();
    },
    computed: {
      ...mapGetters(["getCurrentList", "isAdmin"]),
    },
    methods: {
      setQuestionData(updatedQuestion) {
        console.log('parent:question '+ JSON.stringify(updatedQuestion))
        this.list.questions.forEach((q, index) => {
          if (q.id === updatedQuestion.id) {
            this.list.questions[index] = updatedQuestion
          }
        })
      },
    },
    components: {
      questionRaw: QuestionRaw
    }
  }
</script>
