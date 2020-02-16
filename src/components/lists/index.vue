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
  import { mapGetters, mapActions } from "vuex";
  import ListQuestionsRaw from "./shared/components/ListQuestionsRaw";
  import AdminWhatever from "./admin/Whatever";
  import UserWhatever from "./user/Whatever";
  export default {
    data() {
      return {
        list: null
      }
    },
    computed: {
      ...mapGetters({
        isAdmin:        "isAdmin",
        lists:          "lists"
      }),
      ...mapActions({
        fetchLists:     "fetchLists"
      }),
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
    created() {
      this.fetchData()
    }
  }
</script>


<!--scoped - means no affect to other components (classes or ids)-->
<!--write your custom css here-->
<style scoped>

</style>
