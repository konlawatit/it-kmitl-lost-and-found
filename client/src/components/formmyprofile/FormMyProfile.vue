<template>
  <div class="columns mt-6" id="text">
    <div class="column is-2"></div>
    <div class="column is-4">
      <v-avatar color="primary" size="350" class="mt-6 ml-6"
        ><img :src="store.getters['auth/getImage']" alt="profile"
      /></v-avatar>
    </div>
    <div class="column is-6 is-size-2 mt-6 ml-6">
      <h2 class="is-size-3 mb-4">
        <strong id="text1">ชื่อ : </strong>
        <strong id="text2">{{ store.getters["auth/getfname"] }}</strong>
      </h2>
      <h2 class="is-size-3 mb-4">
        <strong id="text1">นามสกุล : </strong>
        <strong id="text2">{{ store.getters["auth/getlname"] }}</strong>
      </h2>
      <h2 class="is-size-3 mb-4">
        <strong id="text1">วันเกิด : </strong>
        <strong id="text2">{{ store.getters["auth/getBirthday"] }}</strong>
      </h2>
      <h2 class="is-size-3 mb-4">
        <strong id="text1">E-mail : </strong>
        <strong id="text2">{{ store.getters["auth/getEmail"] }}</strong>
      </h2>
      <h2 class="is-size-3 mb-4">
        <strong id="text1">ติดต่อ : </strong>
        <strong id="text2">{{ store.getters["auth/getPhone_number"] }}</strong>
      </h2>
      <h2 class="is-size-3 mb-4">
        <strong id="text1">แต้มบุญ : </strong>
        <strong id="text2">{{ store.getters["auth/getMerit"] }}</strong>
      </h2>
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
#text {
  font-family: "Kanit", sans-serif;
}
#text1 {
  color: black;
}
#text2 {
  color: #00878f;
}
</style>
