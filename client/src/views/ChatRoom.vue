<template>
  <div>
    <Navbarhome></Navbarhome>
    <div class="columns">
      <div class="column is-3">
        <Listname></Listname>
      </div>
      <div class="column is-9">
        <Chatbox></Chatbox>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import Listname from "../components/chat/Listname"
import Chatbox from "../components/chat/Chatbox"
export default {
  name: "ChatRoom",
  components: {
    Navbarhome,
    Listname,
    Chatbox
  },
};
</script>
<style scoped>

</style>
