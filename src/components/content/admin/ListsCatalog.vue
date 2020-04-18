<template>
  <div class="lists-catalog-container">

    <!--header-->
    <div class="lists-catalog-header">
      <p>Lists</p>
    </div>

    <div class="lists-catalog-row-wrapper">
      <div v-if="noLists">
        No lists yet.
      </div>
      <div v-else class="list-group">
        <ListsCatalogRow v-for="listQ in lists" v-bind:list="listQ" v-bind:key="listQ.id"></ListsCatalogRow>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import ListsRow from "./ListsRow";

  export default {
    name: "ListsCatalog",
    computed: {
      ...mapGetters(["gamefication", "lists"]),
      noLists() {
        return (this.lists == null || this.lists === 'undefined' || this.lists.length === 0);
      }
    },
    methods: {
      fetchData() {
        this.$store.dispatch("fetchLists");
      }
    },
    mounted() {
      this.fetchData()
    },
    components:{
      ListsCatalogRow: ListsRow
    }
  }
</script>

<style scoped>
  .lists-catalog-container {
    margin-left: 1px;
  }
  .lists-catalog-header {
    color: #fff;
    background-color: #3d3d3d;
    height: 4em;
    display: flex;
    align-items: center;
  }
  .lists-catalog-header p {
    font-size: large;
    margin: auto auto auto 10px;
  }


  .lists-catalog-row-wrapper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: auto;
  }

</style>
