<template>
  <div class="register">
    <Navbar></Navbar>
    <h1 class="is-size-1 mt-3" id="text1">
      <strong>ยืนยัน</strong>
      <strong id="text2">สมาชิก</strong>
    </h1>
    <div class="columns mt-3 mb-6">
        <div class="column is-2"></div>
        <div class="column is-8" id="bodylogin">
            <Confirm></Confirm>
        </div>
        <div class="column is-2"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../../components/navbar/Navbar";
import Confirm from "../../components/auth/Confirm";
export default {
  name: "Confirm-user",
  components: {
    Navbar,
    Confirm
  },
};
</script>
<style scoped>
#text1 {
  font-family: "Kanit", sans-serif;
  color: black;
}
#text2 {
  font-family: "Kanit", sans-serif;
  color: #00878f;
}
h1{
    text-align: center;
    text-shadow: 1px 1.5px 3px #000000;
}
#bodylogin{
    background: #0f3057;
    padding:3rem;
    border-radius: 1.5rem;
}
</style>
