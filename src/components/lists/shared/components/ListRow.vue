<template>
  <div class="list-questions-raw">
    <router-link :to="listLink"
                 class="list-group-item list-group-item-action flex-column align-items-start"
                 @mouseout="isHovering = false" @mouseover="isHovering = true"
                 :class="{active: isHovering}"
    >
      <div>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">List id: {{listQuestions.id}}</h5>
          <small>created: {{dateDelta}}</small>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <small>segments: {{listQuestions.segments.length}}</small>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <small>questions: {{questionsCount}}</small>
        </div>

        <div class="d-flex w-100 justify-content-between">
          <small>state: {{listQuestions.state}}</small>
        </div>
        <br/>
        <small v-if="listQuestions.assignedToEmail !== null">assigned to:
          {{listQuestions.assignedToEmail}}</small>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      listQuestions: { type: Object, required: true }
    },
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
      },
      // }===|==>----
      questionsCount() {
        let count = 0;
        this.listQuestions.segments.forEach(segment => {
          count += segment.questions.length
        });
        return count;
      },
      listLink() {
        return {
          name: "ListElement",
          params: {
            slug: this.listQuestions.id
          }
        };
      }
    },
    methods: {
    }
  }
</script>
