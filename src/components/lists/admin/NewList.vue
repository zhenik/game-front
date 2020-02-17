<template>
  <div id="new-list">
    <div class="new-list-form">
      <div class="btn-group">
        <!--new question-->
        <button type="button"
                class="btn btn-success btn-filter"
                v-on:click="addQuestionElement">Add question</button>
      </div>
      <br/>
      <!--assigned to-->
      <div class="form-group assigned-to">
        <div>
          <select id="company" class="form-control">
            <option>-</option>
            <option>medium</option>
            <option>large</option>
          </select>
        </div>
      </div>

<!--      <component v-for="field in fields" v-bind:is="field.type" :key="field.id"></component>-->
      <question-component
          v-for="question in questions"
          v-bind:question="question"
          :key="question.id"
          @remove="removeQuestionElement"
          v-on:update:question="setQuestionData"
      ></question-component>

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

  .assigned-to {
    margin-top: 10px;
  }


</style>

