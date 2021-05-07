<template>
  <div class="container">
    <div class="columns">
      <div class="column is-3"></div>
      <div class="column is-6" style="background: #2568ba; margin-top: 7rem; border-radius: 1rem;  box-shadow: 8px 10px gray">
        <h1 class="is-size-1 mt-6" id="text1">
          <strong>เข้าสู่</strong>
          <strong id="text2">ระบบ</strong>
        </h1>
        <h1 class="is-size-3 mt-6" id="text1">
          <strong>นักศึกษาและ</strong>
          <strong id="text2">บุคลากร IT</strong>
        </h1>
        <br />
        <div class="columns is-centered mt-2 mb-6 is-mobile">
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
      </div>
      <div class="column is-3"></div>
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
      // if (email.split("@")[1] == "it.kmitl.ac.th") { //ค่อยกลับมาแก้
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
          console.log(result)
          if (result.statusText == 'Unauthorized') {
            console.log('banned')
            this.onSignOut();
            this.$swal.fire({
                  icon: "error",
                  title: "บัญชีของคุณถูกระงับการใช้งาน",
                  text: "กรุณาลองติดต่อผู้ดูแลระบบ",
                });
          } else {
            //if (result.it_kmitl) {

              if (result.statusCode == "200" && result.new_user) {
                console.log("new user");
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
                this.onSignOut();
                this.$swal.fire({
                  icon: "error",
                  title: "ระบบผิดพลาด",
                  text: "กรุณาลองใหม่อีกครั้ง",
                });
              }
            // } else{
            //   this.onSignOut();
            //   this.$swal.fire({
            //     icon: "error",
            //     title: "ไม่สามารถเข้าระบบได้",
            //     text: "กรุณาใช้ Email ของ IT KMITL ในการเข้าใช้งาน!",
            //   });
            // }
          }
        }
      ).catch(() => {
        this.onSignOut();
        this.$swal.fire({
                  icon: "error",
                  title: "ระบบผิดพลาด",
                  text: "กรุณาลองใหม่อีกครั้ง",
                });
      });
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
  color: rgb(68, 68, 68);
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
