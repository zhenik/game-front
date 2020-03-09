<template>
  <div>
    <h3 v-if="isAdmin">Edit list</h3>
    <h2>List element</h2>
    {{ currentList }}

    <div class="le-questions-container">
      <list-element-segment
          v-for="segment in currentList.segments"
          v-bind:segment="segment"
          :key="segment.id"
      ></list-element-segment>
    </div>

<!--  ADMIN group buttons  -->
    <div v-if="isAdmin" class="le-button-group" >
      <button type="button"
              class="btn btn-primary btn-lg"
              data-toggle="modal"
              data-target=".bd-example-modal-sm"
      >Save</button>
      <button type="button" class="btn btn-info btn-lg">Export</button>
      <button type="button"
              class="btn btn-danger btn-lg"
      >Cancel</button>
      <button type="button"
              class="btn btn-success btn-lg"
      >Confirm</button>
    </div>
    <!--  USER group buttons  -->
    <div v-else class="le-button-group" >
      <button type="button"
              class="btn btn-primary btn-lg"
              data-toggle="modal"
              data-target="#list-update-modal"
              :disabled="checkDisabled"
              v-on:click="saveListUserReview"
      >Save</button>
      <button type="button" class="btn btn-info btn-lg">Export</button>
      <button type="button"
              class="btn btn-warning btn-lg"
              data-toggle="modal"
              data-target="#list-deliver-modal"
              :disabled="checkDisabled"
      >Deliver</button>
    </div>




    <!-- modal: save list -->
    <div>
      <div class="modal fade bd-example-modal-sm" id="list-update-modal" tabindex="-1" role="dialog" aria-labelledby="listUpdateModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            List updated
          </div>
        </div>
      </div>
    </div>

    <!-- modal: deliver list -->
    <div class="modal fade" id="list-deliver-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Delivery</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Deliver list ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Back to edit</button>
            <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="deliverListUserReview"
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
  import ListElementSegment from './ListElementSegment'

  export default {
    name: "ListElement",
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
      ...mapGetters(["currentList", "isAdmin"]),
      checkDisabled () {
        if (this.isAdmin) {
          return false
        } else {
          const dis = 'WORK_IN_PROGRESS' !== this.currentList.state
          return dis
        }
      },
    },
    methods: {
      saveListUserReview() {
        this.$store.dispatch("updateList");
      },
      deliverListUserReview() {
        this.$store.dispatch("deliverList");
      }
    },
    components: {
      listElementSegment: ListElementSegment
    }
  }
</script>
