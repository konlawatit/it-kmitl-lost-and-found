<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="mt-3" href="">
          <img src="./lost 2.png" width="250" height="28" />
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a>สมัครสมาชิก</a>
          </div>
          <div class="navbar-item">
            <a>เข้าสู่ระบบ</a>
          </div>
          <div class="navbar-item">
            <span class="icon is-large is-left mt-2" id="iconcolor">
              <i class="fas fa-user fa-xs"></i>
            </span>
          </div>
        </div>
      </div>
    </nav>
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
      id="navbarsearch"
    >
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item" id="navbaritem">
            <a>หน้าหลัก</a>
          </div>
          <div class="navbar-item" id="navbaritem">
            <a>โพสต์ของฉัน</a>
          </div>
          <div class="navbar-item" id="navbaritem">
            <a>จัดอันดับ</a>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="control has-icons-right">
              <input class="input is-small" type="email" placeholder="ค้นหา" />
              <span class="icon is-small is-right">
                <i class="fas fa-search"></i>
              </span>
            </div>
          </div>
          <div class="navbar-item">
            <button class="button is-primary is-normal is-focused">
              <i class="fas fa-pen">
                <span> เขียนโพสต์</span>
              </i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
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
a {
  font-family: "Kanit", sans-serif;
  color: white;
  font-size: 1.3rem;
}
nav {
  background-color: #0f3057;
  width: 100%;
  position: fixed;
}
#iconcolor {
  background-color: #e7e7de;
  border-radius: 40px;
  font-size: 2rem;
}
#navbarsearch {
  margin-top: 5.8rem;
  background-color: #234772;
}
#navbaritem {
  margin-left: 5rem;
}
input {
  width: 20rem;
  margin-left: 9rem;
}
button {
  font-family: "Kanit", sans-serif;
  width: 10rem;
}
</style>
