<template>
  <div>
    <Navbarhome></Navbarhome>
    <div class="columns mt-6">
      <div class="column is-2"></div>
      <div class="column is-8">
        <Graphs></Graphs>
      </div>
      <div class="column is-2"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import Graphs from "../components/graphs/Graphs"
export default {
  name: "CreatePost",
  components: {
    Navbarhome,
    Graphs
  },
};
</script>
<style scoped>

</style>
