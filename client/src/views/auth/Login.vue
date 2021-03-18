<template>
  <div>
    <Navbar></Navbar>
    <h1 class="is-size-1 pt-6" id="text1">
      เข้าสู่<span id="text2">ระบบ</span>
    </h1>
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
h1{
  text-align: center;
}
</style>
