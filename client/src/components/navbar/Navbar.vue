<template>
  <div>
    <v-app-bar
      dark
      class="mx-auto overflow-hidden"
      color= "#0f3057"
      height="80"
    >
    
      <v-toolbar-title class="logo">
        <a href="">
          <img src="./lost 2.png">
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <a @click="redirect('home')"
      style="cursor: pointer;"
        ><button class="button mr-6 is-info"  go>
          <i class="fa fa-home mr-2" aria-hidden="true" ></i>
          Home
        </button></a>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods:{
    goHome(){
      this.$router.push('/')
      this.$router.go()
    },
    redirect(path) {
      console.log("redirect to : ", path);
      this.$router.push(`/${path}`);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  margin-top: 0.2rem !important;
}
.but{
  margin-left: 1rem !important;
}
</style>
