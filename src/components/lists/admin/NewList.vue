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
<!--        <label class="control-label col-sm-offset-2" for="company">Assigned to:</label>-->
<!--        <label class="control-label" for="company">Assigned to:</label>-->
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

  .assigned-to {
    margin-top: 10px;
  }


</style>

