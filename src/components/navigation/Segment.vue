<template>
  <router-link
      :to="segmentLink"
  >
<!--    to="/currentLists/{{this.segment.id}}"-->
    <div class="segment">
      <div class="progress-bar-title">
        <p>{{truncatedTitle()}}</p>
      </div>

      <div v-if="gamefication" class="questions-delta">
        <p>{{answeredQuestions()}}/{{this.segment.questions.length}}</p>
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
  export default {
    name: 'Segment',
    props: {
      gamefication: {
        type: Boolean,
        required: true
      },
      segment: {
        type: Object,
        required: true
      }
    },
    date() {
      return {

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
        console.log("Answered " + aQ);
        return aQ;
      },
      isSegmentComplete() {
        let isAnswered = this.answeredQuestions()===this.segment.questions.length;
        console.log("isAnswered "+ isAnswered);
        return isAnswered ? 'progress-bar-completed' : 'progress-bar'
      },
      truncatedTitle() {
        let title = this.segment.title;
        let n = 20; // chars is ok
        return (title.length > n) ? title.substr(0, n-1)+'...' : title
      }
    },
    computed: {
      segmentLink() {
        return {
          name: "SegmentQuestions",
          params: {
            slug: this.segment.id
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
    margin: 15px 5px 0px 5px;
    color: #dddddd;
    border-radius: 5px;
  }

  .segment:hover {
    cursor: pointer;
    color: #f7b406;
    background-color: #272727;
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
    justify-content: left;
    line-height: 4em;
    padding-left: 5px;
  }

  .questions-delta {
    justify-content: right;
  }
  .questions-delta p {
    width: 100%;
    margin: auto;
    padding-right: 5px;
  }

  .progress {
    position: absolute;
    opacity: 0.5;
    height: 100%;
    width: 100%;
    margin: auto;
    top: 0; left: 0; bottom: 0; right: 0;
    background-color: #4b4b4b;
    box-shadow: none;
    border: none;
    cursor: pointer;
    color: #8d8d8d;
  }

  .progress:hover {
    color: white;
    background-color: black;
  }

  .progress-bar {
    background-color: rgba(10,61,194,.7);
    border: 1px solid #0a3dc2;
    color: inherit;
  }
  .progress-bar-completed {
    background-color: rgba(52, 184, 85, 1);
    border: 1px solid #48fc6e;
    border-radius: 5px;
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

