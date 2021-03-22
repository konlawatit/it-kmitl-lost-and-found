<template>
  <div class="columns">
    <div class="column is-12 p-6">
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="columns">
          <div class="column is-6">
            <v-text-field
              v-model="firstname"
              :counter="255"
              :rules="firstnameRules"
              label="First name"
              required
            ></v-text-field>
          </div>
          <div class="column is-6">
            <v-text-field
              v-model="lastname"
              :counter="255"
              :rules="lastnameRules"
              label="Last name"
              required
            ></v-text-field>
          </div>
        </div>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        ></v-text-field>

        <v-text-field
          v-model="confrimpassword"
          :rules="confrimpasswordRules"
          label="Confrim Password"
          required
          type="password"
        ></v-text-field>

        <div class="columns is-centered mt-3">
            <button class="button is-rounded">สมัครสมาชิก</button>
            <button class="button is-rounded is-danger ml-6">ยกเลิก</button>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FromRegis",
  data() {
    return {
      valid: true,
      firstname: "",
      firstnameRules: [
        (v) => !!v || "First name is required",
        (v) =>
          (v && v.length <= 255) ||
          "First name must be less than 255 characters",
      ],
      lastname: "",
      lastnameRules: [
        (v) => !!v || "Last name is required",
        (v) =>
          (v && v.length <= 255) ||
          "Last name must be less than 255 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Passwoord is required",
        (v) =>
          (v && v.length <= 255) || "Password must be less than 255 characters",
      ],
      confrimpassword: "",
      confrimpasswordRules: [
        (v) => !!v || "Confirm passwoord is required",
        (v) => (v && v == this.password) || "Password is not match",
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.columns {
  background: white;
  border-radius: 1.5rem;
}
button{
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
