<template>
  <div>
    <div id="mybutton">
      <v-badge avatar overlap :value="notifications">
        <template v-slot:badge>
          <v-avatar class="has-background-danger">
            {{ notifications }}
          </v-avatar>
        </template>
        <button class="feedback" @click="redirect('chatroom')">
          <i class="fas fa-comments"></i>
        </button>
      </v-badge>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
const socket = io("http://localhost:8888");
import { mapGetters } from "vuex";
import ChatService from "../service/ChatService";
//import ChatService from "../service/ChatService"
export default {
  name: "IconChat",
  data() {
    return {};
  },
  methods: {
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
  },
  computed: {
    ...mapGetters("conversation", ["getRooms"]),
    ...mapGetters("auth", ["getId"]),
    notifications() {
      return this.getRooms.reduce((total, currentValue) => {
        return total + currentValue.notification;
      }, 0);
    },
  },
  async created() {
    if (this.getId) {
      //ให้แสดงผลเมื่อกดมาจากปุ่ม chat
      await ChatService.getRooms(this.$store.getters["auth/getId"]).then(
        async (rooms) => {
          console.log("list name", rooms);
          this.$store.dispatch("conversation/setRooms", rooms);
        }
      );
    }
    // let room = await ChatService.getRooms(this.$store.getters['auth/getId'])
    // console.log('fethc room', room)
    // this.notifications = this.getRooms.reduce((total, currentValue) => {
    //   return total + currentValue.notification
    // }, 0)
    // //this.notifications = room.reduce
    socket.disconnect();
    socket.connect();
    socket.on("noti_chat", async (sender_id, con_id, receiver_id) => {
      console.log("มีคนส่งมาาาาาา");
      if (this.getId == receiver_id) {
        //if (this.$router.app.$route.fullPath == '/home') {
        //\if (this.getSelectRoom.user_id != sender_id) {
        if (!this.getRooms) {
          await ChatService.getRooms(this.$store.getters["auth/getId"]).then(
            async (rooms) => {
              console.log("list name", rooms);
              this.$store.dispatch("conversation/setRooms", rooms);
            }
          );
        }
        this.getRooms.map((room) => {
          console.log(room.notification)
          if (room.con_id == con_id) {
            room["notification"] += 1;
          }
          return room;
        });
        //}
        //this.$store.dispatch("conversation/seteRooms", setRoom)
      }
    });
  },
  async mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.feedback {
  background-color: #31b0d5;
  color: white;
  padding: 0.2rem;
  font-size: 3rem;
  border-radius: 10rem;
  border-color: #46b8da;
  width: 5rem;
}

#mybutton {
  position: fixed;
  bottom: 1rem;
  right: 2rem;
}

.feedback:hover {
  background-color: #0d556b;
  transition: 0.3s;
}
</style>
