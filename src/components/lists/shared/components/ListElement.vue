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
        }
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
        // console.log('parent:question '+ JSON.stringify(updatedQuestion))
        this.list.questions.forEach((q, index) => {
          if (q.id === updatedQuestion.id) {
            this.list.questions[index] = updatedQuestion
          }
        })
      },
      saveListReview() {
        const listToSave = this.list;
        const listId = this.slug;
        console.log("list to save -> "+JSON.stringify(listToSave));
        console.log("list slug -> "+JSON.stringify(listId));
        // this.$store
        //     .dispatch('updateList', listToSave, listId)

        // .then( () => this.$router.push('/lists'));
      }
    },
    components: {
      questionRaw: QuestionRaw
    }
  }
</script>
