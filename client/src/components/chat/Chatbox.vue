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
            <div class="column is-4 mt-2" id="mes" v-if='message.is_image'>
              <img :src="'http://localhost:8888/'+message.content" alt="">
            </div>
            <div class="column is-4 mt-2" id="mes" v-else>
              <p>
                {{ message.content }}
              </p>
            </div>
          </div>
          <div class="columns mt-3 mr-6" v-else :key="index">
            <div class="column is-8"></div>
            <div class="column is-4 mt-2" id="mes2" v-if='message.is_image'>
              <img :src="'http://localhost:8888/'+message.content" alt="">
            </div>
            <div class="column is-4 mt-2" id="mes2" v-else>
              <p>
                {{ message.content }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="columns mr-3" v-if="getSelectRoom.user_id">
      <template v-if="inputImage">
        <div class="column">
          <v-file-input
            label="File input"
            filled
            prepend-icon="mdi-camera"
            @change="selectImages"
          ></v-file-input>
        </div>
        <div class="column is-2">
          <button @click="sendMessage" class="button is-info m-2">sent</button>
          <button @click="cancelImage" class="button is-danger m-2">
            Cancel
          </button>
        </div>
      </template>
      <template v-else>
        <div class="column is-10">
          <input
            v-model="msg"
            type="text"
            class="input"
            placeholder="Message"
          />
        </div>
          <button class="button is-info m-2" @click="inputImage = !inputImage">
            <i class="fas fa-image"></i>
          </button>
        <button @click="sendMessage" class="button is-info m-2">sent</button>
      </template>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
import ChatService from "../../service/ChatService";
const socket = io("http://localhost:8888");
import { mapGetters } from "vuex";
export default {
  name: "Chatbox",
  data() {
    return {
      msg: "",
      imagesFile: "",
      inputImage: false,
    };
  },
  methods: {
    async sendMessage() {
      let another_id = this.$store.getters["conversation/getSelectRoom"].user_id;
      let user_id = this.$store.getters["auth/getId"];
      const formData = new FormData();
      formData.append('image', this.imagesFile ? this.imagesFile : null)
      formData.append('user_id', user_id)
      formData.append('another_id', another_id)
      formData.append('message', this.msg)
      await ChatService.sendMessages({
        formData,
        con_id: this.getSelectRoom.con_id
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
      myDiv.scrollTop = myDiv.scrollHeight;
      this.msg = "";
      this.cancelImage()
    },
    selectImages(event) {
      if (event) {
        console.log(event)
        this.imagesFile = event;
      } else {
        this.imagesFile = ""
      }
    },
    cancelImage() {
      this.inputImage = false
      this.imagesFile = null
    }

  },
  computed: {
    ...mapGetters("conversation", ["getSelectRoom", "getMessages"]),
    ...mapGetters("auth", ["getId"]),
    pageHeight() {
      return document.body.scrollHeight;
    },
  },
  created() {
    //ช่อง socket ในการส่งข้อความ
    // socket.on("chat", async (msg, another_id) => {
    //   console.log('11111')
    //   //เช็คว่าได้เลือกห้องหรือ ข้อความที่คนอื่นส่งมาตรงกับ user_id เราหรือไม่
    //   console.log(another_id, another_id,this.getId)
    //   if (this.getSelectRoom.user_id && another_id == this.getId) {
    //     let another_id = this.$store.getters["conversation/getSelectRoom"]
    //       .user_id;
    //     let user_id = this.$store.getters["auth/getId"];
    //     await ChatService.getMessages({
    //       user_id: user_id,
    //       another_id: another_id,
    //     }).then((data) => {
    //       this.$store.dispatch("conversation/setMessages", data);
    //     });
    //     let myDiv = window.document.getElementById("chatbox"); //ส่งให้ข้อความเลื่อลงด้านล่างของ componetn Chatbox
    //     myDiv.scrollTop = myDiv.scrollHeight;
    //   }
    // });
  },
  async mounted() {
    //กรณีมาจาก chat ตรงๆ
    socket.on("chat", async (msg, another_id) => {
      console.log('11111')
      //เช็คว่าได้เลือกห้องหรือ ข้อความที่คนอื่นส่งมาตรงกับ user_id เราหรือไม่
      console.log(another_id, another_id,this.getId)
      if (this.getSelectRoom.user_id && another_id == this.getId) {
        let another_id = this.$store.getters["conversation/getSelectRoom"]
          .user_id;
        let user_id = this.$store.getters["auth/getId"];
        await ChatService.getMessages({
          user_id: user_id,
          another_id: another_id,
        }).then((data) => {
          this.$store.dispatch("conversation/setMessages", data);
        });
        let myDiv = window.document.getElementById("chatbox"); //ส่งให้ข้อความเลื่อลงด้านล่างของ componetn Chatbox
        myDiv.scrollTop = myDiv.scrollHeight;
      }
    });

    if (this.getSelectRoom.user_id) {
      await ChatService.getMessages({
        user_id: this.getId,
        another_id: this.getSelectRoom.user_id,
      }).then((data) => {
        this.$store.dispatch("conversation/setMessages", data);
      });
      let myDiv = window.document.getElementById("chatbox"); //ส่งให้ข้อความเลื่อลงด้านล่างของ componetn Chatbox
      myDiv.scrollTop = myDiv.scrollHeight;
    }
  },
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
