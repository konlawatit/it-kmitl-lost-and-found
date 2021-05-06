<template>
  <div>
    <div class="columns is-mobile is-tablet">
      <div class="column is-12">
        <v-btn-toggle tile color="blue darken-4" group>
          <v-btn id="buttonfilter" value="all" @click="allposts()">
            ทั้งหมด
          </v-btn>

          <v-btn id="buttonfilter" value="find" @click="filterLost()">
            ตามหาของ
          </v-btn>

          <v-btn id="buttonfilter" value="owner" @click="filterFound()">
            ตามหาเจ้าของ
          </v-btn>

          <input type="date" class="input mt-2" v-model="date" />
          <button class="button ml-2 mt-2 is-info" @click="getPostbyDate()">
            <i class="fas fa-search"></i>
          </button>
          <input class="input is-normal ml-3 mt-2"  placeholder="ค้นหา" v-model="searchposts" />
          <button class="button ml-2 mt-2 is-info" @click="searchPosts()">
            <i class="fas fa-search"></i>
          </button>
          <!-- <div class="control has-icons-right is-mobile" id="inputsearch">
        <input class="input is-normal" placeholder="ค้นหา" />
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div> -->
        </v-btn-toggle>
        
      </div>
    </div>
    <div class="columns" id="body">
      <div class="column is-12">
        <v-expansion-panels focusable id="post" class="mt-3">
          <v-expansion-panel v-for="(post, i) in posts" :key="i" class="mt-6">
            <button
              class="fas fa-ellipsis-h m-3"
              style="float: right; font-size: 1.3rem"
              v-if="post.user_id == store.getters['auth/getId'] || store.getters['auth/getRole'] == 'admin'"
              @click="modalEditPost(post.post_id)"
            ></button>
            <i
              v-else
              class="fas fa-ellipsis-h m-3"
              style="float: right; font-size: 1.3rem; color: white"
            ></i>
            <div class="columns mt-6 is-mobile">
              <div class="column is-2">
                <div class="ml-3 mt-6 is-size-3">
                  {{ post.post_time }}
                  <div class="overline is-white" id="prepost">
                    {{ post.post_date }}
                </div>
                <div>
                  <v-chip class="ma-2" color="blue" label text-color="white" v-if="post.category_post == 'found'">
                    {{ post.category_post }}
                  </v-chip>
                  <v-chip class="ma-2" color="pink" label text-color="white" v-else>
                    {{ post.category_post }}
                  </v-chip>
                </div>
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
                        <v-btn
                          depressed
                          rounded
                          text
                          @click="createChatRoom(post.user_id, post.user_name)"
                          v-if="post.user_id !== $store.getters['auth/getId']"
                        >
                          Chat
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-card>
                </v-menu>
              </div>
              <div class="column is-6 mt-3 ml-6">
                {{ post.topic }}
                <p class="mt-3">{{ post.place }}</p>
                <p class="mt-3">{{ post.post_desc }}</p>
              </div>
              <div class="column is-3 is-mobile">
                <img :src="'http://localhost:8888/'+post.post_image" alt="John" />
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
          :length="pageLength"
          :total-visible="7"
        >
        </v-pagination>
      </div>
      <!-- <div class="column is-12" v-else-if="select == 'lost'">
        <v-pagination
          v-model="page"
          :length="pageLength"
          :total-visible="7"
        >
        </v-pagination>
      </div>
      <div class="column is-12" v-else-if="select == 'found'">
        <v-pagination
        
          v-model="page"
          :length="pageLength"
          :total-visible="7"
        >
        </v-pagination>
      </div> -->
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
              <v-file-input
                label="Change image"
                filled
                prepend-icon="mdi-image"
                v-model="postEdit.post_image"
              ></v-file-input>
              <v-text-field
                label="Topic"
                hide-details="auto"
                value=""
                v-model="postEdit.topic"
              ></v-text-field>
              <v-select
                :items="category_post"
                label="Category post"
                class="mt-6"
                v-model="postEdit.type"
              ></v-select>
              <v-select
                :items="category_item"
                label="Category item"
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
          <button class="button" @click="editPost = false">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../../service/PostService";
