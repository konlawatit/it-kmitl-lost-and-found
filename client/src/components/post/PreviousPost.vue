<template>
  <div class="box m-6">
    <p class="is-size-3 has-text-centered" id="prepost">
      <span>โพสต์ก่อนหน้านั้น</span>
    </p>
    <v-card
      class="mx-auto mt-6"
      max-width="430"
      outlined
      v-for="item in preposts"
      :key="item"
      id="cardprepost"
    >
      <v-list-item three-line>
        <div class="columns">
          <div class="column is-8">
            <v-list-item-content>
              <div class="overline is-white" id="prepost">
                {{ item.post_time }} {{ item.post_date }}
              </div>
              <v-list-item-title class="headline mb-1 is-size-6" id="prepost">
                {{ item.topic }}<br />
              </v-list-item-title>
              <v-list-item-subtitle id="prepost">
                <v-list-item-title class="is-size-6" id="prepost">
                   <v-chip class="ma-2" color="blue" label text-color="white"  v-if="item.category_post == 'found'">
                    {{ item.category_post }}
                  </v-chip>
                  <v-chip class="ma-2" color="pink" label text-color="white"  v-if="item.category_post == 'lost'">
                    {{ item.category_post }}
                  </v-chip>
                  {{ item.place }}
                </v-list-item-title>
                <br />
              </v-list-item-subtitle>
            </v-list-item-content>
          </div>
          <div class="column is-4">
            <img :src="item.post_picture" alt="John" />
          </div>
        </div>
      </v-list-item>
      <div class="columns">
        <div class="column is-12">
          <p class="ml-3 mb-6" id="prepost">
            {{item.post_desc}}
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-10"></div>
        <div class="column is-1 ml-3 mb-2">
          <button @click="redirect('detail/'+item.post_id)">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import PostService from "../../service/PostService";
export default {
  name: "Post",
  data() {
    return {
      page: 1,
      allposts: [],
      preposts: [],
    };
  },
  created: async function () {
    await PostService.getAllPosts().then((result) => {
      console.log(result);
      this.allposts = result.data;
      for (var i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * this.allposts.length);
        this.preposts.push(this.allposts[index]);
      }
    });
  },
  methods:{
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#prepost {
  font-family: "Kanit", sans-serif !important;
  color: black !important;
}
#cardprepost {
  background-color: white;
  border-radius: 20px;
}
img {
  width: 100%;
  margin-bottom: 1rem;
}
.box {
  background: #0f3057;
  border-radius: 2rem;
}
span {
  color: white;
}
</style>