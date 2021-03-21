<template>
  <div class="home">
    <NavbarHome></NavbarHome>
    <Category></Category>
    <Filterpost></Filterpost>
    <Post></Post>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarHome from "../components/navbar/Navbarhome";
import Category from "../components/category/Category"
import Filterpost from "../components/filterpost/Filterpost"
import Post from "../components/post/Post"
export default {
  name: "Home",
  components: {
    NavbarHome,
    Category,
    Filterpost,
    Post,
  },
};
</script>
<style scoped>
.body {
  padding-top: 9rem;
}
</style>
