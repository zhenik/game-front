<template>
  <div>
    <h3 v-if="isAdmin">Edit list</h3>
    <h2>List element</h2>
    {{ this.getCurrentList }}
  </div>

</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import { store } from "@/store";

  export default {
    props: {
      slug: {
        type: String,
        required: true
      },
    },
    beforeRouteEnter(to, from, next) {
      Promise.all([
        store.dispatch('fetchCurrentList', to.params.slug),
      ]).then(() => {
        next();
      });
    },
    beforeRouteLeave(to, from, next) {
      Promise.all([
        this.cleanCurrentList
      ]).then(() => {
        next();
      });
    },
    computed: {
      ...mapGetters(["getCurrentList", "isAdmin"]),
      ...mapActions(["cleanCurrentList"])
    },
  }
</script>
