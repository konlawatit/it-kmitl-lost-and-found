<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="field column is-4">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input is-medium mt-4"
            type="text"
            placeholder="  ชื่อผู้ใช้"
          />
          <span class="icon is-small is-left mt-4" id="iconcolor">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="field column is-4">
        <p class="control has-icons-left">
          <input
            class="input is-medium mt-4"
            type="password"
            placeholder="  Password"
          />
          <span class="icon is-small is-left mt-4" id="iconcolor">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="columns is-centered mt-4">
      <div class="field">
        <p class="control">
          <button class="button is-rounded">Login</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
#iconcolor {
  background-color: #61cbd2;
  color: white;
  border-radius: 10px 0px 0px 10px;
}
input {
  border-radius: 10px;
}
button {
  background-color: #61cbd2;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  transition-duration: 0.4s;
  cursor: pointer;
  width: 10rem;
  font-family: "Kanit", sans-serif;
}
</style>
