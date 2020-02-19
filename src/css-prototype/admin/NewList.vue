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
                data-toggle="modal"
                data-target="#exampleModalCenter"
        >Save list</button>
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

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Create list with {{questions.length}} questions ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Back to edit</button>
            <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="saveList"
            >Yes</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Question from './NewQuestion'
  export default {
    name: "NewList",
    data() {
      return {
        questions:      [],
        userAssignedTo: null,
        deadline:       null,
        count:          0,
        getUsersEmails: [
            "changiz@gmail.com",
            "oda@gmail.com",
            "vasya@gmail.com",
            "others@gmail.com"
        ]
      }
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
        console.log('parent:question '+ JSON.stringify(updatedQuestion));
        this.questions.forEach((q, index) => {
          if (q.id === updatedQuestion.id) {
            this.questions[index] = updatedQuestion
          }
        })
      },
      saveList() {
        const newList       = {
          assignedToEmail:    this.userAssignedTo,
          deadline:           this.deadline,
          questions:          this.questions
        };
        console.log("new list "+ JSON.stringify(newList));

        // this.$store
        //     .dispatch('createList', newList)
        //     .then( () => this.$router.push('/lists'));
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

