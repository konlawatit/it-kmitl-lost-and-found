<template>
  <div>
    <Navbarcreate></Navbarcreate>
    <div class="columns mt-6 mb-6">
      <div class="column is-1"></div>
      <div class="column is-7">
        <FormCreatePost></FormCreatePost>
      </div>
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
