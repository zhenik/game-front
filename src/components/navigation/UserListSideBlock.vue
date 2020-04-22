<template>
  <div class="lists-component">


    <button
        v-if="!isCurrentListPresent"
        class="btn btn-success custom-btn-update"
        v-on:click="fetchLastWIPList"
    >
      <i aria-hidden="true" class="material-icons">refresh</i>
      Hent liste</button>

    <!--deadline block-->
    <div v-if="!checkIfNoList()" class="deadline">
      <h2>{{deadlineDelta()}}</h2>
      <div class="deadline-countdown">
        <h5>dager til innleveringsfrist</h5>
        <h6>({{timeStampConverter(this.currentList.deadline)}})</h6>
      </div>
    </div>

    <div v-if="checkIfNoList()">
      <p class="sidebar-message">Klikk på knappen for å sjekke om du har noen lister. Hvis ikke, sjekk igjen senere.</p>
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
      },
      timeStampConverter(dateIn){
        const d = new Date(dateIn);
        const months = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des'];
        const year = d.getFullYear();
        const month = months[d.getMonth()];
        const date = d.getDate();
        const hour = d.getHours();
        const min = d.getMinutes();

        let minChecked = '';
        if(min < 10){
          minChecked = '0' + min;
        }else minChecked = min;

        const time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + minChecked;
        return time;
      },
    }
  }
</script>

<style scoped>
  .sidebar-message {
    font-size: 0.8em;
    font-style: italic;
    opacity: 0.6;
    text-align: center;
    margin: 1em;
  }
  .custom-btn-update {
    width: 60%;
    margin: auto;
    margin-top: 1em;
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
    font-weight: 400;
  }
  .deadline-countdown {
    display: block;
    float: right;
    color: #f7b406;
  }
  .deadline-countdown h5 {
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 400;
  }
  .deadline-countdown h6 {
    font-size: 0.6em;
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
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
