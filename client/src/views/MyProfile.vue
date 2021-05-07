<template>
  <div>
    <Navbarhome></Navbarhome>
    <FormMyProfile></FormMyProfile>
    <IconChat></IconChat>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import FormMyProfile from "../components/formmyprofile/FormMyProfile"
import IconChat from "../components/IconChat"
export default {
  name: "MyProfile",
  components: {
    Navbarhome,
    FormMyProfile,
    IconChat
  },
};
</script>
<style scoped>

</style>
