<template>
  <div class="card">
    <h5 class="card-title">Question {{question.id}}</h5>
    <div>
      <div class="card-body">
        This is some text within a card body.
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Question text</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Comment</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
      </div>
    </div>
<!--    <button>Remove</button>-->
    <button v-on:click="removeFormElement(question.id)">Remove</button>
  </div>
</template>

<script>
  export default {
    props: ['question'],
    methods: {
      removeFormElement(id) {
        console.log('child: sending message up to remove id', id)
        this.$emit('remove', id)
      }
    }
  }
</script>
