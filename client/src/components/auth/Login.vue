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
          <button @click="onSignIn()" class="button is-rounded">Login</button>
        </p>
      </div>
    </div>
    <div class="columns is-centered mt-4">
      <div class="field">
        <p class="control">
          <GoogleLogin
            :renderParams="renderParams"
            :params="params"
            :onSuccess="onSuccess"
            :onFailure="onFailure"
            >Google Login</GoogleLogin
          >
        </p>
      </div>
    </div>
    <div class="columns is-centered mt-4">
      <div class="field">
        <p class="control">
          <button @click="onSignOut()" class="button is-rounded">Logout</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import AuthService from "../../service/AuthService";

export default {
  name: "Login",
  data() {
    return {
      params: {
        client_id:
          "869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    async onSignOut() {
      await window.gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => console.log("Disconnected"));
    },
    async onSuccess(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      let profile = googleUser.getBasicProfile();
      let email = profile.nt;
      if (email.split("@")[1] !== "it.kmitl.ac.th") {
        this.onSignOut();
      } else {
        await AuthService.login(googleUser.getAuthResponse().id_token).then((result) => {
            console.log(result);
          }
        );
      }
    },
    onFailure() {
      alert("Login Fail");
      this.onSignOut();
    },
  },
  components: {
    GoogleLogin,
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
