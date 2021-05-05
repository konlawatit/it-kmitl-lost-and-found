<template>
  <div>
    <div class="columns is-mobile is-tablet">
      <div class="column is-10">
        <v-btn-toggle tile color="blue darken-4" group>
          <v-btn id="buttonfilter" value="all" @click="allmyPosts()">
            ทั้งหมด
          </v-btn>

          <v-btn id="buttonfilter" value="find" @click="filterLost()"> ตามหาของ </v-btn>

          <v-btn id="buttonfilter" value="owner" @click="filterFound()"> ตามหาเจ้าของ </v-btn>

          <v-btn id="buttonfilter" value="complete" @click="filterComplete()"> โพสต์ที่เสร็จสิ้น </v-btn>

          <input type="date" class="input mt-2" v-model="date" />
          <button class="button ml-6 mt-2 is-info" @click="getPostbyDate()">
            <i class="fas fa-search"></i>
          </button>
          <input class="input is-normal ml-3 mt-2"  placeholder="ค้นหา" v-model="searchposts" />
          <button class="button ml-2 mt-2 is-info" @click="searchPosts()">
            <i class="fas fa-search"></i>
          </button>
          
        </v-btn-toggle>
        
      </div>
      
    </div>
    <div class="columns" id="body">
      <div class="column is-12">
        <v-expansion-panels
          focusable
          id="post"
          class="mt-3"
        >
          <v-expansion-panel v-for="(post, i) in posts" :key="i" class="mt-6">
            <button
              class="fas fa-ellipsis-h m-3"
              style="float: right; font-size: 1.3rem"
              @click="modalEditPost(post.post_id)"
            ></button>
            <div class="columns mt-6 is-mobile">
              <div class="column is-2">
                <div class="ml-3 mt-6 is-size-3">
                  {{ post.post_time }}
                  <div class="overline is-white" id="prepost">
                    {{ post.post_date }}
                  </div>
                </div>
                <div class="ml-3 is-size-3">
                  <v-chip class="ma-2" color="blue" label text-color="white" v-if="post.category_post == 'found' && post.status == 1">
                    {{ post.category_post }}
                  </v-chip>
                  <v-chip class="ma-2" color="pink" label text-color="white" v-else-if="post.category_post == 'lost' && post.status == 1">
                    {{ post.category_post }}
                  </v-chip>
                  <v-chip class="ma-2" color="green" label text-color="white" v-else>
                    complete
                  </v-chip>
                </div>
              </div>
              <div class="column is-1 mt-6">
                <v-menu bottom min-width="200px" rounded offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon x-large v-on="on">
                      <v-avatar color="primary" size="60"
                        ><img :src="post.user_picture" alt="profile"
                      /></v-avatar>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list-item-content class="justify-center">
                      <div class="mx-auto text-center">
                        <v-avatar color="brown mb-2">
                          <img :src="post.user_picture" alt="profile" />
                        </v-avatar>
                        <h3 class="mt-1">{{ post.user_name }}</h3>
                        <h3 class="mt-1">
                          {{ post.firstname }} {{ post.lastname }}
                        </h3>
                        <p class="caption mt-1">
                          {{ post.email }}
                        </p>
                        <v-btn depressed rounded text @click="createChatRoom(post.user_id, post.user_name)"  v-if="post.user_id !== $store.getters['auth/getId']">
                          Chat
                        </v-btn>
                       
                      </div>
                    </v-list-item-content>
                  </v-card>
                </v-menu>
              </div>
              <div class="column is-6 mt-3 ml-6">
                {{ post.topic }}
                <p class="mt-3">{{post.place}}</p>
                <p class="mt-3">{{ post.post_desc }}</p>
              </div>
              <div class="column is-3 is-mobile">
                <img :src="'http://localhost:8888/' + post.post_image" alt="John" />
              </div>
            </div>
            <div class="columns mb-6 mr-4">
              <div class="column is-10"></div>
              <div class="column is-2">
                <button class="button is-info" @click="redirect('detail/'+post.post_id)">More detail</button>
              </div>
            </div>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': editPost }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered">Edit post</p>
          <button
            class="delete"
            aria-label="close"
            @click="editPost = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-2"></div>
            <div class="column is-8">
              <v-text-field
                label="Topic"
                hide-details="auto"
                value=""
                v-model="postEdit.topic"
              ></v-text-field>
              <v-select
                :items="items"
                label="Category post"
                class="mt-6"
                v-model="postEdit.type"
              ></v-select>
              <v-text-field
                label="Place"
                hide-details="auto"
                value=""
                v-model="postEdit.place"
                class="mt-6"
              ></v-text-field>
              <v-textarea
                label="Description"
                hide-details="auto"
                item-value="lost"
                v-model="postEdit.post_desc"
                class="mt-6"
              ></v-textarea>
            </div>
            <div class="column is-2"></div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="confrimEditPost(postEdit.id)">Save changes</button>
          <button class="button is-danger" @click="deletePost(postEdit.id)">Delete post</button>
          <button class="button is-primary" @click="completePost(postEdit.id)" v-if="postEdit.status == 1">Post is complete</button>
          <button class="button is-warning" v-else @click="inCompletePost(postEdit.id)">Post is incomplete</button>
          <button class="button" @click="editPost = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../../service/PostService";
