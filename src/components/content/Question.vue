<template>
  <div class="question-container">

    <div :class="styleQuestion">
      <div class="q-header">
        <div class="q-text">
          <p>{{localQuestion.text}}</p>
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
                       @click="track('YES')"
                ><i class="material-icons">done</i>
              </label>
              <label class="btn btn-danger btn-to-checkbox" :class="{ active:  'NO' === localQuestion.answer}">
                <input type="radio"
                       :disabled="checkDisabled"
                       v-model="localQuestion.answer"
                       value="NO"
                       :name="'q-'+localQuestion.id"
                       @click="track('NO')"
                ><i class="material-icons">close</i>
              </label>
              <label class="btn btn-warning btn-to-checkbox" :class="{ active: 'IRRELEVANT' === localQuestion.answer}">
                <input type="radio"
                       :disabled="checkDisabled"
                       v-model="localQuestion.answer"
                       value="IRRELEVANT"
                       :name="'q-'+localQuestion.id"
                       @click="track('IRRELEVANT')"
                ><i class="material-icons">remove</i>
              </label>
              <label class="btn btn-secondary btn-to-checkbox"
                     :class="[{ active:  'NONE' === localQuestion.answer}, {'hide-btn': this.localQuestion.answer=='NONE'}]">
              <input type="radio"
                     :disabled="checkDisabled"
                     v-model="localQuestion.answer"
                     value="NONE"
                     :name="'-q-'+localQuestion.id"
                     @click="track('reset')"
              ><i class="material-icons">replay</i>
            </label>
            </div>
          </span>

          <!-- show answer if its not NONE or show answer to admin anyway-->
          <div v-if="this.localQuestion.answer!=='NONE' || isAdmin"
               class="q-answer-text">
            <small>
              {{helperText}}
            </small>
          </div>
        </div>

      </div>
      <!--Comment-->
      <div class="q-comment"
              :class="{'highlight': localQuestion.comment !== null}">
          <textarea v-model="localQuestion.comment"
                    placeholder="Kommentar"
                    @change="[onCommentInput(), track('comment')]"
                    class="form-control"
                    rows="1">
          </textarea>
      </div>

    </div>
    <!--Admin block appear only if user is admin and list has state UNDER_REVIEW-->
    <!--info: be aware, tag `:name` should be unique per each radio, to support unique state-->
    <div v-if="isAdmin && currentList.state === 'UNDER_REVIEW'">
      <label class="btn btn-to-checkbox admin-approve-btn" >
        <input type="radio"
               v-model="localQuestion.score"
               :value=1
               :name="'approve-s-'+segmentId +'-q-'+ question.id"
        ><i class="material-icons">thumb_up_alt</i>
      </label>
      <label class="btn btn-to-checkbox admin-reject-btn">
        <input type="radio"
               v-model="localQuestion.score"
               :value=0
               :name="'not-approve-s-'+segmentId +'-q-'+ question.id"
        ><i class="material-icons">thumb_down_alt</i>
      </label>
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
      segmentId: {
        type: Number,
        required: true
      }
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
      ...mapGetters(["gamefication", "isAdmin", "currentList"]),
      checkDisabled () {
        if (this.isAdmin) {
          return true
        } else {
          const dis = 'WORK_IN_PROGRESS' !== this.currentList.state
          return dis
        }
      },
      styleQuestion () {
        if (!this.gamefication) {
          return "question-none"
        }

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
      helperText () {
        if (this.localQuestion.answer === "YES"){
          return "UTFØRT"
        }else if (this.localQuestion.answer === "NO"){
          return "IKKE UTFØRT"
        }else if (this.localQuestion.answer === "IRRELEVANT"){
          return "IRRELEVANT"
        }else return null;
      }
    },
    methods: {
      onCommentInput() {
        this.$emit('update:question', this.localQuestion)
      },
      track(value) {
        this.$gtag.event(
                'list', {
                  'event_category': 'question input',
                  'value': value
                })
      }
    }
  }
</script>

<style scoped>
/**

  }===|==>---- My favorite crutch
  override btn stylying
*/
.btn {
  color: white;
}
.btn-success:hover {
  background-color: rgba(38, 255, 111, 0.3) !important;
}
.btn-danger:hover {
  background-color: rgba(250, 92, 32, 0.3) !important;
}
.btn-warning:hover {
  background-color: rgba(255, 184, 0, 0.3) !important;
}

.btn-group, .btn-group-toggle, .badge, .badge-pill {
  margin: 0;
  padding: 0;
}

/* main container*/
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
.q-answer-text {
  text-align: center;
  color: white;
}

/*
Comment
*/
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
  background: rgba(255, 255, 255, 0.25);
}
.q-comment textarea:hover {
  background: rgba(255, 255, 255, 0.5);
}
.q-comment textarea:active {
  background: rgba(255, 255, 255, 0.7);
}
.q-comment textarea::placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.highlight textarea {
  background: rgba(255, 255, 255, 0.8);
}
.q-text {
  display: flex;
  width: 70%;
  font-style: normal;
  align-items: flex-end;
  justify-content: flex-start;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
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

.btn-to-checkbox {
  align-self: center;
  margin: 0.5em;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0;
  padding: 4px;
  line-height: 0;
}

.btn-to-checkbox.active {
  box-shadow: none;
  border: 1px solid;
}

.btn-to-checkbox:not(.active) {
  opacity: 0.7;
  border: none;
}

.reset-btn {
  align-self: center;
  margin: 0.5em;
  background-color: rgba(0, 0, 0, 0);
  line-height: 0;
  color: white;
}

.hide-btn {
  visibility: hidden;
}

.btn:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.question-none {
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(111, 111, 111, 0.4)
}

.question-yes {
  color: #26FF6F;
  border: 1px solid #26FF6F;
  background-color: rgba(38, 255, 111, 0.3);
}
.question-yes .btn-success {
  border: 1px solid #26FF6F !important;
  background-color: #34b855 !important;
}

.question-no {
  color: #FA5C20;
  border: 1px solid #FA5C20;
  background-color: rgba(250, 92, 32, 0.3);
}

.question-no .btn-danger {
  border: 1px solid #FA5C20 !important;
  background-color: #b54722 !important;
}

.question-irrelevant {
  color: #FFB800;
  border: 1px solid #FFB800 !important;
  background-color: rgba(255, 184, 0, 0.4);
}
.question-irrelevant .btn-warning {
  border: 1px solid #FFB800 !important;
  background-color: #c38f15 !important;
}

.admin-reject-btn {
  color: #FA5C20;
  background-color: transparent;
}

.admin-approve-btn {
  color: #26FF6F;
  background-color: transparent;
}
</style>
