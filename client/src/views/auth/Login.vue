<template>
  <div>
    <Navbar></Navbar>
    <h1 class="is-size-1 mt-6" id="text1">
      <strong>เข้าสู่</strong>
      <strong id="text2">ระบบ</strong>
    </h1>
    <h2 class="is-size-3 mt-3" id="text1">
      <strong>นักศึกษาและ</strong>
      <strong id="text2">บุคลากร IT</strong>
    </h2>
    <Login></Login>
  </div>
</template>

<script>
import Login from '../../components/auth/Login.vue';
import Navbar from '../../components/navbar/Navbar.vue';
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "login",
  components: {Login, Navbar},
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
h1, h2{
  text-align: center;
  text-shadow: 1px 1.5px 3px #000000;
}
</style>