import CommentService from "../../service/CommentService"
import ChatService from "../../service/ChatService"
import store from "../../store/index.js";
import {mapGetters} from "vuex"
export default {
  name: "myPost",
  data() {
    return {
      store,
      page: 1,
      posts: [],
      commentText: "",
      comments: {},
      date: new Date().toISOString().slice(0, 10),
      editPost: false,
      postEdit: { id:"", topic: "", place: "", post_desc: "", type: "" , status: "", update_time: ""},
      items: ["lost", "found"],
      searchposts: "",
    };
  },
  created: async function () {
    await PostService.getMyPosts(this.$route.params.id).then((result) => {
      console.log(result);
      this.posts = result.data;
    });
  },
  methods: {
    async searchPosts() {
      if (this.searchposts != "") {
        await PostService.searchPostsHome(this.searchposts).then((result) => {
          this.posts = result.data;
          //this.titlePost = "Posts ( " + this.listposts.length + " )";
        });
      } else {
        await PostService.getMyPosts(this.$route.params.id).then((result) => {
          console.log(result);
          this.posts = result.data;
    });
      }
    },
    async inCompletePost(id){
      let index = 0
      for (var i in this.posts){
        if(this.posts[i].post_id == id){
          index = i
          break
        }
      }
      this.posts.splice(index, 1)
      await PostService.inCompletePost(id).then((result) =>{
        console.log(result)
        this.editPost = false
      })
    },
    async completePost(id){
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
      let datetime = d.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + sec;
      let index = 0
      for (var i in this.posts){
        if(this.posts[i].post_id == id){
          index = i
          break
        }
      }
      this.posts.splice(index, 1)
      await PostService.completePost(id, datetime).then((result) =>{
        console.log(result)
        this.editPost = false
      })
    },
    async deletePost(id){
      console.log(id)
      await this.$swal.fire({
          title: "ยืนยัน",
          text: "ต้องการลบโพสต์หรือไม่",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) =>{
          if(result.isConfirmed){
            let index = 0
            for (var i in this.posts){
              if(this.posts[i].post_id == id){
                index = i
                break
              }
            }
            this.posts.splice(index, 1)
            this.editPost = false
            try {
              await PostService.deletePost(id).then((result) => {
                console.log(result);
              });
            } catch (err) {
              console.log(err);
            }
          }
        })
    },
    async getPostbyDate(){
      console.log(this.date)
      await PostService.getMyPostDate(this.date, this.$route.params.id).then((result) =>{
        this.posts = result.data
      })
    },
    async confrimEditPost(id){
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
      this.postEdit.update_time = `${d.getFullYear()}-${month}-${day} ${hour}:${minute}:${sec}`
      console.log(id)
      for(var i in this.posts){
        if(this.posts[i].post_id == id){
          console.log("pass")
          this.posts[i].topic = this.postEdit.topic
          this.posts[i].place = this.postEdit.place
          this.posts[i].post_desc = this.postEdit.post_desc
          this.posts[i].category_post = this.postEdit.type
          break
        }
      }
      await PostService.editPost(this.postEdit).then((result) =>{
        console.log(result)
        this.editPost = false
      })
    },
    modalEditPost(id) {
      this.editPost = true;
      for (var post in this.posts) {
        if (id == this.posts[post].post_id) {
          console.log("pass");
          this.postEdit.id = id
          this.postEdit.topic = this.posts[post].topic;
          this.postEdit.place = this.posts[post].place;
          this.postEdit.post_desc = this.posts[post].post_desc;
          this.postEdit.type = this.posts[post].category_post;
          this.postEdit.status = this.posts[post].status;
        } else {
          console.log("not pass");
        }
      }
    },
    async filterComplete(){
      await PostService.getmyPostsComplete(store.getters["auth/getId"]).then((result) => {
        this.posts = result.data
      })
    },
    async filterLost(){
      console.log("test lost")
      await PostService.getmyPostsLost(store.getters["auth/getId"]).then((result) => {
        this.posts = result.data
      })
    },
    async filterFound(){
      console.log("test found")
      await PostService.getmyPostsFound(store.getters["auth/getId"]).then((result) => {
        this.posts = result.data
      })
    },
    async allmyPosts(){
      await PostService.getMyPosts(store.getters["auth/getId"]).then((result) => {
      this.posts = result.data;
    });
    },
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
    async getComments(postId) {
      //get all comments on each post
      this.commentText = ''
      console.log(postId)
      await CommentService.getComments(postId).then(result => {
        this.comments = result
      })
      //alert('comment add'+postId)
    },
    async addComment(postId) {
      await CommentService.createComment({postId, commentText: this.commentText, user_id: this.$store.getters['auth/getId']}).then(async (result) => {
        this.commentText = ""
        this.comments = result
      })
      
    },
    async createChatRoom(another_id, another_name) {
      await ChatService.createConversation(this.$store.getters['auth/getId'], another_id)
      //console.log(this.getRooms.filter(data => data.user_id == another_id)[0]);
      //let another_user = this.getRooms.filter(data => data.user_id == another_id)[0];
      this.$store.dispatch("conversation/setSelectRoom", {
        user_id: another_id,
        user_name: another_name,
      });
      
      // await ChatService.getMessages({
      //   user_id: this.$store.getters["auth/getId"],
      //   another_id: another_user.user_id,
      // }).then((data) => {
      //   this.$store.dispatch("conversation/setMessages", data);
      // });
      this.redirect('chatroom')
    
    }
  },
  computed: {
    ...mapGetters("conversation", ["getRooms"]),
    ...mapGetters("auth", ["getId"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#post {
  width: 100%;
}
img {
  width: 100%;
}
#body {
  font-family: "Kanit", sans-serif;
}
#buttonfilter {
  font-family: "Kanit", sans-serif;
  border-radius: 20rem;
}
</style>
