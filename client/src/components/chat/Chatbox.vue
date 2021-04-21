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
    <div class="columns mr-3" v-if="getSelectRoom.user_id">
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
    //ช่อง socket ในการส่งข้อความ
    socket.on("chat", async (msg, another_id) => {
      //เช็คว่าได้เลือกห้องหรือ ข้อความที่คนอื่นส่งมาตรงกับ user_id เราหรือไม่
      if (this.getSelectRoom.user_id && another_id == this.getId) {
        console.log("event 11111111111111111", another_id)
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
    });
  },
  async mounted() {
    //กรณีมาจาก chat ตรงๆ
    if (this.getSelectRoom.user_id) {
      await ChatService.getMessages({
        user_id: this.getId,
        another_id: this.getSelectRoom.user_id,
      }).then((data) => {
          this.$store.dispatch("conversation/setMessages", data);
        });
      let myDiv = window.document.getElementById('chatbox'); //ส่งให้ข้อความเลื่อลงด้านล่างของ componetn Chatbox
      myDiv.scrollTop = (myDiv.scrollHeight);
    }
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
