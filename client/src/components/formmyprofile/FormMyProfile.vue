<template>
  <div class="columns mt-6">
    <div class="column is-2"></div>
    <div class="column is-4">
        <v-avatar color="primary" size="350" class="mt-6"><img :src="store.getters['auth/getImage']" alt="profile" /></v-avatar>
    </div>
    <div class="column is-3">
        {{ store.getters["auth/getFullName"] }}
    </div>
  </div>
</template>

<script>
import store from "../../store/index.js";
export default {
  name: "formCreatePost",
  data() {
    return {
      store,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
