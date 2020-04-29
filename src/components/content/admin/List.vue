<template>
  <div class="list-container">
    <!--header-->
    <div class="list-header">
      <div class="list-subheader">
      <small>Status:</small>
      <p v-if="currentList.state === 'UNDER_REVIEW'" :style="{'color':'#ffffff'}">Klar for feedback</p>
      <p v-if="currentList.state === 'WORK_IN_PROGRESS'" :style="{'color':'#FA5C20'}">Ikke levert</p>
      <p v-if="currentList.state === 'DELIVERED'" :style="{'color': '#26FF6F'}">Ferdig</p>
      </div>

      <div class="list-header-description">
        <small class="list-header-user">{{currentList.assignedToEmail}} </small>
        <div>
        <small>Utlevert: {{timeStampConverter(currentList.assignedDate)}} </small>
        <small>Innleveringsfrist: {{timeStampConverter(currentList.deadline)}} </small>
        <small v-if="currentList.state === 'DELIVERED'">Ferdig: {{timeStampConverter(currentList.updatedAt)}} </small>
        <small v-if="currentList.state === 'UNDER_REVIEW'">Endret: {{timeStampConverter(currentList.updatedAt)}} </small>
        </div>
      </div>

      <div v-if="currentList.state === 'UNDER_REVIEW'" class="action-btns">
        <button type="button"
                class="btn btn-warning btn-lg"
                data-toggle="modal"
                data-target="#review-update-modal"
                v-on:click="saveListUserReview"
        >Lagre</button>
        <button type="button"
                class="btn btn-primary btn-lg"
                data-toggle="modal"
                data-target="#review-deliver-modal"
        >Ferdig</button>
      </div>
    </div>


    <div class="list-segments-wrapper">
      <SegmentQuestions
          v-for="segment in currentList.segments"
          v-bind:slug="currentList.id"
          v-bind:segment="segment"
          v-bind:key="segment.id">
      </SegmentQuestions>
    </div>

    <!-- modal: save review -->
    <div class="modal fade bd-example-modal-sm"
         id="review-update-modal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="listUpdateModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
          Lista er lagret. Du kan komme tilbake og jobbe på den senere.
        </div>
      </div>
    </div>

    <!-- modal: finish review -->
    <div class="modal fade"
         id="review-deliver-modal"
         tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Godkjenn liste</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Er du ferdig med feedback? Du kan ikke angre denne handlingen.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Avbryt</button>
            <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="finishListUserReview"
            >Ferdig</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import { store } from "@/store";
  import SegmentQuestions from "../SegmentQuestions";
  import ListsCatalog from "./ListsCatalog";
  import AuthGuardAdmin from "../../../router/auth-guard-admin";

  export default {
    name: "List",
    props: {
      slug: {
        type: String,
        required: true
      },
    },
    async beforeRouteUpdate(to, from, next) {
      await store.dispatch("currentListResetState");
      return next();
    },
    async beforeRouteEnter(to, from, next) {
      await store.dispatch('fetchCurrentList', to.params.slug)
      next();
    },
    async beforeRouteLeave(to, from, next) {
      await store.dispatch("currentListResetState");
      next();
    },
    computed: {
      ...mapGetters(["currentList"]),
    },
    methods: {
      saveListUserReview() {
        this.$store.dispatch("updateList");
      },
      finishListUserReview() {
        this.$store.dispatch("finishReview");
        this.$router.push({
          name: 'Lists',
          path: '/lists',
          component: ListsCatalog,
          beforeEnter: AuthGuardAdmin
        },)
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
    },
    components: {
      SegmentQuestions
    }
  }
</script>

<style scoped>

  .list-container {
    margin-left: 1px;
  }
  .list-header {
    color: #fff;
    background-color: #3d3d3d;
    display: flex;
    flex-direction: revert;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
  .list-header p {
    font-size: large;
    margin: auto 1em auto 1em;
  }

  .list-subheader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1em;
  }

  .list-subheader small {
    font-style: italic;
    opacity: 0.6;
  }

  .list-subheader p {
    margin: 0;
    font-weight: 500;
  }

  .list-header-description {
    margin: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    opacity: 0.8;
  }

  .list-header-description * {
    margin-left: 3em;
    display: flex;
    flex-direction: column;
  }

  .list-header-user {
    font-size: 1em;
  }

  .list-segments-wrapper {
    margin-top: 1em;
    padding-top: 4em;
  }

  .action-btns {
    display: flex;
    flex-direction: row;
    margin: 1.5em;
  }

  .action-btns button {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 1em;
    font-weight: 300;
    font-size: 1em;
  }
  .action-btns button:hover {
    color: rgba(255, 255, 255, 1);
  }
  .modal-content {
    color: white;
    background-color: rgba(0, 0, 0, 0.95);
    border-radius: 4px;
    padding: 2em;
    width: 100%;
  }

  .modal {
    text-align: center;
  }

  .modal-body {
    text-align: left;
  }
</style>
