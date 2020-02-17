<template>
  <div id="new-list">
    <div class="new-list-form">
      <div class="btn-group mr-4">
        <!--new question-->
        <button type="button"
                class="btn btn-info btn-filter"
                v-on:click="addQuestionElement">Add question</button>
      </div>
      <div class="btn-group mr-2">
        <!--create list-->
        <button type="button"
                class="btn btn-primary btn-filter"
                v-on:click="addQuestionElement">Save list</button>
      </div>

      <br/>
      <!--assigned to-->
      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Assign to:</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01">
          <option selected>Choose...</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <div class="list-group">
        <question-component
            v-for="question in questions"
            v-bind:question="question"
            :key="question.id"
            @remove="removeQuestionElement"
            v-on:update:question="setQuestionData"
        ></question-component>
      </div>

    </div>
  </div>
</template>

<script>
  import Question from './Question'
  export default {
    name: "NewList",
    data() {
      return {
        questions: [],
        count: 0
      }
    },
    methods: {
      addQuestionElement: function () {
        this.questions.push({
          id: this.count++,
          text: null,
          comment: null
        });
      },
      removeQuestionElement(id) {
        console.log('removing form element', id)
        const index = this.questions.findIndex(f => f.id === id);
        this.questions.splice(index,1)
      },
      setQuestionData(updatedQuestion) {
        console.log('parent:question '+ JSON.stringify(updatedQuestion))
        this.questions.forEach((q, index) => {
          if (q.id === updatedQuestion.id) {
            this.questions[index] = updatedQuestion
          }
        })
      }
    },
    components: {
      questionComponent: Question
    }
  }
</script>
<style scoped>
  .new-list-form {
    margin: 10px 5%;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

</style>

