<template>
  <div class="list-row-container">
    <router-link :to="listLink"
                 class="list-group-item list-group-item-action flex-column align-items-start"
                 @mouseout="isHovering = false" @mouseover="isHovering = true"
                 :class="{active: isHovering}"
    >

      <div :class="styleRow">
        <div class="list-row-header">
          Header list row
        </div>
        <div class="list-row-description">
          Description list row
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
          return "list-row-nu"
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
          name: "ListElement",
          params: {
            slug: this.list.id
          }
        };
      }
    }
  }
</script>

<style scoped>

  .list-row-container {
    display: flex;
    flex-direction: column;
    min-height: 5em;
  }

</style>
