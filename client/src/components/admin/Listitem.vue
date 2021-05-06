<template>
  <div class="mt-6" id="listbox">
    <div class="columns">
      <div class="column is-3">
        <div>
          <div class="columns mt-2 ml-6" id="boxitem">
            <div class="column is-12 p-5 has-text-centered">
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-3 white--text"
                @click="addCategory()"
                >เพิ่มประเภทสิ่งของ</v-btn
              >
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 white--text"
                @click="changelisttolistposts()"
                >โพสต์ทั้งหมด</v-btn
              >
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 white--text"
                @click="changelisttocompletepost()"
                >โพสต์ที่เสร็จสิ้น</v-btn
              >
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 white--text"
                @click="changelisttolistname()"
                >รายชื่อผู้ใช้งาน</v-btn
              >
              <v-btn
                depressed
                color="light-blue darken-4"
                class="button mt-6 mb-3 white--text"
                @click="changelisttolistnameban()"
                >รายชื่อผู้ถูกระงับ</v-btn
              >
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <v-card max-width="600" class="mx-auto" v-show="listbox == true"> <!--card user and userban -->
          <v-toolbar color="light-blue darken-4" dark>
            <v-toolbar-title>{{ titlelist }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <input
              type="text"
              class="input mr-1"
              style="width: 50%"
              placeholder="Search"
              v-model="searchuser"
              v-if="inputsearch == true"
            />
            <input
              type="text"
              class="input mr-1"
              style="width: 50%"
              placeholder="Search"
              v-model="searchuserban"
              v-else
            />
            <v-btn icon @click="searchUser()" v-if="inputsearch == true">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon @click="searchuserBan()" v-else>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list subheader two-line>
            <v-list-item v-for="list in list" :key="list.user_id">
              <v-list-item-avatar>
                <img :src="list.image" alt="profile" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="list.user_name"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="list.role"
                  class="mt-1"
                  v-if="list.role != 'banned'"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="list.role"
                  class="mt-1 red--text"
                  v-else
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action
                v-if="store.getters['auth/getId'] != list.user_id"
              >
                <v-btn icon @click="editUserModal(list.user_id, list.role)">
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card max-width="600" class="mx-auto" v-show="showlistpost == true"> <!--card all post-->
          <v-toolbar color="light-blue darken-4" dark>
            <v-toolbar-title>{{ titlePost }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <input
              type="text"
              class="input mr-1"
              style="width: 50%"
              placeholder="Search"
              v-model="searchposts"
            />
            <v-btn icon @click="searchPosts()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list subheader two-line>
            <v-list-item v-for="list in listposts" :key="list.post_id">
              <v-list-item-content>
                <v-list-item-title v-text="list.topic"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="list.post_date"
                  class="mt-1"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="list.post_time"
                  class="mt-1"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="editpostModal(list.post_id)">
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card max-width="600" class="mx-auto" v-show="showlistcompletepost == true"> <!--card complete post-->
          <v-toolbar color="light-blue darken-4" dark>
            <v-toolbar-title>{{ titlePost }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <input
              type="text"
              class="input mr-1"
              style="width: 50%"
              placeholder="Search"
              v-model="searchcompleteposts"
            />
            <v-btn icon @click="searchCompletePosts()">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list subheader two-line>
            <v-list-item v-for="list in listcompleteposts" :key="list.post_id">
              <v-list-item-content>
                <v-list-item-title v-text="list.topic"></v-list-item-title>

                <v-list-item-subtitle
                  v-text="list.post_date"
                  class="mt-1"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-text="list.post_time"
                  class="mt-1"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="editpostModal(list.post_id)">
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <div v-show="add == true" class="columns mt-6">
          <div class="column is-2"></div>
          <div class="column is-8">
            <v-text-field
              label="Category"
              :rules="rules"
              hide-details="auto"
              v-model="nameItemAdd"
            ></v-text-field>
            <v-file-input
              :rules="img"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              label="Image"
              class="mt-6"
              @change="selectImage"
            ></v-file-input>
            <div class="columns mt-2">
              <div class="column is-8"></div>
              <div class="column is-4">
                <button class="button is primary white--text has-text-centered" @click="addItem()">
                  Add
                </button>
              </div>
            </div>
          </div>
          <div class="column is-2"></div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': edituser }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered is-size-3 mt-4">
            Edit user
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="edituser = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="columns" id="listedit" v-if="userrole != 'admin' && userrole != 'banned'">
            <div
              class="column is-12 is-size-2 has-text-centered"
              @click="normaltoadmin(userid)"
            >
              Normal user to Admin
            </div>
          </div>
          <div class="columns" id="listedit" v-if="userrole != 'banned' && userrole != 'normal'">
            <div
              class="column is-12 is-size-2 has-text-centered"
              @click="admintonormal(userid)"
            >
              Admin to Normal user
            </div>
          </div>
          <div class="columns" id="listedit" v-if="userrole != 'banned'">
            <div
              class="column is-12 is-size-2 has-text-centered has-text-danger"
              @click="banuser(userid)"
            >
              Banned users
            </div>
          </div>
          <div class="columns" id="listedit" v-if="userrole == 'banned'">
            <div
              class="column is-12 is-size-2 has-text-centered has-text-danger"
              @click="unlockbanuser(userid)"
            >
              Unlock ban
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': editpost }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered is-size-3 mt-4">Post</p>
          <button
            class="delete"
            aria-label="close"
            @click="editpost = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="columns" id="listedit">
            <div
              class="column is-12 is-size-2 has-text-centered"
              @click="redirect('detail/' + postid)"
            >
              More detail
            </div>
          </div>
          <div class="columns" id="listedit">
            <div
              class="column is-12 is-size-2 has-text-centered has-text-danger"
              @click="deletePost(postid)"
            >
              Delete post
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../../service/PostService";
import AuthService from "../../service/AuthService";
import store from "../../store/index.js";
export default {
  name: "listitem",
  data() {
    return {
      store,
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      img: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      add: true,
      listbox: false,
      edituser: false,
      userid: "",
      userrole: "",
      editpost: false,
      postid: "",
      titlelist: "",
      titlePost: "",
      showlistpost: false,
      showlistcompletepost: false,
      list: [],
      listname: [],
      listnameban: [],
      listposts: [],
      listcompleteposts: [],
      searchuser: "",
      searchuserban: "",
      searchposts: "",
      searchcompleteposts: "",
      inputsearch: true,
      nameItemAdd: "",
      saveImage: "",

    };
  },
  methods: {
    selectImage(file) {
      //reader image
        this.saveImage = file;
        let reader = new FileReader();
        reader.onload = (e) => {
          this.itemImage = e.target.result;
        };
        reader.readAsDataURL(file);
    },
    async addItem(){
      const fd = new FormData();
      fd.append("file", this.saveImage);
      try{
        await PostService.addItem(fd, this.nameItemAdd, this.$store.getters['auth/getId']).then((result) =>{
          console.log(result)
          location.reload()
        })
      } catch(err){
        if(this.nameItemAdd == ""){
          await this.$swal.fire({
                title: "กรอกข้อมูลไม่ครบ",
                text: "โปรดกรอกชื่อ Item",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
        }
        else{
          await this.$swal.fire({
                title: "กรอกข้อมูลไม่ถูกต้อง",
                text: "ชื่อ Item นี้ถูกใช้ไปแล้ว",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
        }
        if(this.saveImage == ""){
          await this.$swal.fire({
                title: "กรอกข้อมูลไม่ครบ",
                text: "โปรด Upload รูป",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
        }
      }
    },
    async searchCompletePosts(){
      if (this.searchcompleteposts != "") {
        await PostService.searchCompletePosts(this.searchcompleteposts).then((result) => {
          this.listcompleteposts = result.data;
          this.titlePost = "Complete posts ( " + this.listcompleteposts.length + " )";
        });
      } else {
        await PostService.getAllCompletePosts().then((result) => {
          console.log(result);
          this.listcompleteposts = result.data;
          this.titlePost = "Complete posts ( " + this.listcompleteposts.length + " )";
        });
      }
    },
    async searchPosts() {
      if (this.searchposts != "") {
        await PostService.searchPosts(this.searchposts).then((result) => {
          this.listposts = result.data;
          this.titlePost = "Posts ( " + this.listposts.length + " )";
        });
      } else {
        await PostService.getAllPosts().then((result) => {
          console.log(result);
          this.listposts = result.data;
          this.titlePost = "Posts ( " + this.listposts.length + " )";
        });
      }
    },
    async searchuserBan(){
      if (this.searchuser != "") {
        await AuthService.searchUserBan(this.searchuserban).then((result) => {
          this.list = result.data;
          this.titlelist = "Banned ( " + this.list.length + " )";
        });
      } else {
        this.list = this.listname;
        this.titlelist = "Banned ( " + this.listname.length + " )";
      }
    },
    async searchUser() {
      console.log(this.searchuser);
      if (this.searchuser != "") {
        await AuthService.searchUser(this.searchuser).then((result) => {
          this.list = result.data;
          this.titlelist = "Users ( " + this.list.length + " )";
        });
      } else {
        this.list = this.listname;
        this.titlelist = "Users ( " + this.listname.length + " )";
      }
    },
    async unlockbanuser(id){
      let index = 0
      for(var i in this.list){
        if(this.list[i].user_id == id){
          this.list[i].role = 'normal'
          index = i
        }
      }
      this.listname.push(this.list[index])
      this.list.splice(index, 1)
      this.titlelist = "Banned ( " + this.list.length + " )";
      await AuthService.unlockBanUser(id).then((result) => {
        console.log(result);
        this.edituser = false;
      });
    },
    async banuser(id) {
      let index = 0
      for(var i in this.list){
        if(this.list[i].user_id == id){
          this.list[i].role = 'banned'
          index = i
          break
        }
      }
      this.listnameban.push(this.list[index])
      this.list.splice(index, 1)
      this.titlelist = "Users ( " + this.list.length + " )";
      console.log(id);
      await AuthService.banUser(id).then((result) => {
        console.log(result);
        this.edituser = false;
      });
    },
    async admintonormal(id) {
      for(var i in this.list){
        if(this.list[i].user_id == id){
          this.list[i].role = 'normal'
        }
      }
      console.log(id);
      await AuthService.admintoNormal(id).then((result) => {
        console.log(result);
        this.edituser = false;
      });
    },
    async normaltoadmin(id) {
      for(var i in this.list){
        if(this.list[i].user_id == id){
          this.list[i].role = 'admin'
        }
      }
      console.log(id);
      await AuthService.normaltoAdmin(id).then((result) => {
        console.log(result);
        this.edituser = false;
      });
    },
    async deletePost(id) {
      console.log(id);
      await this.$swal
        .fire({
          title: "ยืนยัน",
          text: "ต้องการลบโพสต์หรือไม่",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let index = 0
            for (var i in this.listposts){
              if(this.listposts[i].post_id == id){
                index = i
                break
              }
            }
            this.listposts.splice(index, 1)
            this.editpost = false;
            try {
              await PostService.deletePost(id).then((result) => {
                console.log(result);
              });
            } catch (err) {
              console.log(err);
            }
          }
        });
    },
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
    editpostModal(id) {
      this.editpost = true;
      this.postid = id;
    },
    editUserModal(id, role) {
      this.edituser = true;
      this.userid = id;
      this.userrole = role;
    },
    changelisttocompletepost(){
      this.listbox = false;
      this.showlistpost = false;
      this.add = false;
      this.showlistcompletepost = true;
      this.inputsearch = true;
      this.titlePost = "Complete posts ( " + this.listcompleteposts.length + " )";
    },
    changelisttolistnameban() {
      this.list = this.listnameban;
      this.titlelist = "Banned ( " + this.list.length + " )";
      this.listbox = true;
      this.add = false;
      this.showlistpost = false;
      this.inputsearch = false;
      this.showlistcompletepost = false;
    },
    changelisttolistname() {
      this.list = this.listname;
      this.titlelist = "Users ( " + this.list.length + " )";
      this.listbox = true;
      this.add = false;
      this.showlistpost = false;
      this.inputsearch = true;
      this.showlistcompletepost = false;
    },
    changelisttolistposts() {
      this.listbox = false;
      this.add = false;
      this.showlistpost = true;
      this.inputsearch = true;
      this.showlistcompletepost = false;
      this.titlePost = "Posts ( " + this.listposts.length + " )";
    },
    addCategory() {
      this.listbox = false;
      this.add = true;
      this.showlistpost = false;
      this.inputsearch = true;
      this.showlistcompletepost = false;
    },
  },
  created: async function () {
    await PostService.getAllPosts().then((result) => {
      console.log(result);
      this.listposts = result.data;
    });
    await PostService.getAllCompletePosts().then((result) => {
      console.log(result);
      this.listcompleteposts = result.data;
    });
    await AuthService.getAllUser().then((result) => {
      this.listname = result.data;
    });
    await AuthService.getAllUserBan().then((result) => {
      this.listnameban = result.data;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#listbox {
  width: 100%;
  font-family: "Kanit", sans-serif;
}
.v-list {
  height: 16rem;
  overflow-y: auto;
}
#listedit :hover {
  background: rgb(211, 211, 211);
}
.modal {
  font-family: "Kanit", sans-serif;
}
#boxitem {
  border-radius: 1rem;
  font-family: "Kanit", sans-serif;
  background: rgb(187, 186, 186);
}
button {
  font-family: "Kanit", sans-serif;
  width: 100%;
}
</style>
