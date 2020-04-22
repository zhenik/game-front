<template>
  <div class="segment-container">

    <div class="segment-header">
      <p>{{this.segment.title}}</p>
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
      ...mapGetters(["gamefication"]),
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
    background-color: #3d3d3d;
    height: 4em;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .segment-header p {
    font-size: large;
    margin: auto auto auto 10px;
  }

  .questions-wrapper {
    /*background-color: #521751; !*todo: remove color*!*/
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: auto;
    margin-top: 7em;
  }

</style>
