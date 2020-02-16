<template>
  <div class="dashboard">
    <h2>This is dashboard</h2>
<!--    <div v-if="isAdmin"></div>-->
    <admin-dashboard v-if="isAdmin"></admin-dashboard>
    <user-dashboard v-else></user-dashboard>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import AdminDashboard from "./admin/index"
  import UserDashboard from "./user/index"

  export default {
    computed: {
      ...mapGetters({
        profile: "profile",
        isAdmin: "isAdmin"
      }),
    },
    components: {
      userDashboard: UserDashboard,
      adminDashboard: AdminDashboard
    },
  }
</script>
