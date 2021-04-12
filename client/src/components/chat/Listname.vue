<template>
  <div class="list">
    <div class="namediv" v-for="name in name" :key="name">
      <div class="columns p-3">
        <div class="column is-3">
          <v-avatar color="primary" size="56"></v-avatar>
        </div>
        <div class="column is-9">
          <div class="mt-4 is-size-6">
            {{ name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Listname",
  data() {
    return {
      name: [
        "นายธีรภัทร์ บุญช่วยแล้ว",
        "นายกลวัชร หัสไทรทอง",
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  font-family: "Kanit", sans-serif;
  background: #103766;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 80.5vh;
  color: white;
}
.namediv :hover {
  background: #faf3e0;
  color:black
}
</style>
