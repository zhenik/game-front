<template>
  <div class="segment-questions-content">
    <h4>{{this.segment.title}}</h4>
    <h5>{{this.segment.description}}</h5>
    <p>question 1</p>


    <div>
      <question
          v-for="question in segment.questions"
          v-bind:question="question"
          :key="question.id"
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
      console.log("segment "+ JSON.stringify(this.segment))
    },

    components: {
      Question
    }
  }
</script>
