<template>

  <div class="card">

    <div class="card-body d-flex justify-content-between align-items-center">
      {{localQuestion.text}}

      <!--   button group   -->
      <span class="badge badge-pill">
        <div class="btn-group btn-group-toggle">
          <label class="btn btn-secondary"
                 :class="{ active:  'YES' === localQuestion.answer}">
            <input type="radio"
                   v-model="localQuestion.answer"
                   value="YES"
                   :name="'question'+localQuestion.id"
                   > Yes
          </label>
          <label class="btn btn-secondary"
                 :class="{ active:  'NO' === localQuestion.answer}">
            <input type="radio"
                   v-model="localQuestion.answer"
                   value="NO"
                   :name="'question'+localQuestion.id"
                   > No
          </label>
          <label class="btn btn-secondary"
                 :class="{ active:  'IRRELEVANT' === localQuestion.answer}">
            <input type="radio"
                   v-model="localQuestion.answer"
                   value="IRRELEVANT"
                   :name="'question'+localQuestion.id"
                   > Irrelevant
          </label>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      question: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localQuestion: {...this.question}
      }
    },
    watch: {
      localQuestion: {
        deep: true,
        handler() {
          console.log("state: "+ JSON.stringify(this.localQuestion));
          // this.question.
          this.$emit('update:question', this.localQuestion);
        }
      }
    },
    computed: {}
    // methods: {}
  }
</script>
