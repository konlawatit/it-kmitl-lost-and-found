<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="mt-3" href="">
      <img src="./lost 2.png" width="250" height="28">
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
          <a>สมัครสมาชิก</a>
      </div>
      <div class="navbar-item">
        <a>เข้าสู่ระบบ </a>
      </div>
      <div class="navbar-item">
        <span class="icon is-large is-left mt-2" id="iconcolor">
            <i class="fas fa-user fa-xs"></i>
        </span>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  font-family: "Kanit", sans-serif;
  color: white;
  font-size: 1.3rem;
}
nav{
  background-color: #0f3057;
}
#iconcolor{
  background-color: #E7E7DE;
  border-radius: 40px;
  font-size: 2rem;
}
</style>
