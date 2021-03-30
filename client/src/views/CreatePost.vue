<template>
  <div>
    <Navbarcreate></Navbarcreate>
    <div class="columns mt-6 mb-6">
      <div class="column is-2"></div>
      <div class="column is-8">
        <FormCreatePost></FormCreatePost>
      </div>
      <div class="column is-2"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarcreate from "../components/navbar/Navbarcreate";
import FormCreatePost from "../components/formCreatePost/FormCreatePost"
export default {
  name: "CreatePost",
  components: {
    Navbarcreate,
    FormCreatePost
  },
};
</script>
<style scoped>

</style>
