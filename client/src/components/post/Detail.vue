<template>
  <div>
    <div class="columns" id="body">
      <div class="column is-12">
        <v-expansion-panels focusable id="post" class="mt-3">
          <v-expansion-panel v-for="(post, i) in posts" :key="i" class="mt-6">
            <button
              class="fas fa-ellipsis-h m-3"
              style="float: right; font-size: 1.3rem"
              v-if="
                post.user_id == store.getters['auth/getId'] ||
                store.getters['auth/getRole'] == 'admin'
              "
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
                  <v-chip
                    class="ma-2"
                    color="blue"
                    label
                    text-color="white"
                    v-if="post.category_post == 'found'"
                  >
                    {{ post.category_post }}
                  </v-chip>
                  <v-chip
                    class="ma-2"
                    color="pink"
                    label
                    text-color="white"
                    v-else
                  >
                    {{ post.category_post }}
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
                <img :src="post.post_picture" alt="John" />
              </div>
            </div>
            <v-expansion-panel-header @click="getComments(post.post_id)">
              Comments</v-expansion-panel-header
            >
            <v-expansion-panel-content class="mt-6">
              <div
                class="columns"
                v-for="comment in comments"
                :key="comment.comment_no"
                :id="comment.comment_no"
              >
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
                          <v-btn
                            depressed
                            rounded
                            text
                            @click="
                              createChatRoom(comment.user_id, comment.user_name)
                            "
                            v-if="
                              comment.user_id !== $store.getters['auth/getId']
                            "
                          >
                            Chat
                          </v-btn>
                        </div>
                      </v-list-item-content>
                    </v-card>
                  </v-menu>
                </div>
                <div class="column">
                  {{ comment.user_name }}
                  <span class="has-text-grey"
                    >{{ comment.comment_date }} เวลา
                    {{ comment.comment_time }} น.
                  </span>
                  <button
                    class="fas fa-ellipsis-h m-3"
                    style="float: right; font-size: 1.3rem"
                    v-if="
                      comment.user_id == store.getters['auth/getId'] ||
                      store.getters['auth/getRole'] == 'admin'
                    "
                    @click="editComment(comment.comment_no, comment.comment_desc, post.post_id)"
                  ></button>
                  <br />
                  <p class="mt-2">{{ comment.comment_desc }}</p>
                </div>
              </div>
              <div class="columns">
                <div class="column is-10">
                  <input
                    type="text"
                    placeholder="comments"
                    class="input is-black"
                    v-model="commentText"
                  />
                </div>
                <div class="column is-2">
                  <button
                    @click="addComment(post.post_id)"
                    class="button is-info"
                  >
                    เพิ่มความคิดเห็น
                  </button>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
          <button
            class="button is-success"
            @click="confrimEditPost(postEdit.id)"
          >
            Save changes
          </button>
          <button class="button is-danger">Delete post</button>
          <button class="button" @click="editPost = false">Cancel</button>
        </footer>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': editcomment }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered is-size-3 mt-4">
            Edit comment
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="editcomment = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="columns" id="listedit">
            <div class="column is-12 is-size-2 has-text-centered">
              <input type="text" class="input" placeholder="comment" v-model="inputcomment"/>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="confirmEditComment(commentid)"
          >
            Save changes
          </button>
          <button class="button is-danger" @click="deleteComment()">Delete comment</button>
          <button class="button" @click="editcomment = false">Cancel</button>
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
      posts: [],
      commentText: "",
      comments: {},
      date: new Date().toISOString().slice(0, 10),
      editPost: false,
      postEdit: { id: "", topic: "", place: "", post_desc: "", type: "" },
      items: ["lost", "found"],
      editcomment: false,
      inputcomment: "",
      commentid: "",
      postid: "",
    };
  },
  created: async function () {
    await PostService.getonePosts(this.$route.params.id).then((result) => {
      console.log(result);
      this.posts = result.data;
    });
  },
  methods: {
    async deleteComment(){
      await this.$swal.fire({
          title: "ยืนยัน",
          text: "ต้องการลบ comment หรือไม่",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then(async (result) =>{
          if(result.isConfirmed){
            let index = 0
            for (var i in this.comments){
              if(this.comments[i].comment_no == this.commentid){
                index = i
                break
              }
            }
            this.comments.splice(index, 1)
            this.editcomment = false
            try {
              await CommentService.deleteComment(this.commentid).then((result) => {
                console.log(result);
              });
            } catch (err) {
              console.log(err);
            }
          }
        })
    },
    async confirmEditComment(id){
      for (const item of this.comments){
        if(item.comment_no == id){
          console.log('pass')
          item.comment_desc = this.inputcomment
          break
        }
      }
      let payload = {comment_no: id, comment_desc: this.inputcomment, post_id: this.postid}
      await CommentService.editComment(payload).then((result) =>{
        console.log(result)
        this.editcomment = false
      })
    },
    editComment(id, comment, postid){
      console.log(id)
      this.editcomment = true
      this.inputcomment = comment
      this.commentid = id
      this.postid = postid
    },
    async confrimEditPost(id) {
      console.log(id);
      for (var i in this.posts) {
        if (this.posts[i].post_id == id) {
          console.log("pass");
          this.posts[i].topic = this.postEdit.topic;
          this.posts[i].place = this.postEdit.place;
          this.posts[i].post_desc = this.postEdit.post_desc;
          this.posts[i].category_post = this.postEdit.type;
          break;
        }
      }
      await PostService.editPost(this.postEdit).then((result) => {
        console.log(result);
        this.editPost = false;
      });
    },
    modalEditPost(id) {
      this.editPost = true;
      for (var post in this.posts) {
        if (id == this.posts[post].post_id) {
          console.log("pass");
          this.postEdit.id = id;
          this.postEdit.topic = this.posts[post].topic;
          this.postEdit.place = this.posts[post].place;
          this.postEdit.post_desc = this.posts[post].post_desc;
          this.postEdit.type = this.posts[post].category_post;
        } else {
          console.log("not pass");
        }
      }
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
.modal {
  font-family: "Kanit", sans-serif;
}
</style>
