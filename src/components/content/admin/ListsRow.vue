<template>
  <div class="list-row-container">
    <router-link :to="listLink"
                 class="list-group-item list-group-item-action flex-column align-items-start"
                 @mouseout.native="isHovering = false" @mouseover.native="isHovering = true"
                 :class="[{active: isHovering}, styleRow]"
    >

      <div>
        <div class="list-row-header">
          <p v-if="list.assignedToEmail !== null">assigned to: {{list.assignedToEmail}} </p>
          <p v-else>List not assigned </p>
          <hr>
          <small>state: {{list.state}} </small>

        </div>
        <div class="list-row-description">
          <small>segments: {{list.segments.length}} </small>
          <small>questions: {{questionsCount}} </small>
        </div>
      </div>

    </router-link>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    props: {
      list: {
        type: Object, required: true
      }
    },
    data() {
      return {
        isHovering: false
      }
    },
    computed: {
      ...mapGetters(["gamefication"]),
      // }===|==>----
      dateDelta () {
        const createdAt = new Date(this.list.createdAt).getTime();
        const now = new Date().getTime();
        const daysAgo = Math.round((now - createdAt) / (1000*60*60*24));
        if (daysAgo > 0) {
          return daysAgo + " days ago";
        } else {
          return "today"
        }
      },
      // list states [NOT_ASSIGNED,UNDER_REVIEW,WORK_IN_PROGRESS,DELIVERED]
      styleRow () {
        if (!this.gamefication) {
          return "list-row-none"
        }
        if (this.list.state === "WORK_IN_PROGRESS") {
          return 'list-row-wip'
        } else if (this.list.state === "UNDER_REVIEW") {
          return "list-row-ur"
        } else if(this.list.state === "DELIVERED") {
          return "list-row-d"
        } else {
          return "list-row-na"
        }
      },
      // }===|==>----
      questionsCount() {
        let count = 0;
        this.list.segments.forEach(segment => {
          count += segment.questions.length
        });
        return count;
      },
      listLink() {
        return {
          name: "List",
          params: {
            slug: this.list.id
          }
        };
      }
    }
  }
</script>

<style scoped>
  .active {
    /*background-color: rgba(0, 0, 0, 0.1);*/
    background-color: rgba(0, 0, 0, 0.9);
  }

  .list-row-container {
    display: flex;
    flex-direction: column;
    min-height: 5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .list-row-header {

  }

  .list-row-wip {
    background-color: rgba(164, 132, 91, 0.95);
  }
  .list-row-ur {
    background-color: seagreen;
  }
  .list-row-d {
    background-color: #6f8ffd;
  }

</style>
