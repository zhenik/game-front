<template>
  <div class="col-12">
    <div class="card mt-2">
      <h5 class="card-header">ID: {{localQuestion.id}}</h5>
      <div class="card-body">
        <div class="card-text">
          <label>Question text</label>
          <textarea v-model="localQuestion.text"
                    class="form-control"
                    id="question-text"
                    rows="2"></textarea>
        </div>
        <div class="card-text">
          <label>Comment</label>
          <textarea v-model="localQuestion.comment"
                    class="form-control"
                    id="question-comment"
                    rows="2"></textarea>
        </div>
        <button v-on:click="removeFormElement(localQuestion.id)" class="btn btn-danger">Remove</button>
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
          this.$emit('update:question', this.localQuestion);
        }
      }
    },
    methods: {
      removeFormElement(id) {
        console.log('child: sending message up to remove id', id);
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
