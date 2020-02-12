<template>
  <div>
    <h2>Profile</h2>
    <div class="text-md-center" v-if="user">
      <h1 class="green--text">Login Success</h1>
      <h3 class="headline mb-0"><b class="red--text">Name :</b> {{ user.name }}</h3>
      <h3 class="headline mb-0"><b class="red--text">Name :</b> {{ role }}</h3>
      <h4 class="headline mb-0"><b class="red--text">Email :</b> {{ user.email }}</h4>
      <p class="headline mb-0"><b class="red--text">Email :</b> {{ user }}</p>
    </div>
  </div>

</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.getters.user
      },
      role() {
        return this.$store.getters.userRole
      }
    }
  }
</script>
