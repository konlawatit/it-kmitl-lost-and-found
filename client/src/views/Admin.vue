<template>
  <div>
    <Navbarhome></Navbarhome>
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-8">
        <CountPostandUser></CountPostandUser>
      </div>
      <div class="column is-2"></div>
    </div>
    <div class="columns">
        <div class="column is-2"></div>
        <div class="column is-9">
            <ListItem></ListItem>
        </div>
        <div class="column is-1"></div>
    </div>
    <IconChat></IconChat>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbarhome from "../components/navbar/Navbarhome";
import CountPostandUser from "../components/admin/Count";
import ListItem from "../components/admin/Listitem"
import IconChat from "../components/IconChat";
export default {
  name: "Admin",
  components: {
    Navbarhome,
    IconChat,
    CountPostandUser,
    ListItem
  },
};
</script>
<style scoped>
</style>
