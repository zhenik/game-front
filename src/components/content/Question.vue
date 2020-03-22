<template>
  <div>
    Question
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    props: {
      question: {
        type: Object,
        required: true
      },
      // gamefication: {
      //   type: Boolean,
      //   required: false,
      //   default: true
      // }
    },
    computed: {
      ...mapGetters(["gamefication"]),
    },
  }
</script>
