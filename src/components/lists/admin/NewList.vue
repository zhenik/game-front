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
                v-on:click="saveList">Save list</button>
      </div>

      <br/>
      <!--assigned to-->
      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Assign to:</label>
        </div>
        <select v-model="userAssignedTo" class="custom-select" id="inputGroupSelect01">
          <option value="" selected>None</option>
          {{getUsersEmails}}
          <option
              v-for="option in getUsersEmails"
              :key="option">
            {{ option }}
          </option>
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
  import { mapGetters } from 'vuex'
  export default {
    name: "NewList",
    data() {
      return {
        questions:      [],
        userAssignedTo: null,
        deadline:       null,
        count:          0
      }
    },
    computed: {
      ...mapGetters({
        getUsersEmails: "getUsersEmails"
      }),
    },
    methods: {
      addQuestionElement: function () {
        this.questions.push({
          id:       this.count++,
          text:     null,
          comment:  null
        });
      },
      removeQuestionElement(id) {
        console.log('removing form element', id);
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
      },
      saveList() {
        const assignedDate  = this.userAssignedTo !== null ? Date.now() : null
        const newList       = {
          assignedToEmail:    this.userAssignedTo,
          assignedDate:       assignedDate,
          deadline:           this.deadline,
          questions:          this.questions
        };
        console.log("new list "+ JSON.stringify(newList))
      }
    },
    beforeCreate() {
      // fetch data
      this.$store.dispatch("fetchUsersWithRoleUser");
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

