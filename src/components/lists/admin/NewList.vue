<template>
  <div id="new-list">
    <div class="new-list-form">
      <!--new question-->
<!--      <button type="button" v-on:click="addFormElement('form-textarea')">Add form-textarea</button>-->
<!--      <button type="button" v-on:click="addFormElement('question')">Add question</button>-->
      <button type="button" v-on:click="addQuestionElement">Add question</button>

      <!--assigned to-->
      <div class="form-group">
        <label class="control-label col-sm-offset-2 col-sm-2" for="company">Assigned to:</label>
        <div class="col-sm-6 col-md-4">
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
      ></question-component>

    </div>
  </div>
</template>

<script>
  import Question from './Question'
  export default {
    data() {
      return {
        fields: [],
        questions: [],
        count: 0
      }
    },
    methods: {
      addQuestionElement: function () {
        this.questions.push({
          id: this.count++
        });
      },
      removeQuestionElement(id) {
        console.log('removing form element', id)
        const index = this.questions.findIndex(f => f.id === id);
        this.questions.splice(index,1)
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

Vue.component('form-textarea', {
  template: '#form-textarea'
});
