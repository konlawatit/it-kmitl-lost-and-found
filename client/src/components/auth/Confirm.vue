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
          :error-messages="typeErrors"
          @input="$v.type.$touch()"
          label="type"
        ></v-select>
      </div>

      <div class="columns" v-if="type == 'student'">
        <div class="column">
          <v-text-field
            :counter="8"
            label="Student ID"
            v-model="student_id"
            :items="itemsDegree"
            :error-messages="studentIdErrors"
            @input="$v.student_id.$touch()"
            maxlength="8"
            required
          >
          </v-text-field>
        </div>
        <div class="column">
          <v-select
            size="20"
            v-model="degree"
            :items="itemsDegree"
            :error-messages="degreeErrors"
            @input="$v.degree.$touch()"
            label="Degree"
          ></v-select>
        </div>
        <div class="column" v-if="degree == itemsDegree[1]">
          <v-select
            size="20"
            v-model="branch"
            :items="itemsBranch2"
            :error-messages="branchErrors"
            @input="$v.branch.$touch()"
            label="Branch"
          ></v-select>
        </div>
        <div class="column" v-else-if="degree == itemsDegree[2]">
          <v-select
            size="20"
            v-model="branch"
            :items="itemsBranch3"
            :error-messages="branchErrors"
            @input="$v.branch.$touch()"
            label="Branch"
          ></v-select>
        </div>
        <div class="column" v-else>
          <v-select
            size="20"
            v-model="branch"
            :items="itemsBranch"
            :error-messages="branchErrors"
            @input="$v.branch.$touch()"
            label="Branch"
          ></v-select>
        </div>

        <div class="column" v-if="degree == itemsDegree[0]">
          <v-select
            size="20"
            v-model="year"
            :items="itemsYear"
            :error-messages="yearErrors"
            @input="$v.year.$touch()"
            label="Year"
          ></v-select>
        </div>
      </div>
      <div class="columns" v-else-if="type == 'personnel'">
        <div class="column">
          <v-text-field
            :counter="255"
            :error-messages="positionErrors"
            @input="$v.position.$touch()"
            label="Position"
            v-model="position"
            maxlength="255"
            required
          >
          </v-text-field>
        </div>
      </div>

      <div class="columns">
        <!-- <input type="file" ref="file" @change="selectImage" /> -->
        <div class="column">
          <v-text-field
            :error-messages="nameErrors"
            :counter="10"
            label="User Name"
            v-model="name"
            maxlength="10"
            @input="$v.name.$touch()"
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
            :error-messages="firstnameErrors"
            @input="$v.firstname.$touch()"
            label="First name"
            required
            maxlength="255"
          ></v-text-field>
        </div>
        <div class="column is-6">
          <v-text-field
            v-model="lastname"
            :counter="255"
            :error-messages="firstnameErrors"
            @input="$v.firstname.$touch()"
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
            :error-messages="phoneErrors"
            @input="$v.phone.$touch()"
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
                :error-messages="birthdayErrors"
                @input="$v.birthday.$touch()"
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
import AuthService from "../../service/AuthService";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  numeric,
} from "vuelidate/lib/validators";

let checkStudentId = function (val) {
  console.log(val);
  if (this.type !== 'student') return true
  if (val.match(/[0-9]{3}7[0-9]{4}/)) {
    console.log("pass");
    return true;
  }
  return false;
};

let checkTypeStudent = function (val, type) {
  //ไว้เช็คว้่เป็นtypeอะไร กัน การเช็ค error
  if (type !== "student") return true;
  if (required(val)) return true;
  return false;
};
let checkTypePersonnel = function (val, type) {
  //ไว้เช็คว้่เป็นtypeอะไร กัน การเช็ค error
  if (type !== "personnel") return true;
  if (required(val)) return true;
  return false;
};
// let checkDate = function (val) {
//   console.log(val)
//   if (val > 'a') {
//     return true
//   }
//   return false
// }

