<template>
  <div>
<!--    <user-card v-bind:profile="profile"></user-card>-->
  </div>

</template>

<script>
  // import UserCard from './components/UserCard.vue'
  import { mapGetters } from 'vuex';

  export default {
    name: "Profile",
    // components: {
    //   userCard: UserCard
    // },
    computed: {
      ...mapGetters({
        profile: 'profile'
      }),
    }
  }
</script>
