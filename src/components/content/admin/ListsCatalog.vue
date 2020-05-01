<template>
  <div class="lists-catalog-container">

    <!--header-->
    <div class="lists-catalog-header">
      <span class="material-icons ml-2">
      reorder
      </span>
      <p>Lister</p>
    </div>

    <div class="lists-catalog-row-wrapper container-fluid">
      <div v-if="noLists">
        Ingen lister enda.
      </div>
      <div v-else class="row">
        <!--<ListsCatalogRow v-for="listQ in lists" v-bind:list="listQ" v-bind:key="listQ.id"></ListsCatalogRow>-->

        <!-- WORK_IN_PROGRESS lists -->
        <div class="list-row-wrapper wip-lists col-4">
          <h4>Ikke levert <span>{{WIPLists.length}}</span></h4>
          <ListsCatalogRow  v-for="listQ in WIPLists" v-bind:list="listQ" v-bind:key="listQ.id"></ListsCatalogRow>
          <div v-if="WIPLists <= 0" class="no-lists-message">
            <h5>Ingen lister her.</h5>
          </div>
        </div>

        <!-- UNDER_REVIEW lists -->
        <div class="list-row-wrapper d-lists col-4">
          <h4>Klar for feedback <span>{{URLists.length}}</span></h4>
          <ListsCatalogRow  v-for="listQ in URLists" v-bind:list="listQ" v-bind:key="listQ.id"></ListsCatalogRow>
          <div v-if="URLists <= 0" class="no-lists-message">
            <h5>Ingen lister her.</h5>
          </div>
        </div>

        <!-- DELIVERED lists -->
        <div class="list-row-wrapper d-lists col-4">
          <h4>Ferdig <span>{{DLists.length}}</span></h4>
          <ListsCatalogRow  v-for="listQ in DLists" v-bind:list="listQ" v-bind:key="listQ.id"></ListsCatalogRow>
          <div v-if="DLists <= 0" class="no-lists-message">
            <h5>Ingen lister her.</h5>
          </div>
        </div>

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
      },
      WIPLists: function() {
        let relevantLists = this.getListByState("WORK_IN_PROGRESS");
        return this.sortByDate(relevantLists);
      },
      DLists: function() {
        let relevantLists = this.getListByState("DELIVERED");
        return relevantLists.reverse();
      },
      URLists: function() {
        let relevantLists = this.getListByState("UNDER_REVIEW");
        return relevantLists;
      },
    },
    methods: {
      fetchData() {
        this.$store.dispatch("fetchLists");
      },
      getListByState(state) {
        let relevantLists = this.lists.filter(function(list) {
          return list.state === state
        })
        return relevantLists;
      },
      sortByDate(lists) {
        // Sort by shortest deadline
        let sortedLists = lists.sort(function(a, b) {
          a = new Date(a.deadline);
          b = new Date(b.deadline);
          return a>b ? 1 : a<b ? -1 : 0;
        });
        return sortedLists;
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
  .lists-catalog-header {
    color: #fff;
    background-color: #3d3d3d;
    height: 4em;
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    z-index: 2;
    top: 0;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  .lists-catalog-header p {
    font-size: large;
    margin: auto auto auto 10px;
  }
  .lists-catalog-row-wrapper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 95%;
    margin: auto;
    margin-top: 6em;
  }

  h4 {
    font-weight: 300;
    margin-bottom: 1em;
  }

  h4 span {
    color: #FFB800;
    font-weight: 500;
  }
</style>
