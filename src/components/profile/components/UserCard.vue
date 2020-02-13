<template>
  <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
    <div class="card-header">{{profile.role}}</div>
    <div class="card-body">
      <h5 class="card-title">{{profile.user.email}}</h5>
      <p class="card-text">Options for current role</p>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['profile']
  }
</script>

