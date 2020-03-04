<template>
  <div class="lists-with-questions">
    <h2>This is lists</h2>
    <admin-whatever v-if="isAdmin"></admin-whatever>
    <user-whatever v-else></user-whatever>
    <!--shared: user and admin see the same component, but different data-->
    <!--admin sees all available lists, user sees only lists that assigned to-->
    <div class="list-group">
      <list-raw v-for="listQ in lists" v-bind:listQuestions="listQ" v-bind:key="listQ.id"></list-raw>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import ListQuestionsRaw from "./shared/components/ListRow";
  import AdminWhatever from "./admin/AdminListsHeader";
  import UserWhatever from "./user/Whatever";
  export default {
    computed: {
      ...mapGetters(["isAdmin", "lists"])
    },
    components: {
      listRaw: ListQuestionsRaw,
      adminWhatever: AdminWhatever,
      userWhatever: UserWhatever
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
