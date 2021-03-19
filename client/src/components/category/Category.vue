<template>
  <div class="columns is-centered">
    <div class="column is-6">
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="cyan lighten-1"
        show-arrows
      >
        <v-slide-item v-for="(item, index) in categoryArr" :key="index" v-slot="{ active, toggle }">
          <v-card
            :color="active ? undefined : 'blue darken-4'"
            class="ma-4"
            height="120"
            width="120"
            @click="toggle"
          >
          <img :src="`${publicPath}`+item.url">
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon v-if="active" color="white"></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      model: null,
      categoryArr: [
        {
          id: 1,
          url: 'category/bag.png'
        },
        {
          id: 2,
          url: 'category/costume.png'
        }, 
        {
          id: 3,
          url: 'category/glasses.png'
        }, 
        {
          id: 4,
          url: 'category/electronic.png'
        },
        {
          id: 5,
          url: 'category/electronic.png'
        }]
    };
  },
  created(){
    console.log(this.publicPath)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
