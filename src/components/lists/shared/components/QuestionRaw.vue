<template>

  <div class="card">

    <div class="card-body d-flex justify-content-between align-items-center">
      {{question.text}}

      <!--   button group   -->
      <span class="badge badge-pill">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary">
            <input type="radio"
                   name="options"
                   v-model="localQuestion.answer"> Yes
          </label>
          <label class="btn btn-secondary">
            <input type="radio" name="options" value="NO" id="option2"> No
          </label>
          <label class="btn btn-secondary">
            <input type="radio" name="options" id="option3" > Irrelevant
          </label>
        </div>
      </span>
      <!--   button group   /-->
      <span>Picked: {{localQuestion.answer}}</span>
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
          console.log("state: "+ JSON.stringify(this.localQuestion))
          // this.$emit('update:question', this.localQuestion);
        }
      }
    },
  }
</script>
