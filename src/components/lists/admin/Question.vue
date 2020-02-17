<template>
  <div class="col-12">
    <div class="card">
      <h5 class="card-header">ID: {{question.id}}</h5>
<!--      <h5 class="card-title">ID: {{question.id}}</h5>-->
      <div class="card-body">
        <div class="card-text">
          <label>Question text</label>
          <textarea class="form-control" id="question-text" rows="2"></textarea>
        </div>
        <div class="card-text">
          <label>Comment</label>
          <textarea class="form-control" id="question-comment" rows="2"></textarea>
        </div>
        <button v-on:click="removeFormElement(question.id)" class="btn btn-danger">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['question'],
    methods: {
      removeFormElement(id) {
        console.log('child: sending message up to remove id', id);
        this.$emit('remove', id)
      }
    }
  }
</script>

<style scoped>
  .card-text{
    margin-bottom: 1em;
  }
</style>
