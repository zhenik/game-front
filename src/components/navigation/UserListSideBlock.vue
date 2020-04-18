<template>
  <div class="lists-component">


    <button
        v-if="!isCurrentListPresent"
        class="btn btn-success custom-btn-update"
        v-on:click="fetchLastWIPList"
    >
      <i aria-hidden="true" class="material-icons">refresh</i>
      Refresh</button>

    <!--deadline block-->
    <div v-if="!checkIfNoList()" class="deadline">
      <h2>{{deadlineDelta()}}</h2>
      <div class="deadline-countdown">
        <h5>dager til innleveringsfrist</h5>
        <h6>{{this.currentList.deadline}}</h6>
      </div>
    </div>

    <div v-if="checkIfNoList()">
      Sorry there is no list assigned to you
    </div>
    <div v-else>
      <!--segments block-->
      <div>
        <segment
            v-for="segment in currentList.segments"
            v-bind:segment="segment"
            :key="segment.id"
        ></segment>
      </div>
    </div>

  </div>
</template>

<script>
  import Segment from "./Segment.vue"
  import {mapGetters} from "vuex";

  export default {
    name: 'UserListSideBlock',
    props: {
      currentList: {
        type: Object,
        required: true
      }
    },
    components: {
      Segment
    },
    computed: {
      ...mapGetters(["isCurrentListPresent"]),
    },
    methods: {
      saveListUserReview() {
        this.$store.dispatch("updateList");
      },
      deliverListUserReview() {
        this.$store.dispatch("deliverList").then(()=> {
          this.$store.dispatch("currentListResetState");
          this.$router.push('/');
        });
        //todo: fix dispatch
      },
      fetchLastWIPList() {
        this.$store.dispatch("fetchLatestWIPList"); // last wip list
        this.$store.dispatch('fetchUserAnalytics'); // analytics
      },
      checkIfNoList() {
        if (this.currentList == null) return true;
        let id = this.currentList.id;
        return (id === '')
      },
      deadlineDelta() {
        const deadline = new Date(this.currentList.deadline).getTime();
        const now = new Date().getTime();
        const days = Math.round((deadline - now) / (1000*60*60*24));
        return days;
      }
    }
  }
</script>

<style scoped>
  .custom-btn-update {
    width: 100%;
  }
  .deadline {
    display: flex;
    flex-direction: row;
    margin: 20px;
    align-items: center;
  }

  .deadline h2 {
    color: #f7b406;
    float: left;
    margin-right: 10px;
  }

  .deadline-countdown {
    display: block;
    float: right;
    color: #f7b406;
  }
  .deadline-countdown h5 {
    font-size: 0.8em;
  }
  .deadline-countdown h6 {
    font-size: 0.6em;
  }

  .lists-component {
    background-color: #3c3c3c;
  }

  /*remove router-link decoration*/
  a {
    text-decoration: none;
  }

  .lists-component button {
    color: inherit;
    border-radius: 4px;
    text-align: center;
    /*background: rgba(10,61,194,.8);*/
    text-decoration: none;
    font-size: 1rem;
    padding: 8px 8px;
    display: block;
  }


  .lists-component button i {
    vertical-align: middle;
    margin: auto 1em auto auto;
    line-height: inherit;
  }

</style>
