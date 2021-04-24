<template>
  <div>
    <div class="columns" id="body">
      <div class="column is-12">
        <v-expansion-panels
          focusable
          id="post"
          class="mt-3"
        >
          <v-expansion-panel v-for="(post, i) in posts" :key="i" class="mt-6">
            <i
              class="fas fa-ellipsis-h m-3"
              style="float: right; font-size: 1.3rem"
            ></i>
            <div class="columns mt-6 is-mobile">
              <div class="column is-2">
                <div class="ml-3 mt-6 is-size-3">
                  {{post.post_time}}
                  <v-chip class="ma-2" color="pink" label text-color="white">
                    {{post.category_post}}
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
                <img :src="post.post_picture" alt="John" />
              </div>
            </div>
            <v-expansion-panel-header @click="getComments(post.post_id)"> Comments</v-expansion-panel-header>
            <v-expansion-panel-content class="mt-6">
              <div class="columns" v-for="comment in comments" :key="comment.comment_no" :id="comment.comment_no">
                <div class="column is-1">
                  <v-menu bottom min-width="200px" rounded offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon x-large v-on="on">
                      <v-avatar color="primary" size="50"
                        ><img :src="comment.picture" alt="profile"
                      /></v-avatar>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-list-item-content class="justify-center">
                      <div class="mx-auto text-center">
                        <v-avatar color="brown mb-2">
                          <img :src="comment.picture" alt="profile" />
                        </v-avatar>
                        <h3 class="mt-1">{{ comment.user_name }}</h3>
                        <h3 class="mt-1">
                          {{ comment.firstname }} {{ comment.lastname }}
                        </h3>
                        <p class="caption mt-1">
                          {{ comment.email }}
                        </p>
                        <v-btn depressed rounded text @click="createChatRoom(comment.user_id, comment.user_name)" v-if="comment.user_id !== $store.getters['auth/getId']">
                          Chat
                        </v-btn>
                      </div>
                    </v-list-item-content>
                  </v-card>
                </v-menu>
                </div>
                <div class="column ">
                  {{comment.user_name}} <span class="has-text-grey">{{comment.comment_date}} เวลา {{comment.comment_time}} น. </span>
                  <br />
                  <p class="mt-2">{{comment.comment_desc}}</p>
                </div>
              </div>
              <div class="columns">
                <div class="column is-9">
                  <input
                    type="text"
                    placeholder="comments"
                    class="input is-black"
                    v-model='commentText'
                  />
                </div>
                <div class="column is-2">
                  <button @click="addComment(post.post_id)" class="button is-info">เพิ่มความคิดเห็น</button>
                </div>
              </div>
            </v-expansion-panel-content>
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
  </div>
</template>

<script>
import PostService from "../../service/PostService";
import CommentService from "../../service/CommentService"
import ChatService from "../../service/ChatService"
import store from "../../store/index.js";
import {mapGetters} from "vuex"
export default {
  name: "Post",
  data() {
    return {
      store,
      page: 1,
      posts: [],
      commentText: "",
      comments: {}
    };
  },
  created: async function () {
    await PostService.getMyPosts(store.getters["auth/getId"]).then((result) => {
      console.log(result);
      this.posts = result.data;
    });
  },
  methods: {
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
</style>
