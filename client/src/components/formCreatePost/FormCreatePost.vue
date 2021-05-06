<template>
  <div class="columns">
    <div class="column is-12" id="bodyblackground">
      <div class="columns">
        <div class="column is-1 ml-6">
          <v-avatar color="primary" size="90" class="mt-3"
            ><img :src="store.getters['auth/getImage']" alt="profile"
          /></v-avatar>
        </div>
        <div class="column is-10">
          <div class="columns">
            <div class="column is-2">
              <p class="is-size-4 ml-6 mt-2 has-text-centered">หัวข้อ :</p>
            </div>
            <div class="column is-9">
              <div>
                <v-text-field
                  label="Topic"
                  :rules="rules"
                  hide-details="auto"
                  v-model="title"
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <p class="is-size-5 ml-6">
                {{ store.getters["auth/getFullName"] }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              ประเภทโพสต์ :
            </div>
            <div class="column is-8">
              <v-chip-group mandatory active-class="primary">
                <v-chip class="is-size-5" @click="changTag('lost')">
                  ตามหาของหาย
                </v-chip>
                <v-chip class="is-size-5" @click="changTag('found')">
                  ตามหาเจ้าของ
                </v-chip>
              </v-chip-group>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              ประเภทของ :
            </div>
            <div class="column is-5">
              <v-select
                :items="items"
                :rules="categoryRules"
                filled
                label="Filled style"
                dense
                outlined
                v-model="categoryItem"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              สถานที่ :
            </div>
            <div class="column is-5">
              <v-text-field
                label="Place"
                hide-details="auto"
                v-model="locations"
              ></v-text-field>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1 mt-6">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              รูปภาพ :
            </div>
            <div class="column is-5">
              <v-file-input
                label="File image"
                filled
                prepend-icon="mdi-camera"
                type="file"
                v-model="postImage"
              ></v-file-input>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              รายละเอียด :
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-12">
              <v-container fluid>
                <v-textarea
                  clearable
                  label="รายละเอียด"
                  clear-icon="mdi-close-circle"
                  v-model="postDesc"
                ></v-textarea>
              </v-container>
            </div>
          </div>
        </div>
      </div>
      <div class="columns mb-4">
        <div class="column is-8"></div>
        <div class="column is-2">
          <v-btn tile color="success" @click="createPost()"> Create </v-btn>
        </div>
        <div class="column is-2">
          <v-btn tile color="error" @click="redirect('home')"> Cancel </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../../service/PostService.js";
import store from "../../store/index.js";
export default {
  name: "formCreatePost",
  data() {
    return {
      store,
      items: [],
      valueItem: "",
      locations: "",
      valueLocation: "",
      title: "",
      tagPost: "lost",
      postDesc: "",
      time: "",
      categoryItem: "",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      categoryRules:[
        (value) => !!value || "Required."
      ],
      postImageRules:[
        (value) => !!value || "Required."
      ],
      postImage: "",
    };
  },
  created: async function () {
    await PostService.getItemPosts().then((result) => {
      for (var item in result.data) {
        this.items.push(result.data[item].name);
      }
    });
  },
  methods: {
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
    changTag(tag) {
      this.tagPost = tag;
    },
    async createPost() {
      let d = new Date();
      let month = d.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      let day = d.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      let hour = d.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      let minute = d.getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      let sec = d.getSeconds();
      if (sec < 10) {
        sec = "0" + sec;
      }
      this.time = `${d.getFullYear()}-${month}-${day} ${hour}:${minute}:${sec}`;
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
            if (this.title == "") {
              await this.$swal.fire({
                title: "กรอกข้อมูลไม่ครบ",
                text: "โปรดกรอกหัวข้อโพสต์",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
              return 0;
            }
            if (this.categoryItem == "") {
              await this.$swal.fire({
                title: "กรอกข้อมูลไม่ครบ",
                text: "โปรดเลือกประเภทของ",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
              return 0;
            }
            if (this.postImage == "") {
              await this.$swal.fire({
                title: "กรอกข้อมูลไม่ครบ",
                text: "โปรดอัพโหลดรูป",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
              return 0;
            }
            const form = new FormData();
            form.append("userid", store.getters["auth/getId"]);
            form.append("topic", this.title);
            form.append("categoryPost", this.tagPost);
            form.append("postDesc", this.postDesc);
            form.append("post_time", this.time);
            form.append("place", this.locations);
            form.append("categoryItem", this.categoryItem);
            form.append("post_image", this.postImage);
            // this.redirect("home");
            try {
              await PostService.createPost(form).then((result) => {
                //this.profileImage = this.API_URL + "/" + result.path;
                this.redirect(`detail/${result.data.result[0].insertId}`);
                console.log(result);
              });
            } catch (err) {
              console.log(err);
            }
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bodyblackground {
  background: rgb(192, 191, 191);
  border-radius: 1rem;
  font-family: "Kanit", sans-serif;
}
.v-chip {
  width: 30%;
  justify-content: center;
}
</style>
