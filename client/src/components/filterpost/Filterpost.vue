<template>
  <div class="columns is-mobile is-tablet">
    <div class="column is-8">
      <v-btn-toggle tile color="blue darken-4" group>
        <v-btn id="buttonfilter" value="all" @click="getall()"> ทั้งหมด </v-btn>

        <v-btn id="buttonfilter" value="find"> ตามหาของ </v-btn>

        <v-btn id="buttonfilter" value="owner"> ตามหาเจ้าของ </v-btn>

        <input type="date" class="input mt-2" v-model="date"/>
      </v-btn-toggle>
    </div>
    {{all}}
  </div>
</template>

<script>
export default {
  name: "filterpost",
  data() {
    return {
      date: new Date().toISOString().slice(0, 10),
      all: ""
    };
  },
  methods:{
    getall(){
      this.all = "all"
      return this.all
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#buttonfilter {
  font-family: "Kanit", sans-serif;
  border-radius: 20rem;
}
</style>
