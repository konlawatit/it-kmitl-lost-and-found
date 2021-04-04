<template>
  <div class="columns">
    <div class="column is-12 p-6">
      <div class="is-flex is-justify-content-center">
        <template>
          <v-avatar color="black" size="100">
            <img :src="profileImage" alt="John" />
          </v-avatar>
        </template>
      </div>
      <div class="is-flex is-justify-content-center mt-5">
        <div style="width: 300px">
          <!-- <input type="file" ref="file" @change="test"> -->
          <v-file-input
            label="Change image"
            filled
            prepend-icon="mdi-image"
            type="file"
            @change="selectImage"
          ></v-file-input>
        </div>
      </div>
      <div class="is-flex is-justify-content-center">
        <v-select
          size="20"
          v-model="type"
          :items="itemstype"
          :rules="typeRules"
          label="type"
        ></v-select>
      </div>

      <div class="columns">
        <!-- <input type="file" ref="file" @change="selectImage" /> -->
        <div class="column">
          <v-text-field
            :counter="255"
            label="Name"
            v-model="name"
            maxlength="255"
            required
          >
          </v-text-field>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <v-text-field
            v-model="firstname"
            :counter="255"
            :rules="firstnameRules"
            label="First name"
            required
            maxlength="255"
          ></v-text-field>
        </div>
        <div class="column is-6">
          <v-text-field
            v-model="lastname"
            :counter="255"
            :rules="lastnameRules"
            label="Last name"
            required
            maxlength="255"
          ></v-text-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <v-text-field
            v-model="phone"
            :counter="10"
            label="Phone number"
            required
            maxlength="10"
          ></v-text-field>
        </div>
        <div class="column">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="birthday"
                label="Birthday date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="birthday"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </div>
      </div>
      <div class="columns is-centered mt-3">
        <button class="button is-rounded" @click="onSave()">ยืนยัน</button>
        <button class="button is-rounded is-danger ml-6" @click="cancel()">
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index.js";
//import axios from "axios";
import AuthService from "../../service/AuthService";
export default {
  name: "Confirm",
  data() {
    return {
      store,
      valid: true,
      name: store.getters["auth/getFullName"],
      firstname: store.getters["auth/getfname"],
      firstnameRules: [
        (v) => !!v || "First name is required",
        (v) =>
          (v && v.length <= 255) ||
          "First name must be less than 255 characters",
      ],
      lastname: store.getters["auth/getlname"],
      lastnameRules: [
        (v) => !!v || "Last name is required",
        (v) =>
          (v && v.length <= 255) ||
          "Last name must be less than 255 characters",
      ],
      show1: false,
      show2: false,
      birthday: null,
      menu: false,
      type: "",
      typeRules: [(v) => !!v || "type is required"],
      itemstype: ["student", "personnel"],
      phone: "",
      profileImage: store.getters["auth/getImage"],
      saveImage: store.getters["auth/getImage"],
    };
  },
  methods: {
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    cancel() {
      this.onSignOut();
    },
    async onSignOut() {
      await this.$swal
        .fire({
          title: "คุณต้องการยกหรือไม่?",
          text: "คุณต้องการยกเลิกการยืนยันสมาชิกหรือไม่",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        })
        .then((result) => {
          if (result.isConfirmed) {
            store.dispatch("auth/clearProfile");
            window.gapi.auth2
              .getAuthInstance()
              .signOut()
              .then(() => {
                console.log("Disconnected");
                this.redirect("");
              });
            // this.$swal.fire(
            //   "ออกจากระบบ!",
            //   "คุณได้ออกสู่ระบบเรียบร้อย",
            //   "success"
            // );
          }
        });
    },
    selectImage(file) {
      //reader image
      if (file) {
        this.saveImage = file;
        let reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.saveImage = store.getters["auth/getImage"];
        this.profileImage = store.getters["auth/getImage"];
      }
    },
    async onSave() {
      const fd = new FormData();
      console.log(this.saveImage);
      if (this.profileImage.substring(0, 4) === "data") {
        fd.append("file", this.saveImage, this.saveImage.name);
      } else {
        console.log(1111111111111);
        fd.append("file", null);
        fd.append("linkImage", this.profileImage);
      }
      fd.append("name", this.name);
      fd.append("firstname", this.firstname);
      fd.append("lastname", this.lastname);
      fd.append("phone", this.phone);
      fd.append("birthday", this.birthday);
      fd.append("type", this.type);
      fd.append("user_id", store.getters["auth/getId"]);
      fd.append("email", store.getters["auth/getEmail"]);
      if (!this.type) {
        console.log(this.name);
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล type",
        });
      } else if (!this.name) {
        console.log(this.name);
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล Name",
        });
      } else if (!this.firstname) {
        console.log(this.name);
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล First name",
        });
      } else if (!this.lastname) {
        console.log(this.name);
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล Last name",
        });
      } else if (!this.birthday) {
        console.log(this.name);
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล Birthdat date",
        });
      } else if (
        !this.phone ||
        this.phone.length < 10
      ) {
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล เบอร์โทรศัพท์",
        });
      } else {
        await this.$swal
          .fire({
            title: "ยืนยัน",
            text: "ยืนยัน",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              try {
                await AuthService.saveProfile({
                  fd,
                  user_id: store.getters["auth/getId"],
                }).then((result) => {
                  //this.profileImage = this.API_URL + "/" + result.path;
                  console.log("er", result);
                  store.dispatch("auth/setProfile", {
                    fullname: result.data.name,
                    fname: result.data.given_name,
                    lname: result.data.family_name,
                    email: result.data.email,
                    image: result.data.picture,
                    id: result.data.sub,
                    role: result.data.role,
                    type: result.data.type,
                    phone_number: result.data.phone_number,
                    birthday: result.data.birthday,
                    isSigned: true,
                  });
                  console.log("redirect");
                  this.redirect("home");
                });
              } catch (err) {
                console.log(err);
                store.dispatch("auth/clearProfile");
                window.gapi.auth2
                  .getAuthInstance()
                  .signOut()
                  .then(() => {
                    console.log("Disconnected");
                    this.redirect("");
                  });
                console.log(err);
              }
            }
          });
      }
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  created: function () {
    console.log("path", process.env);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columns {
  background: white;
  border-radius: 1.5rem;
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
