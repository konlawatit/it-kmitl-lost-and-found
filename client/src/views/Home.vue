<template>
  <div class="home">
    <NavbarHome></NavbarHome>
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
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarHome from "../components/navbar/Navbarhome";
import Category from "../components/category/Category"
import Filterpost from "../components/filterpost/Filterpost"
import Post from "../components/post/Post"
import PreviousPost from "../components/post/PreviousPost"
export default {
  name: "Home",
  components: {
    NavbarHome,
    Category,
    Filterpost,
    Post,
    PreviousPost
  },
};
</script>
<style scoped>
.body {
  padding-top: 9rem;
}
</style>
