<template>
  <div>
    <h2>List element's segment</h2>
    <div class="le-questions-container">
      <div v-if="noQuestions"> No questions</div>
      <question-row v-else
          v-for="question in localSegment.questions"
          :question="question"
          :segmentId="localSegment.id"
          :key="'s-'+localSegment.id+'-q-'+question.id"
          v-on:update:question="questionDataChanged"
      ></question-row>
    </div>
  </div>

</template>

<script>
  import QuestionRow from "./QuestionRow";

  export default {
    props: {
      segment: { type: Object, required: true }
    },
    data() {
      return {
        localSegment: {...this.segment}
      }
    },
    computed: {
      noQuestions() {
          return (this.localSegment.questions == null || this.localSegment.questions === 'undefined' || this.localSegment.questions.length === 0);
      }
    },
    methods: {
      questionDataChanged(updatedQuestion) {
        let payload = {
          listSegmentId: this.localSegment.id,
          updatedQuestion: updatedQuestion
        };
        this.$store.dispatch("segmentEditQuestionAnswer", payload);
      }
    },
    components: {
      questionRow: QuestionRow
    }
  }
</script>
