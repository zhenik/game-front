<template>
  <div class="col-12">
    <div class="card mt-2">
      <h5 class="card-header">ID: {{segment}}</h5>

      <div class="new-list-form">
        <div class="btn-group mr-4">
          <!--new question-->
          <button type="button"
                  class="btn btn-info btn-filter"
                  v-on:click="addQuestionElement">Add question</button>
        </div>
      </div>
      <div class="list-group">
        <new-question
            v-for="question in segment.questions"
            v-bind:question="question"
            :key="question.id"
            @remove="removeQuestionElement"
            v-on:update:question="setQuestionData"
        ></new-question>
      </div>
    </div>

  </div>
</template>

<script>
  import NewQuestion from './NewQuestion.vue'

  export default {
    name: "NewSegment",
    props: {
      segment: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        count: 0
      }
    },
    methods: {
      addQuestionElement: function () {
        this.segment.questions.push({
          id:       this.count++,
          text:     '',
          comment:  ''
        });
      },
      removeQuestionElement(id) {
        console.log('segment:removing form element ', id);
        const index = this.segment.questions.findIndex(f => f.id === id);
        this.segment.questions.splice(index,1)
      },
      setQuestionData(updatedQuestion) {
        console.log('segment:question '+ JSON.stringify(updatedQuestion))
        this.segment.questions.forEach((q, index) => {
          if (q.id === updatedQuestion.id) {
            this.segment.questions[index] = updatedQuestion
          }
        })
      },
    },
    components: {
      NewQuestion
    }
  }
</script>
<style scoped>
</style>

