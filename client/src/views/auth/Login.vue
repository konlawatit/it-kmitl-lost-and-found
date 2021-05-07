<template>
  <div>
    <Navbar></Navbar>
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
