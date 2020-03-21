<template>
  <div class="segment">
<!--    <div class="progress-bar-title">{{this.segment.title}}</div>-->
<!--    <div class="questions-delta">{{answeredQuestions()}}/{{this.segment.questions.length}}</div>-->
    <div class="progress">
      <div
          class="progress-bar vv"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
      >
        <div class="progress-bar-title">{{this.segment.title}}</div>
      </div>

      <div class="questions-delta">{{answeredQuestions()}}/{{this.segment.questions.length}}</div>
    </div>

  </div>
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
      }
    }
  }
</script>

<style scoped>

  .progress {
    margin: 5px;
    height: 4em;
    background-color: black;
    box-shadow: none;
    border: none;
    cursor: pointer;
    color: #8d8d8d;
  }

  .progress:hover {
    color: white;
    background-color: #272727;
  }

  .progress-bar {
    background-color: rgba(10,61,194,.3);
    border: 1px solid #0a3dc2;
    color: inherit;
    /*position: relative;*/
  }

  .progress-bar-title {
    padding-left: 5px;
    text-align: left;
    /*margin: 1em 0 0 1em;*/
  }

  .questions-delta {
    flex-grow: 1;
    text-align: right;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vv {
    width: 15%;
  }

</style>
