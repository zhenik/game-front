<template>
  <div class="list-container">
    <!--header-->
    <div class="list-header">
      <p>State {{currentList.state}}</p>

      <div class="list-header-description">
        <small>assigned: {{currentList.assignedToEmail}} </small>
        <small>assigned date: {{currentList.assignedDate}} </small>
        <small>deadline: {{currentList.deadline}} </small>
      </div>

      <div v-if="currentList.state === 'UNDER_REVIEW'">
        <button type="button"
                class="btn btn-warning btn-lg"
                data-toggle="modal"
                data-target="#review-update-modal"
                v-on:click="saveListUserReview"
        >Save review</button>
        <button type="button"
                class="btn btn-primary btn-lg"
                data-toggle="modal"
                data-target="#review-deliver-modal"
        >Finish review</button>
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
          Listet lagret
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
            <h5 class="modal-title" id="exampleModalLongTitle">Finish review</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Would you like to finish review?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Back to edit</button>
            <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="finishListUserReview"
            >Yes</button>
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
      }
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
  }
  .list-header p {
    font-size: large;
    margin: auto 1em auto 1em;
  }

  .list-header-description {
    margin: 1em;
    display: flex;
    flex-direction: column;
  }

  .list-segments-wrapper {
    margin-top: 1em;
  }
</style>
