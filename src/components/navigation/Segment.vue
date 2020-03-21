<template>
  <div class="segment">
    <div class="progress-bar-title">{{truncatedTitle()}}</div>
    <div class="questions-delta">{{answeredQuestions()}}/{{this.segment.questions.length}}</div>
<!--    <div class="progress">-->
<!--      <div-->
<!--          class="progress-bar vv"-->
<!--          role="progressbar"-->
<!--          aria-valuenow="75"-->
<!--          aria-valuemin="0"-->
<!--          aria-valuemax="100"-->
<!--      >-->
<!--      </div>-->
<!--    </div>-->

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
      },
      truncatedTitle() {
        let title = this.segment.title;
        let n = 20; // chars is ok
        return (title.length > n) ? title.substr(0, n-1)+'...' : title
      }
    }
  }
</script>

<style scoped>
  .segment {
    height: 4em;
    display: flex;
    flex-wrap: nowrap;

    margin-top: 15px;
    background-color: DodgerBlue;
  }

  .progress-bar-title {
    text-align: center;
    justify-content: left;
    line-height: 4em;
    background-color: #ff1212;
  }

  .questions-delta {
    /*text-align: center;*/
    justify-content: right;
    background-color: #3eff00;
  }

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
