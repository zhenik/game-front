<template>
  <div class="list-questions-raw">
    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
       @mouseout="isHovering = false" @mouseover="isHovering = true"
       :class="{active: isHovering}"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">List id: {{listQuestions.id}}</h5>
        <small>created: {{dateDelta}}</small>
      </div>
      <p class="mb-1">Some random description</p>
      <small>assigned to: {{listQuestions.assignedToEmail}}</small>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['listQuestions'],
    data() {
      return {
        isHovering: false
      }
    },
    computed: {
      // }===|==>----
      dateDelta () {
        const createdAt = new Date(this.listQuestions.createdAt).getTime();
        const now = new Date().getTime();
        const daysAgo = Math.round((now - createdAt) / (1000*60*60*24));
        if (daysAgo > 0) {
          return daysAgo + " days ago";
        } else {
          return "today"
        }
      }
    },
    methods: {
    }
  }
</script>
