<template>
  <div class="home">
    <NavbarHome></NavbarHome>
    <Category></Category>
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
import NavbarHome from "../components/navbar/Navbarhome";
import Category from "../components/category/Category"
import Post from "../components/post/Post"
import PreviousPost from "../components/post/PreviousPost"
import IconChat from "../components/IconChat"
export default {
  name: "Home",
  components: {
    NavbarHome,
    Category,
    Post,
    PreviousPost,
    IconChat
  },
};
</script>
<style scoped>
.body {
  padding-top: 9rem;
}
</style>