import CommentService from "../../service/CommentService";
import ChatService from "../../service/ChatService";
import store from "../../store/index.js";
import { mapGetters } from "vuex";
export default {
  name: "Post",
  data() {
    return {
      store,
      page: 1,
      pageLength: '',
      posts: [],
      commentText: "",
      comments: {},
      date: new Date().toISOString().slice(0, 10),
      editPost: false,
      postEdit: { id:"", topic: "", place: "", post_desc: "", type: "", update_time: "", post_image: ""},
      category_post: ["lost", "found"],
      category_item: [],
      searchposts: "",
      select: "home"
    };
  },
  created: async function () {
    // await PostService.getAllPosts().then((result) => {
    //   console.log(result);
    //   this.posts = result.data;
    // });
    await PostService.selectPage(1).then(result => {
        this.posts = result.data
      })

    let page = (await PostService.getCountPost('home')).data
    this.pageLength = parseInt(page)

  },
  watch: {
    page: async function  (newPage, oldPage) {
      console.log(newPage, oldPage)
      if (this.select == 'home') {
        await PostService.selectPage(this.page).then(result => {
          this.posts = result.data
        })
        this.selectPage(newPage)
      } else if (this.select == 'lost') {
        await PostService.getPostsLost(this.page).then(result => {
          this.posts = result.data
        })
        // this.selectPage(newPage)
      } else if (this.select == 'found') {
        await PostService.getPostsFound(this.page).then(result => {
          this.posts = result.data
        })
      }
      else if (this.select == 'date') {
        await PostService.getPostDate(this.date,this.page).then(result => {
          this.posts = result.data
        })
      }
    }

  },
  methods: {
    async selectPage() {
      console.log('select page')
      await PostService.selectPage(this.page).then(result => {
        console.log(1111111111111111111111,result)
      })
    },
    
    async searchPosts() {
      if (this.searchposts != "") {
        this.select = 'search'
        this.page = 1
        await PostService.searchPostsHome(this.searchposts, 1).then((result) => {
          this.posts = result.data;
          //this.titlePost = "Posts ( " + this.listposts.length + " )";
        });
        let page = (await PostService.getCountPost('search')).data
      this.pageLength = parseInt(page)
      } else {
        this.allposts()
        // await PostService.getAllPosts().then((result) => {
        //   //console.log(result);
        //   console.log(result)
        //   this.posts = result.data;
        //   //this.titlePost = "Posts ( " + this.listposts.length + " )";
        // });
      }
    },
    async getPostbyDate(){
      console.log(this.date)
      this.select = 'date'
      this.page = 1
      await PostService.getPostDate(this.date, 1).then((result) =>{
        this.posts = result.data
      })
      let page = (await PostService.getCountPost('date', this.date)).data
      this.pageLength = parseInt(page)
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
      const fd = new FormData()
      fd.append('topic', this.postEdit.topic)
      fd.append('place', this.postEdit.place)
      fd.append('post_desc', this.postEdit.post_desc)
      fd.append('category_post', this.postEdit.type)
      fd.append('post_image', this.postEdit.post_image)
      fd.append('id', id)
      fd.append('update_time', this.postEdit.update_time)
      for(var i in this.posts){
        if(this.posts[i].post_id == id){
          this.posts[i].topic = this.postEdit.topic
          this.posts[i].place = this.postEdit.place
          this.posts[i].post_desc = this.postEdit.post_desc
          this.posts[i].category_post = this.postEdit.type
          break
        }
      }
      await PostService.editPost(fd).then((result) =>{
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
          this.postEdit.post_image = this.posts[post].post_image;
        } else {
          console.log("not pass");
        }
      }
    },
    async filterLost() {
      // await PostService.getPostsLost().then((result) => {
      //   this.posts = result.data;
      // });
      this.select = 'lost'
      this.page = 1
      await PostService.getPostsLost(1).then(result => {
        this.posts = result.data
      })

      let page = (await PostService.getCountPost('lost')).data
      this.pageLength = parseInt(page)
    },

    async filterFound() {
      this.select = 'found'
      this.page = 1
      await PostService.getPostsFound(1).then((result) => {
        this.posts = result.data;
      });
      let page = (await PostService.getCountPost('found')).data
      this.pageLength = parseInt(page)
    },

    async allposts() {
      this.select = 'home'
      this.page = 1
      // await PostService.getAllPosts().then((result) => {
      //   this.posts = result.data;
      // });
      await PostService.selectPage(1).then(result => {
        this.posts = result.data
      })
      let page = (await PostService.getCountPost('post')).data
      this.pageLength = parseInt(page)
    },
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
    async getComments(postId) {
      //get all comments on each post
      this.commentText = "";
      console.log(postId);
      await CommentService.getComments(postId).then((result) => {
        this.comments = result;
      });
      //alert('comment add'+postId)
    },
    async addComment(postId) {
      await CommentService.createComment({
        postId,
        commentText: this.commentText,
        user_id: this.$store.getters["auth/getId"],
      }).then(async (result) => {
        this.commentText = "";
        this.comments = result;
      });
    },
    async createChatRoom(another_id, another_name) {
      await ChatService.createConversation(
        this.$store.getters["auth/getId"],
        another_id
      );
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
      this.redirect("chatroom");
    },
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
