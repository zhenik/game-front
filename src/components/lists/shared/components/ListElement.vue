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

<!--  ADMIN group buttons  -->
    <div v-if="isAdmin" class="le-button-group" >
      <button type="button"
              class="btn btn-primary btn-lg"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
      >Save</button>
      <button type="button" class="btn btn-info btn-lg">Export</button>
      <button type="button"
              class="btn btn-danger btn-lg"
      >Cancel</button>
      <button type="button"
              class="btn btn-success btn-lg"
      >Confirm</button>
    </div>
    <!--  USER group buttons  -->
    <div v-else class="le-button-group" >
      <button type="button"
              class="btn btn-primary btn-lg"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
              :disabled="checkDisabled"
              v-on:click="saveListUserReview"
      >Save</button>
      <button type="button" class="btn btn-info btn-lg">Export</button>
      <button type="button"
              class="btn btn-warning btn-lg"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
              :disabled="checkDisabled"
              v-on:click="deliverListUserReview"
      >Deliver</button>
    </div>




    <!-- Small modal -->
    <div>
      <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            List updated
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
      checkDisabled () {
        console.log("isAdmin: "+this.isAdmin)
        if (this.isAdmin) {
          return false
        } else {
          const dis = 'WORK_IN_PROGRESS' !== this.currentList.state
          // console.log("disabled: "+dis)
          return dis
        }
      },
      // checkUnderReview() {
      //   return 'UNDER_REVIEW' === this.currentList.state
      // }
    },
    methods: {
      setQuestionData(updatedQuestion) {
        this.$store.dispatch("listEditQuestionAnswer", updatedQuestion);
      },
      saveListUserReview() {
        this.$store.dispatch("updateList");
      },
      deliverListUserReview() {
        this.$store.dispatch("deliverList");
      }
    },
    components: {
      questionRaw: QuestionRaw
    }
  }
</script>
