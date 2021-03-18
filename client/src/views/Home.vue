<template>
  <div class="home">
    <NavbarHome></NavbarHome>
    <div class="body">
      <Category></Category>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavbarHome from "../components/navbar/Navbarhome";
import Category from "../components/category/Category"

export default {
  name: "Home",
  components: {
    NavbarHome,
    Category
  },
};
</script>
<style scoped>
.body {
  padding-top: 9rem;
}
</style>
