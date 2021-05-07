<template>
  <div>
    <Navbarhome></Navbarhome>
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-8">
        <Detail></Detail>
      </div>
      <div class="column is-2"></div>
    </div>
    <IconChat></IconChat>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import Detail from "../components/post/Detail";
import IconChat from "../components/IconChat";
export default {
  name: "CreatePost",
  components: {
    Navbarhome,
    Detail,
    IconChat,
  },
};
</script>
<style scoped>
</style>
