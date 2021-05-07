<template>
  <div class="list">
    <div
      class="namediv"
      :class="{
        'has-background-link-light has-text-black':
          room.user_id == getSelectRoom.user_id,
      }"
      v-for="(room, index) in getRooms"
      :key="room.con_id"
    >
      <div class="columns p-3" @click="selectRoom(index)">
        <div class="column is-3">
          <v-badge avatar bordered overlap :value="room.notification">
            <template v-slot:badge>
              <v-avatar class="has-background-danger">
                {{ room.notification }}
              </v-avatar>
            </template>
            <v-avatar color="primary" size="56">
              <img :src="room.image" />
            </v-avatar>
          </v-badge>
        </div>

        <div class="column is-9">
          <div class="mt-4 is-size-6">
            {{ room.user_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
const socket = io("http://localhost:8888");
import ChatService from "../../service/ChatService";
import { mapGetters } from "vuex";
export default {
  name: "Listname",
  data() {
    return {
      // conversations_room: [
      //   {
      //     user_id: 62070011,
      //     user_name: 'ซ้อฟิล์ม'
      //   },
      //   {
      //     user_id: 62070096,
      //     user_name: 'นายธีรภัทร์ บุญช่วยแล้ว'
      //   },
      // ],
      // name: [
      //   "นายธีรภัทร์ บุญช่วยแล้ว",
      //   "นายกลวัชร หัสไทรทอง",
      // ],
    };
  },
  methods: {
    async selectRoom(index) {
      //let user_id = this.getRooms[index].user_id_1 == this.getId ? this.getRooms[index].user_id_2 : this.getRooms[index].user_id_1
      let user_id = this.getRooms[index].user_id;
      let con_id = this.getRooms[index].con_id;

      this.$store.dispatch("conversation/setSelectRoom", {
        user_id: user_id,
        user_name: this.getRooms[index].user_name,
        con_id: con_id,
      });

      await ChatService.getMessages({
        user_id: this.$store.getters["auth/getId"],
        another_id: this.getRooms[index].user_id,
      }).then((data) => {
        this.$store.dispatch("conversation/setMessages", data);
      });

      await ChatService.clearNoti(
        this.getId,
        this.getRooms[index]["con_id"]
      ).then(() => {
        console.log("clear noti");
        this.getRooms[index]["notification"] = 0; //reset noti ให้เป็ร 0 เมื่อกด
      });

      let myDiv = window.document.getElementById("chatbox"); //ส่งให้ข้อความเลื่อลงด้านล่างของ componetn Chatbox
      myDiv.scrollTop = myDiv.scrollHeight;
    },
  },
  async mounted() {
    if (this.getId) {
      socket.on("noti_chat", async (sender_id, con_id) => {
        if (this.$router.app.$route.fullPath == "/chatroom") {
          if (this.getId != sender_id) {
            //ไม่เอาแชทของตัวเอง
            if (this.getSelectRoom.user_id != sender_id) {
              //จะขึ้น noti กับ chat ที่ไม่ได้เลือก
              this.getRooms.map((room) => {
                if (room.con_id == con_id) {
                  room["notification"] += 1;
                }
                return room;
              });
              //this.$store.dispatch("conversation/seteRooms", setRoom)
              console.log("noto_chat", sender_id);
            }
          }
        }
      });
    }
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
  },
  computed: {
    ...mapGetters("conversation", ["getRooms", "getSelectRoom"]),
    ...mapGetters("auth", ["getId"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  font-family: "Kanit", sans-serif;
  background: #103766;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 80.5vh;
  color: white;
}
.namediv :hover {
  background: #faf3e0;
  color: black;
}
</style>
