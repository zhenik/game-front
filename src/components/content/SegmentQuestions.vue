<template>
  <div class="segment-container">

    <div v-if="!profile.role === 'ADMIN'"
            class="segment-header">
      <p>{{this.segment.title}}</p>

        <!-- progress bar -->
        <div v-if="gamefication" class="questions-delta">
            <i :style="[answeredQuestions()===segment.questions.length ? {'color' : '#FFB800'} : {'color': '#C9C9C9'}]"
               class="progressbar-icon material-icons">done
            </i>
        </div>

        <div v-if="gamefication" class="progress">
            <div class="progress-bar"
                 :class="isSegmentComplete()"
                 :style="{width: answeredQuestionsPercent()}"
                 role="progressbar"
                 aria-valuenow="75"
                 aria-valuemin="0"
                 aria-valuemax="100">
            </div>
        </div>

    </div>

<!--    &lt;!&ndash;todo: style&ndash;&gt; <p>{{this.segment.description}}</p>-->
    <div class="questions-wrapper">
<!--      <div class="segment-header">-->
<!--        <p>{{this.segment.description}}</p>-->
<!--      </div>-->
        <question
            v-for="question in this.segment.questions"
            v-bind:question="question"
            v-bind:segmentId="segment.id"
            :key="question.id"
            v-on:update:question="questionDataChanged"
        ></question>
    </div>

  </div>


</template>

<script>
  import {mapGetters} from "vuex";
  import Question from './Question'
  export default {
    name: "SegmentQuestions",
    props: {
      slug: {
        required: true
      },
      segment: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // localSegment: {...this.segment}
        localSegment: null
      }
    },
    computed: {
      ...mapGetters(["gamefication", "profile"]),
    },
    mounted() {
      // console.log("segment "+ JSON.stringify(this.slug))
    },
    methods: {
      questionDataChanged(updatedQuestion) {
        let payload = {
          listSegmentId: this.segment.id,
          updatedQuestion: updatedQuestion
        };
        console.log("Data is updated " + JSON.stringify(payload))
        // this.$store.dispatch("segmentEditQuestionAnswer", payload);
      },
        answeredQuestions() {
            let questions = this.segment.questions;
            let answered = 0;
            for (let i = 0; i < questions.length; i +=1){
                if (questions[i].answer !== 'NONE') {
                    answered += 1
                }
            }
            return answered;
        },
        answeredQuestionsPercent() {
            let aQ = (this.answeredQuestions()*100/this.segment.questions.length).toPrecision(2) + '%'
            // console.log("Answered " + aQ);
            return aQ;
        },
        isSegmentComplete() {
            let isAnswered = this.answeredQuestions()===this.segment.questions.length;
            // console.log("isAnswered "+ isAnswered);
            return isAnswered ? 'progress-bar-completed' : 'progress-bar'
        }
    },
    components: {
      Question
    }
  }
</script>

<style scoped>
  .segment-container {
    margin-left: 1px;
  }

  .segment-header {
    top: 0;
    width: 100%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    height: 4em;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 2;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  .segment-header p {
    flex-grow: 3;
    font-size: large;
    margin: auto auto auto 10px;
    z-index: 2;
    width: 70%;
  }

  .questions-wrapper {
    /*background-color: #521751; !*todo: remove color*!*/
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: auto;
    margin-top: 8em;
  }

  .progress {
    position: absolute;
    opacity: 0.7;
    height: 100%;
    width: 100%;
    margin: auto;
    background-color: #4b4b4b;
    box-shadow: none;
    color: #8d8d8d;
    border-radius: 0;
  }

  .progress-bar {
    background-color: rgba(10, 61, 194, 0.6);
    border: 2px solid #0A3DC2;
    color: inherit;
  }
  .progress-bar-completed {
    background-color: rgba(38, 255, 111, 0.8);
    border: 2px solid #26FF6F;
    color: inherit;
  }

  .questions-delta {
    flex-grow: 1;
    z-index: 2;
    width: 30%;
    display: flex;
  }

  .progressbar-icon{
    font-size: 2em;
  }
</style>
