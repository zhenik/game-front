<template>
  <div class="col-12">
    <div class="card mt-2">
      <h5 class="card-header">ID: {{question.id}}</h5>
      <div class="card-body">
        <div class="card-text">
          <label>Question text</label>
          <textarea v-model="question.text"
                    class="form-control"
                    id="question-text"
                    rows="1"></textarea>
        </div>
        <button v-on:click="removeFormElement(question.id)" class="btn btn-danger">Remove</button>
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
    watch: {
      question: {
        deep: true,
        handler() {
          // console.log("question:handler "+ JSON.stringify(this.question))
          this.$emit('update:question', this.question);
        }
      }
    },
    methods: {
      removeFormElement(id) {
        // console.log('question:remove id', id);
        this.$emit('remove', id)
      },
    },
  }
</script>

<style scoped>
  .card-text{
    margin-bottom: 1em;
  }
</style>
