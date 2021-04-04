<template>
  <div>
    <v-app-bar
      app
      fixed
      dark
      class="mx-auto overflow-hidden"
      color="#0f3057"
      height="80"
    >
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-show="window.width < 768"
      ></v-app-bar-nav-icon>
      <template v-slot:extension>
        <v-tabs align-with-title v-show="window.width >= 768">
          <div class="columns ml-1">
            <div class="column is-6" id="tabs1" @click="redirect('home')">
              <p>Home</p>
            </div>
            <div class="column is-6" id="tabs2" @click="redirect('mypost')">
              <p>My post</p>
            </div>
            <div
              class="column is-7"
              id="tabs3"
              @click="redirect('leaderboard')"
            >
              <p>Leaderboard</p>
            </div>
          </div>
        </v-tabs>
      </template>
      <v-toolbar-title class="logo">
        <a @click="redirect('home')">
          <img src="./lost 2.png" />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="control has-icons-right is-mobile" id="inputsearch">
        <input class="input is-normal" placeholder="ค้นหา" />
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <a @click="redirect('createpost')"
        ><button class="button mr-6 is-success" go>
          <i class="fa fa-pencil mr-2" aria-hidden="true"></i>
          เขียนโพสต์
        </button></a
      >
      <div v-show="window.width >= 768">
        <v-menu bottom min-width="200px" rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="brown" size="48">
                <img :src="store.getters['auth/getImage']" alt="profile" />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="brown mb-2">
                  <img :src="store.getters['auth/getImage']" alt="profile" />
                </v-avatar>
                <h3>{{ store.getters["auth/getFullName"] }}</h3>
                <p class="caption mt-1">
                  {{ store.getters["auth/getEmail"] }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="setProfile">
                  Edit Account
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text @click="onSignOut()">
                  ออกจากระบบ
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      disable-resize-watcher
      fixed
      app
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-black--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              store.getters["auth/getFullName"]
            }}</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My post</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>fas fa-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Leaderboard</v-list-item-title>
          </v-list-item>

          <v-list-item @click="onSignOut()">
            <v-list-item-icon>
              <v-icon>fa fa-power-off</v-icon>
            </v-list-item-icon>
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div class="modal" :class="{ 'is-active': editProfile }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Edit account</p>
          <button
            class="delete"
            aria-label="close"
            @click="editProfile = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="is-flex is-justify-content-center">
            <template>
              <v-avatar color="black" size="100">
                <img :src="profile.image" alt="John" />
              </v-avatar>
            </template>
          </div>
          <div class="columns mt-1">
            <div class="column is-2"></div>
            <div class="column is-8">
              <v-file-input
                label="Change image"
                filled
                prepend-icon="mdi-image"
                type="file"
                @change="selectImage"
              ></v-file-input>
              <v-text-field
                label="user name"
                hide-details="auto"
                v-model="profile.name"
                value=""
              ></v-text-field>
              <v-text-field
                label="ชื่อจริง"
                hide-details="auto"
                v-model="profile.fname"
                value=""
              ></v-text-field>
              <v-text-field
                label="นามสกุล"
                hide-details="auto"
                v-model="profile.lname"
                value=""
              ></v-text-field>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Birthday date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    v-model="profile.birthday"
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  hint="MM/DD/YYYY format"
                  v-model="profile.birthday"
                  @change="save"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                :counter="10"
                label="Phone number"
                required
                maxlength="10"
                v-model="profile.phone_number"
              ></v-text-field>
            </div>
            <div class="column is-2"></div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="saveProfile">
            Save changes
          </button>
          <button class="button" @click="editProfile = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index.js";
