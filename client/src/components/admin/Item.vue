<template>
  <div>
    <div class="columns mt-6 ml-6" id="boxitem">
      <div class="column is-12 p-5 has-text-centered">
        <v-btn depressed color="light-blue darken-4" class="button mt-6 white--text"
          >เพิ่มประเภทสิ่งของ</v-btn
        >
        <v-btn depressed color="light-blue darken-4" class="button mt-6 white--text"
          >โพสต์ทั้งหมด</v-btn
        >
        <v-btn depressed color="light-blue darken-4" class="button mt-6 white--text"
          >รายชื่อผู้ใช้งาน</v-btn
        >
        <v-btn depressed color="light-blue darken-4" class="button mt-6 mb-6 white--text"
          >รายชื่อผู้ถูกระงับ</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "item",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boxitem {
  border-radius: 1rem;
  font-family: "Kanit", sans-serif;
  background: rgb(187, 186, 186);
}
button {
  font-family: "Kanit", sans-serif;
  width: 100%;
}
</style>
