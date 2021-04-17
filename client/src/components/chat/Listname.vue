<template>
  <div class="list">
    <div
      class="namediv"
      v-for="(room, index) in getRooms"
      :key="room.con_id"
      @click="selectRoom(index)"
    >
      <div class="columns p-3">
        <div class="column is-3">
          <v-avatar color="primary" size="56"
            ><img :src="room.picture"
          /></v-avatar>
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
      
      console.log(window.document.getElementById('chatbox'))
      //let user_id = this.getRooms[index].user_id_1 == this.getId ? this.getRooms[index].user_id_2 : this.getRooms[index].user_id_1
      let user_id = this.getRooms[index].user_id;
      this.$store.dispatch("conversation/setSelectRoom", {
        user_id: user_id,
        user_name: this.getRooms[index].user_name,
      });
      console.log(this.$store.getters["conversation/getSelectRoom"].user_name);
      await ChatService.getMessages({
        user_id: this.$store.getters["auth/getId"],
        another_id: this.getRooms[index].user_id,
      }).then((data) => {
        this.$store.dispatch("conversation/setMessages", data);
      });
      let myDiv = window.document.getElementById('chatbox');
      myDiv.scrollTop = (myDiv.scrollHeight);
    },
  },
  computed: {
    ...mapGetters("conversation", ["getRooms"]),
    ...mapGetters("auth", ["getId"]),
  },
  async created() {
    if (this.getId) {
      await ChatService.getRooms(this.$store.getters["auth/getId"]).then(
        (data) => {
          this.$store.dispatch("conversation/setRooms", data);
          console.log("333333333", data);
        }
      );
    }
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
