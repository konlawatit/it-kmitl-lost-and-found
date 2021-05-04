<template>
  <div class="columns is-centered">
    <div class="column is-12">
      <div class="columns">
        <div class="column is-2"></div>
        <div class="column is-8" width="700">
          
          <v-slide-group
            v-model="model"
            class="pa-4"
            active-class="cyan lighten-1"
            show-arrows
            max-width="700"
          >
            <v-slide-item
              v-for="(item, index) in categoryItems"
              :key="index"
              v-slot="{ active, toggle }"
            >
              <v-card
                :color="active ? undefined : 'blue darken-4'"
                class="ma-4 is-centered"
                height="130"
                width="140"
                @click="toggle"
              >
                <img width="40" height="40"  :src="item.image" />
                <p class="mt-3">{{ item.name }}</p>
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-icon v-if="active" color="white"></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </div>
        <div class="column is-2"></div>
      </div>
    </div>
  </div>

</template>

<script>
import PostService from "../../service/PostService"
export default {
  name: "Category",
  data() {
    return {
      publicPath: process.env.BASE_URL,
      model: null,
      categoryItems: [],
      categoryArr: [
        {
          id: 1,
          url: "category/bag.png",
          title: "Bag",
        },
        {
          id: 2,
          url: "category/costume.png",
          title: "Costume",
        },
        {
          id: 3,
          url: "category/glasses.png",
          title: "Glasses",
        },
        {
          id: 4,
          url: "category/electronic.png",
          title: "Electronic",
        },
        {
          id: 5,
          url: "category/electronic.png",
          title: "Electronic",
        },
        {
          id: 1,
          url: "category/bag.png",
          title: "Bag",
        },
        {
          id: 2,
          url: "category/costume.png",
          title: "Costume",
        },
        {
          id: 3,
          url: "category/glasses.png",
          title: "Glasses",
        },
        {
          id: 4,
          url: "category/electronic.png",
          title: "Electronic",
        },
        {
          id: 5,
          url: "category/electronic.png",
          title: "Electronic",
        },
      ],
    };
  },
  methods: {
  },
  async created() {
    console.log('path', this.publicPath);
    console.log('base path', process)
    await PostService.getCategoryItems().then(val => {
        this.categoryItems = val.items.result
      })
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  margin-left: 2rem;
  margin-top: 1rem;
}
p {
  text-align: center;
  color: white;
}
</style>
