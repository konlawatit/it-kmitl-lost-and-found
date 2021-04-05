<template>
  <div>
    <Navbarhome></Navbarhome>
    <FormMyProfile></FormMyProfile>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import FormMyProfile from "../components/formmyprofile/FormMyProfile"
export default {
  name: "MyProfile",
  components: {
    Navbarhome,
    FormMyProfile
  },
};
</script>
<style scoped>

</style>
