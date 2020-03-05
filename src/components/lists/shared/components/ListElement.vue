<template>
  <div>
    <h3 v-if="isAdmin">Edit list</h3>
    <h2>List element</h2>
    {{ currentList }}

    <div class="le-questions-container">
      <question-raw
          v-for="question in currentList.questions"
          v-bind:question="question"
          :key="question.id"
          v-on:update:question="setQuestionData"
      ></question-raw>
    </div>

    <div class="le-button-group">
      <button type="button"
              class="btn btn-primary btn-lg"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
              v-on:click="saveListReview"
      >Save</button>
      <button type="button" class="btn btn-info btn-lg">Export</button>
      <button type="button" class="btn btn-warning btn-lg">Deliver</button>
    </div>

    <!-- Small modal -->
    <div>
      <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            List saved
          </div>
        </div>
      </div>
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
    async beforeRouteUpdate(to, from, next) {
      await store.dispatch("currentListResetState");
      return next();
    },
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('fetchCurrentList', to.params.slug)
      next();
    },
    async beforeRouteLeave(to, from, next) {
      await store.dispatch("currentListResetState");
      next();
    },
    computed: {
      ...mapGetters(["currentList", "isAdmin"]),
    },
    methods: {
      setQuestionData(updatedQuestion) {
        this.$store.dispatch("listEditQuestionAnswer", updatedQuestion);
      },
      saveListReview() {
        this.$store.dispatch("updateList");
      }
    },
    components: {
      questionRaw: QuestionRaw
    }
  }
</script>
