<template>
  <div>
    <Navbarhome></Navbarhome>
    <Category></Category>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-8">
        <Filterpost></Filterpost>
      </div>
      <div class="column is-3"></div>
    </div>
    <div class="columns">
      <div class="column is-1"></div>
      <div class="column is-7">
        <Post></Post>
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
import Filterpost from "../components/filterpost/Filterpost"
import Post from "../components/post/Post"
import PreviousPost from "../components/post/PreviousPost"
import IconChat from "../components/IconChat"
export default {
  name: "CreatePost",
  components: {
    Navbarhome,
    Category,
    Filterpost,
    Post,
    PreviousPost,
    IconChat
  },
};
</script>
<style scoped>

</style>
