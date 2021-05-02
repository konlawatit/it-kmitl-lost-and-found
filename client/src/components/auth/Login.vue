<template>
  <div class="container">
    <div class="columns is-centered mt-4 is-mobile">
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
    <h2 class="is-size-3 mt-3" id="text1">
      <strong>บุคลากร</strong>
      <strong id="text2">ภายนอก</strong>
    </h2>
    <div class="columns is-centered">
      <div class="field column is-4">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input is-medium mt-4"
            type="text"
            placeholder="  ชื่อผู้ใช้งาน"
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
            class="input is-medium"
            type="password"
            placeholder="  รหัสผ่าน"
          />
          <span class="icon is-small is-left" id="iconcolor">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="columns is-centered mt-4 is-mobile">
      <div class="field">
        <p class="control">
          <button @click="onSignIn()" class="button is-rounded">
            เข้าสู่ระบบ
          </button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-rounded ml-6" @click="redirect('register')">
            สมัครสมาชิก
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import AuthService from "../../service/AuthService";
import store from "../../store/index.js";

export default {
  name: "Login",
  data() {
    return {
      store,
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
      store.dispatch("auth/clearProfile");
      await window.gapi.auth2
        .getAuthInstance()
        .signOut()
        .then(() => console.log("Disconnected"));
    },
    async onSuccess(googleUser) {
      // This only gets the user information: id, name, imageUrl and email
      //let profile = await googleUser.getBasicProfile();
      //let email = profile.getEmail();
      // if (email.split("@")[1] == "gm") { //ค่อยกลับมาแก้
      //   this.$swal.fire({
      //     icon: "error",
      //     title: "ไม่สามารถเข้าระบบได้",
      //     text: "กรุณาใช้ Email ของ IT KMITL ในการเข้าใช้งาน!",
      //   });
      //   this.onSignOut();
      // } 
      //else {
        await AuthService.login(googleUser.getAuthResponse().id_token).then(
          (result) => {
            if (result.statusCode == "200" && result.new_user) {
              console.log('new user')
              store.dispatch("auth/setProfile", {
                fullname: result.data.user_name,
                fname: result.data.fname,
                lname: result.data.lname,
                email: result.data.email,
                image: result.data.image,
                id: "",
                isSigned: true,
              });
              this.redirect("login/confirm");
            } else if (result.statusCode == "200") {
              store.dispatch("auth/setProfile", {
                fullname: result.data.user_name,
                fname: result.data.fname,
                lname: result.data.lname,
                email: result.data.email,
                image: result.data.image,
                id: result.data.user_id,
                role: result.data.role,
                type: result.data.type,
                phone_number: result.data.phone_number,
                birthday: result.data.birthday,
                isSigned: true,
              });
              this.redirect("home");
            } else if (result.statusCode == "400") {
              this.$swal.fire({
                icon: "error",
                title: "ไม่สามารถเข้าระบบได้",
                text: "กรุณาลองใหม่อีกครั้ง",
              });
              this.onSignOut();
            } else {
              this.$swal.fire({
                icon: "error",
                title: "ระบบผิดพลาด",
                text: "กรุณาลองใหม่อีกครั้ง",
              });
            }
          }
        );
      //}
    },
    onFailure() {
      //   alert("Login Fail");
      //   this.onSignOut();
      console.log("google alert fail");
    },
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
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
#text1 {
  font-family: "Kanit", sans-serif;
  color: black;
}
#text2 {
  font-family: "Kanit", sans-serif;
  color: #00878f;
}
h1,
h2 {
  text-align: center;
  text-shadow: 1px 1.5px 3px #000000;
}
</style>