import ProfileSerice from "../../service/ProfileService";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      store,
      drawer: false,
      group: null,
      window: {
        width: 0,
        height: 0,
      },
      editProfile: false,
      profile: {
        fname: "",
        lname: "",
        image: "",
        imgaeFile: "",
        birthday: "",
        name: "",
        phone_number: "",
      },
    };
  },
  methods: {
    async onSignOut() {
      await this.$swal
        .fire({
          title: "คุณต้องการออกจากระบบ?",
          text: "คุณต้องการออกจากระบบหรือไม่!",
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
            this.$swal.fire(
              "ออกจากระบบ!",
              "คุณได้ออกสู่ระบบเรียบร้อย",
              "success"
            );
          }
        });
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    setProfile() {
      this.editProfile = true;
      this.profile = {
        email: this.getEmail,
        fname: this.getfname,
        lname: this.getlname,
        image: this.getImage,
        imageFile: false,
        birthday: this.getBirthday,
        phone_number: this.getPhone_number,
        name: this.getFullName,
      };
    },
    selectImage(file) {
      //reader image
      if (file) {
        this.profile.imageFile = file;
        let reader = new FileReader();
        reader.onload = (e) => {
          this.profile.image = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.profile.imageFile = false;
        this.profile.image = this.getImage;
      }
    },
    async saveProfile() {
      const fd = new FormData();

      if (this.profile.image.substring(0, 4) === "data") {
        console.log('dddddddddddddddddddd',this.profile.image);
        fd.append("file", this.profile.imageFile);
      } else {
        console.log("fiel");
        fd.append("file", null);
        console.log(this.profile.image);
        fd.append("linkImage", this.profile.image);
        console.log(fd);
      }
      fd.append("name", this.profile.name);
      fd.append("firstname", this.profile.fname);
      fd.append("lastname", this.profile.lname);
      fd.append("phone_number", this.profile.phone_number);
      fd.append("birthday", this.profile.birthday);

      if (!this.profile.name) {
        this.profile.name = this.getFullName
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล Name",
        });
      } else if (!this.profile.fname) {
        this.profile.fname = this.getfname
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล First name",
        });
      } else if (!this.profile.lname) {
        this.profile.lname = this.getlname
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล Last name",
        });
      } else if (!this.profile.birthday) {
        this.profile.birthday = this.birthday
        this.$swal.fire({
          icon: "error",
          title: "ข้อมูลไม่ครบถ้วน",
          text: "กรุณากรอกข้อมูล Birthdat date",
        });
      } else if (!this.profile.phone_number || this.profile.phone_number.length < 10) {
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
                console.log("user", this.getId);
                await ProfileSerice.updateProfile({
                  fd,
                  user_id: store.getters["auth/getId"],
                }).then(() => {
                  store.dispatch("auth/updateProfile", {
                    fullname: this.profile.name,
                    fname: this.profile.fname,
                    lname: this.profile.lname,
                    image: this.profile.image,
                    birthday: this.profile.birthday,
                    phone_number: this.profile.phone_number,
                  });
                });
                this.$swal.fire(
                  "Success",
                  "เปลี่ยนแปลงข้อมูลเรียบร้อย",
                  "success"
                );
              } catch (err) {
                this.$swal.fire(
                  "Error",
                  "การเปลี่ยนแปลงข้อมูลเกิดการผิดพลาด",
                  "error"
                );
                console.log(err);
              }
            }
          });
      }
    },
  },
  created() {
    console.log("created", this.getEmail);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapGetters("auth", [
      "getfname",
      "getEmail",
      "getlname",
      "getImage",
      "getFullName",
      "getBirthday",
      "getPhone_number",
      "getId",
    ]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iconuser {
  font-size: 2rem;
  margin-left: auto;
  margin-right: auto;
}
#navbaruser {
  font-size: 2rem;
}
#nameuser {
  font-size: 1rem;
}
#namenavbar {
  margin-top: 1rem;
  margin-right: 1rem;
  font-family: "Kanit", sans-serif;
}
#inputsearch {
  width: 25rem;
  margin-right: 1rem;
}
button {
  font-family: "Kanit", sans-serif;
}
#tabs1,
#tabs2,
#tabs3 {
  font-family: "Kanit", sans-serif;
  font-size: 1.5rem;
  text-align: center;
}
#tabs1 :hover,
#tabs2 :hover,
#tabs3 :hover {
  background: #61cbd2;
  border-radius: 10rem;
  transition-duration: 0.3s;
}
</style>
