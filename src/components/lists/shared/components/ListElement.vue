<template>
  <div>
    <h3 v-if="isAdmin">Edit list</h3>
    <h2>List element</h2>
    {{ list }}

    <ul class="list-group">
      <li
          v-for="question in list.questions"
          v-bind:question="question"
          :key="question.id"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">

        {{question.text}}

        <div class="btn-group mr-2 btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary">
            <input type="radio"
                   :value="question.answer"
                   v-model="picked"
                   > Yes
          </label>
          <label class="btn btn-secondary">
            <input type="radio"
                   :value="question.answer"
                   v-model="picked"
            > No
          </label>
        </div>

        You have selected : {{question.answer}}

      </li>

    </ul>


  </div>

</template>

<script>
  import {mapGetters} from "vuex";
  import { store } from "@/store";

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
    mounted() {
      let currentList = this.$store.getters.getCurrentList
      this.list = currentList
    },
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('fetchCurrentList', to.params.slug)
      next();
    },
    computed: {
      ...mapGetters(["getCurrentList", "getCurrentQuestions", "isAdmin"]),
    },
  }
</script>
