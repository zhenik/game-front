<template>
  <div class="segment-content">

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
      console.log("segment "+ JSON.stringify(this.slug))
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
  .segment-content {
    margin-left: 1px;
  }

  .segment-header {
    color: #fff;
    background-color: #3d3d3d;
    height: 4em;
    display: flex;
    align-items: center;
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
  }

</style>
