<template>
  <router-link
      :to="segmentLink" :segment="segment"
  >
<!--    to="/currentLists/{{this.segment.id}}"-->
    <div class="segment">
      <div class="progress-bar-title">
        <p>{{segment.title}}</p>
      </div>

      <div v-if="gamefication" class="questions-delta">
        <p :style="[answeredQuestions()===segment.questions.length ? {'color' : '#FFB800'} : {'color': '#C9C9C9'}]">
          <span :style="{'color' : '#FFB800'}">{{answeredQuestions()}}</span>/{{this.segment.questions.length}}</p>
        <i :style="[answeredQuestions()===segment.questions.length ? {'color' : '#FFB800'} : {'color': '#C9C9C9'}]"
                class="progressbar-icon material-icons">done
        </i>
      </div>

      <div v-if="gamefication" class="progress">
        <div
            class="progress-bar"
            :class="isSegmentComplete()"
            :style="{width: answeredQuestionsPercent()}"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
        >
        </div>
      </div>

    </div>
  </router-link>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'Segment',
    props: {
      segment: {
        type: Object,
        required: true
      }
    },
    methods: {
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
      },
      truncatedTitle() {
        let title = this.segment.title;
        let n = 20; // chars is ok
        return (title.length > n) ? title.substr(0, n-1)+'...' : title
      }
    },
    computed: {
      ...mapGetters(["gamefication"]),
      segmentLink() {
        return {
          name: "SegmentQuestions",
          params: {
            slug: this.segment.id,
            segment: this.segment
          }
        };
      }
    }
  }
</script>

<style scoped>

  .segment {
    z-index: 2;
    height: 4em;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    color: #6F6F6F;
  }

  .segment:hover {
    cursor: pointer;
    color: #f7b406;
    background-color: #272727;
  }

  .segment:hover p {
    color: rgba(255, 255, 255, 1);
  }

  /* segment active */
  .active,
  .active .progress {
    cursor: pointer;
    color: #f7b406;
    background-color: black;
  }

  .progress-bar-title {
    text-align: center;
    margin: auto;
    justify-content: left;
    padding-left: 5px;
    z-index: 1;
    line-height: 1em;
    width: 70%;
  }

  .progress-bar-title p {
    color: rgba(255, 255, 255, 0.7);
    font-weight: 300;
    word-break: break-all;
    font-size: 0.9em;
    text-align: left;
    margin: 0;
  }

  .questions-delta {
    justify-content: right;
    z-index: 1;
    font-weight: 300;
    font-size: 0.8em;
  }

  .questions-delta p {
    width: 100%;
    margin: auto;
    padding-right: 7px;
  }

  .progress {
    position: absolute;
    opacity: 0.5;
    height: 100%;
    width: 100%;
    margin: auto;
    background-color: #4b4b4b;
    box-shadow: none;
    cursor: pointer;
    color: #8d8d8d;
    border-radius: 0;
  }

  .progress:hover {
    color: white;
    background-color: black;
  }

  .progress-bar {
    background-color: rgba(10, 61, 194, 0.6);
    border: 1px solid #0A3DC2;
    color: inherit;
  }
  .progress-bar-completed {
    background-color: rgba(38, 255, 111, 0.8);
    border: 1px solid #26FF6F;
    color: inherit;
  }

  .questions-delta {
    flex-grow: 1;
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

