<template>
  <div class="question-container">

    <div class="q-header">
      <div class="q-text">
        <p>Question text is here?</p>
      </div>
      <div class="q-answers-container">
        answers
      </div>
    </div>

    <div class="q-comment">
        <textarea rows="1"></textarea>
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
    computed: {
      ...mapGetters(["gamefication"]),
    },
  }
</script>

<style scoped>
  .question-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    min-height: 6em;
    margin: 10px auto 0px auto;
    background-color: #0004fc; /**todo: remove color*/
  }

  .q-header {
    display: flex;
    flex-grow: 2;
    background-color: #00fc09;
  }

  .q-comment {
    display: flex;
    flex-grow: 1;
    background-color: #fc0002;
  }

  .q-comment textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;

    border: none;
    border-radius: 10px 10px 0 0;
    font-size: 0.8em;
    color: rgba(0, 0, 0, 0.7);
    font-size: 0.8em;
  }

  .q-text {
    flex-grow: 6;
    background-color: #f7b406;
  }
  .q-answers-container {
    flex-grow: 8;
    background-color: #00f71a;
  }

</style>
