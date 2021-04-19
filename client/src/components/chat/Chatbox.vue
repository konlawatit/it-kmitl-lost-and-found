<template>
  <div>
    <div class="columns mt-1">
      <div class="column is-12 is-size-6" id="chatname">
        <div class="m-2">{{ getSelectRoom.user_name }}</div>
      </div>
    </div>
    <div class="columns mt-3 ml-2" id="chatbox">
      <div class="column is-12">
        <template v-for="(message, index) in getMessages">
          <div
            class="columns"
            v-if="message.message_by != $store.getters['auth/getId']"
            :key="index"
          >
            <!-- <div class="column is-1">
              <v-avatar color="primary" size="70"><img :src="message.picture"
          /></v-avatar>
            </div> -->
            <div class="column is-4 mt-2" id="mes">
              <p>
                {{ message.content }}
              </p>
            </div>
          </div>
          <div class="columns mt-3 mr-6" v-else :key="index">
            <div class="column is-8"></div>
            <div class="column is-4 mt-2" id="mes2">
              <p>
                {{ message.content }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="columns mr-3">
      <div class="column is-1" id="media">
        <button class="button is-info"><i class="fas fa-image"></i></button>
      </div>
      <div class="column is-10">
        <input v-model="msg" type="text" class="input" placeholder="Message" />
      </div>
      <div class="column is-1">
        <button @click="sendMessage" class="button is-info">sent</button>
      </div>
    </div>
  </div>
</template>

<script>

import { io } from "socket.io-client";
import ChatService from "../../service/ChatService";
const socket = io("http://localhost:8888");
import { mapGetters } from "vuex";
//const socket = io();
console.log("socket", socket);
export default {
  name: "Chatbox",
  data() {
    return {
      msg: "",
      
    };
  },
  methods: {
    async sendMessage() {
      // await axios.post("http://localhost:8888/apis/chat/message/", {
      //   message: this.msg,user_id: 62070007, another_id: 62070011
      // });
      let another_id = this.$store.getters["conversation/getSelectRoom"]
        .user_id;
      console.log("anot", another_id);
      let user_id = this.$store.getters["auth/getId"];
      await ChatService.sendMessages({
        user_id: user_id,
        another_id: another_id,
        message: this.msg,
      }).then(async () => {
        await ChatService.getMessages({
          user_id: user_id,
          another_id: another_id,
        }).then((data) => {
          console.log(data);
          this.$store.dispatch("conversation/setMessages", data);
        });
      });
      let myDiv = document.getElementById("chatbox");
      myDiv.scrollTop = (myDiv.scrollHeight);
      // console.log("eeee", socket.id);
      // socket.emit("chat message", this.msg);
      // socket.emit("test", this.msg);
      this.msg = "";
    },
  },
  computed: {
    ...mapGetters("conversation", ["getSelectRoom", "getMessages"]),
    ...mapGetters("auth", ["getId"]),
    pageHeight () {
      return document.body.scrollHeight
    }
  },
  created() {
    // socket.on("connect", () => {
    //   console.log("socket id", socket.id);
    // });
    
    socket.on("event1", async (msg) => {
      console.log("event1", msg);
      let another_id = this.$store.getters["conversation/getSelectRoom"].user_id;
      let user_id = this.$store.getters["auth/getId"];
      
      await ChatService.getMessages({
        user_id: user_id,
        another_id: another_id,
      }).then((data) => {
        this.$store.dispatch("conversation/setMessages", data);
      });
    });
    // socket.on('chat message', function (msg) {
    //    console.log(msg)
    //  })

    // socket.on('chat message', (msg) => {
    //   console.log('event2', msg)
    // })
  },
  async mounted() {
    let another_id = this.$store.getters["conversation/getSelectRoom"].user_id;
      let user_id = this.$store.getters["auth/getId"];
      
      await ChatService.getMessages({
        user_id: user_id,
        another_id: another_id,
      }).then((data) => {
        this.$store.dispatch("conversation/setMessages", data);
      });
    let myDiv = window.document.getElementById('chatbox'); //ส่งให้ข้อความเลื่อลงด้านล่างของ componetn Chatbox
      myDiv.scrollTop = (myDiv.scrollHeight);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chatname {
  font-family: "Kanit", sans-serif;
  background: #103766;
  color: white;
}
#chatbox {
  height: 60vh;
  overflow-y: scroll;
  scroll-padding-bottom: 5000px;
}
#mes {
  background: #103766;
  color: white;
  word-wrap: break-word;
  border-radius: 1rem;
}
#mes2 {
  background: white;
  color: black;
  word-wrap: break-word;
  border-radius: 1rem;
}
</style>
