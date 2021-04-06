<template>
  <div>
    <Navbarhome></Navbarhome>
    <div class="columns mt-2">
      <div class="column is-12 has-text-centered">
        <h2 class="is-size-2 mb-1" id="text1">
          <strong>จัดอันดับ</strong>
          <strong id="text2">แต้มบุญ</strong>
        </h2>
      </div>
    </div>
    <div class="columns mt-6">
      <div class="column is-1"></div>
      <div class="column is-10">
        <Graphs></Graphs>
      </div>
      <div class="column is-2"></div>
    </div>
    <IconChat></IconChat>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import Graphs from "../components/graphs/Graphs";
import IconChat from "../components/IconChat"
export default {
  name: "CreatePost",
  components: {
    Navbarhome,
    Graphs,
    IconChat
  },
};
</script>
<style scoped>
#text1 {
  font-family: "Kanit", sans-serif;
  color: black;
}
#text2 {
  font-family: "Kanit", sans-serif;
  color: #00878f;
}
</style>