export default {
  name: "Confirm",
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    firstname: { required, maxLength: maxLength(255) },
    lastname: { required, maxLength: maxLength(255) },
    phone: {
      required,
      checkNum: numeric,
      length,
      maxLength: maxLength(10),
      minLength: minLength(10),
    },
    birthday: {
      required,
      minValue: function (val) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        if (val < today) return true;
        return false;
      },
    },
    type: { required },
    student_id: {
      required: function (val) {
        return checkTypeStudent(val, this.type);
      },
      minLength: minLength(8),
      numberic: numeric,
      check: checkStudentId,
    },
    degree: {
      required: function (val) {
        return checkTypeStudent(val, this.type);
      },
    },
    branch: {
      required: function (val) {
        return checkTypeStudent(val, this.type);
      },
    },
    year: {
      required: function (val) {
        return checkTypeStudent(val, this.type);
      },
    },
    position: {
      required: function (val) {
        return checkTypePersonnel(val, this.type);
      },
    },
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.name.maxLength)
        errors.push("Name must be at most 10 characters long");
      if (!this.$v.name.required) errors.push("Name is required.");
      return errors;
    },
    firstnameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.firstname.maxLength)
        errors.push("First Name must be at most 255 characters long");
      if (!this.$v.firstname.required) errors.push("First Name is required.");
      return errors;
    },
    LastnameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.lastname.maxLength)
        errors.push("Last Name must be at most 255 characters long");
      if (!this.$v.lastname.required) errors.push("Last Name is required.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.phone.required) errors.push("Phone number is required.");
      if (!this.$v.phone.checkNum) errors.push("Invalid Mobile Number.");
      if (!this.$v.phone.maxLength || !this.$v.phone.minLength)
        errors.push("Invalid Mobile Number.");
      return errors;
    },
    birthdayErrors() {
      const errors = [];
      if (!this.$v.birthday.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.birthday.required) errors.push("Birthday is required.");
      if (!this.$v.birthday.minValue)
        errors.push("Days must be less than date now.");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.type.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.type.required) errors.push("Type is required.");
      return errors;
    },
    studentIdErrors() {
      const errors = [];
      if (!this.$v.student_id.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.student_id.required) errors.push("Student ID is required.");
      if (!this.$v.student_id.minLength)
        errors.push("Student ID must be 8 characters.");
      if (!this.$v.student_id.numberic) errors.push("Invalid Student ID.");
      if (!this.$v.student_id.check)
        errors.push("Student ID is not an IT student.");
      return errors;
    },
    degreeErrors() {
      const errors = [];
      if (!this.$v.degree.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.degree.required) errors.push("Degree is required.");
      return errors;
    },
    branchErrors() {
      const errors = [];
      if (!this.$v.branch.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.branch.required) errors.push("Branch is required.");
      return errors;
    },
    yearErrors() {
      const errors = [];
      if (!this.$v.year.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.year.required) errors.push("Year is required.");
      return errors;
    },
    positionErrors() {
      const errors = [];

      if (!this.$v.position.$dirty) return errors; //dirty จะ return true เมื่อ touch ไปแล้วอย่างน้อยหนึ่งครั้ง
      if (!this.$v.position.required && this.type == "personnel")
        errors.push("Position is required.");
      return errors;
    },
  },
  data() {
    return {
      store,
      valid: true,
      name: "",
      firstname: store.getters["auth/getfname"],
      lastname: store.getters["auth/getlname"],
      show1: false,
      show2: false,
      birthday: null,
      menu: false,
      branch: "",
      year: "",
      student_id: "",
      degree: "",
      type: "",
      position: "",
      itemstype: ["student", "personnel"],
      itemsDegree: ["ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก"],
      itemsBranch: [
        "สาขาวิชาเทคโนโลยีสารสนเทศ",
        "สาขาวิชาวิทยาการข้อมูลและการวิเคราะห์เชิงธุรกิจ",
        "สาขาเทคโนโลยีสารสนเทศทางธุรกิจ (หลักสูตรนานาชาติ)",
      ],
      itemsBranch2: [
        "สาขาวิชาเทคโนโลยีสารสนเทศ",
        "สาขาปัญญาประดิษฐ์ และการเรียนรู้เชิงลึก",
      ],
      itemsBranch3: ["สาขาวิชาเทคโนโลยีสารสนเทศ"],
      itemsYear: ["1", "2", "3", "4", "จบการศึกษา"],
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
      this.$v.$touch();
      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        const fd = new FormData();
        if (this.profileImage.substring(0, 4) === "data") {
          fd.append("file", this.saveImage, this.saveImage.name);
        } else {
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
                  console.log("redirect");
                  this.redirect("home");
                });
              } catch (err) {
                this.$swal.fire({
                icon: "error",
                title: "ระบบผิดพลาด",
                text: "กรุณาลองใหม่อีกครั้ง",
              });
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
    // if (!window.gapi.auth2.isSignedIn.get()) {
    //   this.$router.push(`/`);
    // }
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
