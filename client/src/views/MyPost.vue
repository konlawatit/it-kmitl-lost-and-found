<template>
  <div>
    <Navbarhome></Navbarhome>
    <Category></Category>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-7">
        <MyPost></MyPost>
      </div>
      <div class="column is-4 is-mobile is-tablet is-desktop">
        <PreviousPost></PreviousPost>
      </div>
    </div>
    <IconChat></IconChat>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import Category from "../components/category/Category"
import MyPost from "../components/post/MyPost"
import PreviousPost from "../components/post/PreviousPost"
import IconChat from "../components/IconChat"
export default {
  name: "CreatePost",
  components: {
    Navbarhome,
    Category,
    MyPost,
    PreviousPost,
    IconChat
  },
};
</script>
<style scoped>

</style>
