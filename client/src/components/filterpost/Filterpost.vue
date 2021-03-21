<template>
  <div class="columns">
    <div class="column is-1"></div>
    <div class="column is-7">
      <v-btn-toggle tile color="blue darken-4" group>
        <v-btn id="buttonfilter" value="all"> ทั้งหมด </v-btn>

        <v-btn id="buttonfilter" value="find"> ตามหาของ </v-btn>

        <v-btn id="buttonfilter" value="owner"> ตามหาเจ้าของ </v-btn>

        <input type="date" class="input mt-2" v-model="date"/>
      </v-btn-toggle>
    </div>
    <div class="column is-4"></div>
  </div>
</template>

<script>
export default {
  name: "filterpost",
  data() {
    return {
      date: new Date().toISOString().slice(0, 10)
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#buttonfilter {
  font-family: "Kanit", sans-serif;
  border-radius: 20rem;
}
</style>
