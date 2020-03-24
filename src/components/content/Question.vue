<template>
  <div class="question-container">
<!--      {{this.question}}-->
<!--    <br>-->
<!--      {{this.localQuestion}}-->
    <div :class="styleQuestion">
      <div class="q-header">
        <div class="q-text">
          <p>Question text is here?</p>
        </div>

        <!--Answers-->
        <div class="q-answers-container">
          <!--   button group   -->
          <span class="badge badge-pill">
            <div class="btn-group btn-group-toggle">
              <label class="btn btn-success btn-to-checkbox" :class="{ active:  'YES' === localQuestion.answer}">
                <input type="radio"
                       :disabled="checkDisabled"
                       v-model="localQuestion.answer"
                       value="YES"
                       :name="'q-'+localQuestion.id"
                ><i class="material-icons">done</i>
              </label>

              <label class="btn btn-danger btn-to-checkbox" :class="{ active:  'NO' === localQuestion.answer}">
                <input type="radio"
                       :disabled="checkDisabled"
                       v-model="localQuestion.answer"
                       value="NO"
                       :name="'q-'+localQuestion.id"
                ><i class="material-icons">close</i>
              </label>
              <label class="btn btn-warning btn-to-checkbox" :class="{ active: 'IRRELEVANT' === localQuestion.answer}">
                <input type="radio"
                       :disabled="checkDisabled"
                       v-model="localQuestion.answer"
                       value="IRRELEVANT"
                       :name="'q-'+localQuestion.id"
                ><i class="material-icons">remove</i>
              </label>
              <label v-if="this.localQuestion.answer!=='NONE'"
                     class="btn btn-light btn-to-checkbox"
                     :class="styleQuestion">
              <input type="radio"
                     :disabled="checkDisabled"
                     v-model="localQuestion.answer"
                     value="NONE"
                     :name="'-q-'+localQuestion.id"
              ><i class="material-icons">replay</i>
            </label>
            </div>
          </span>

        </div>
      </div>
      <!--Comment-->
      <div class="q-comment">
          <textarea v-model="localQuestion.comment"
                    placeholder="Kommentar"
                    @change="onCommentInput"
                    class="form-control"
                    rows="1">
          </textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    props: {
      question: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        localQuestion: this.question
      }
    },
    watch: {
      question(value) {
        this.localQuestion = value
      }
    },
    computed: {
      ...mapGetters(["gamefication"]),
      checkDisabled () {
        return false
        // if (this.isAdmin) {
        //   return false
        // } else {
        //   const dis = 'WORK_IN_PROGRESS' !== this.currentList.state
        //   return dis
        // }
      },
      styleQuestion () {
        // const active = 'active'
        if (this.localQuestion.answer === "YES") {
          return 'question-yes'
        } else if (this.localQuestion.answer === "NO") {
          return "question-no"
        } else if(this.localQuestion.answer === "IRRELEVANT") {
          return "question-irrelevant"
        } else {
          return "question-none"
        }
      },
    },
    methods: {
      onCommentInput() {
        this.$emit('update:question', this.localQuestion)
      }
    }
  }
</script>

<style scoped>

  .btn {
    color: white;
  }

  .question-container {
    display: flex;
    flex-direction: column;
    min-height: 6em;
    margin: 0.6em;
  }

  .q-header {
    display: flex;
    margin: auto;
    flex-grow: 2;
  }

  .q-comment {
    display: flex;
    flex-grow: 1;
  }

  .q-comment textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;

    border: none;
    border-radius: 10px 10px 0 0;
    font-size: 0.8em;
    background: rgba(255, 255, 255, 0.3);
  }

  .q-text {
    display: flex;
    flex-grow: 8;
    font-style: normal;
    align-items: flex-end;
    justify-content: start;
    text-shadow: 2px 2px 2px rgba(111, 111, 111, 0.3);
  }

  .q-text p {
    margin-left: 0.6em;
  }

  .q-answers-container {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }


  .q-answers-container span {
    align-self: center;
  }

  btn-group label {
    margin: auto;
  }

  .btn-to-checkbox {
    /*opacity: 0.7;*/
    border: none;
    align-self: center;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 0;
    padding: 4px;
  }
  .btn-to-checkbox {
    align-self: center;
    margin: 0.5em;
    border-radius: 0;
    padding: 4px;
    line-height: 0;
  }

  .btn-to-checkbox.active{
    box-shadow: none;
  }

  .btn-to-checkbox:not(.active) {
    /*opacity: 0.7;*/
    border: none;
  }

  .reset-btn {
    align-self: center;
    margin: 0.5em;
    /*background-color: rgba(0, 0, 0, 0);*/
    border-radius: 0;
    border: none;
    padding: 4px;
    line-height: 0;
  }

  .reset-btn:hover{
    /*background-color: rgba(0, 0, 0, 0.5);*/
  }

  .question-none {
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(111, 111, 111, 0.4)
  }

  .question-irrelevant {
  }

  .question-yes {
    /*color: #f7b406;*/
  }

  .question-no {
  }

</style>
