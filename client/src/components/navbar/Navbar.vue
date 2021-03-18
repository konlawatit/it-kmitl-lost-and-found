<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="mt-3" href="">
      <img src="./lost 2.png" width="190">
    </a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" id="menu">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
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
        <span class="icon is-large mr-4" id="iconcolor">
            <i class="fas fa-user"></i>
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
  font-size: 1.1rem;
}
nav{
  background-color: #0f3057;
  width: 100%;
}
#iconcolor{
  background-color: #E7E7DE;
  border-radius: 40px;
  font-size: 2rem;
}
a:hover{
  color: gray;
  transition-duration: 0.2s;
}
#menu{
  margin-top: 0.5rem;
}
</style>
