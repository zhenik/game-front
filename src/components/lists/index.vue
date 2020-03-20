<template>
  <div class="lists-with-questions">
    <div v-if="noLists">
      No lists are here... yet.
    </div>
    <div v-else class="list-group">
      <list-raw v-for="listQ in lists" v-bind:listQuestions="listQ" v-bind:key="listQ.id"></list-raw>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import ListQuestionsRaw from "./shared/components/ListRow";
  export default {
    computed: {
      ...mapGetters(["isAdmin", "lists"]),
      noLists() {
        return (this.lists == null || this.lists === 'undefined' || this.lists.length === 0);
      }
    },
    components: {
      listRaw: ListQuestionsRaw,
    },
    methods: {
      fetchData() {
        this.$store.dispatch("fetchLists");
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style scoped>

</style>
