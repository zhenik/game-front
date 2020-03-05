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
          <label class="btn btn-secondary"
                 :class="{ active:  'NONE' === localQuestion.answer}">
            <input type="radio"
                   v-model="localQuestion.answer"
                   value="NONE"
                   :name="'question'+localQuestion.id"
            > None
          </label>
        </div>
      </span>
    </div>

    <!--   collapse comment   -->
    <p>
      <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="collapse" :data-target="'#question'+localQuestion.id" aria-expanded="false" aria-controls="collapseExample">
        Comment
      </button>
    </p>
    <div class="collapse" :id="'question'+localQuestion.id">
      <div class="card card-body">
        <div class="card-text">
          <label>Comment</label>
          <textarea v-model="localQuestion.comment"
                    class="form-control"
                    rows="2"></textarea>
        </div>
      </div>
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
          // console.log("state: "+ JSON.stringify(this.localQuestion));
          this.$emit('update:question', this.localQuestion);
        }
      }
    }
  }
</script>
