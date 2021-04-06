<template>
  <div>
    <div id="mybutton">
      <button class="feedback" @click="redirect('chatroom')"><i class="fas fa-comments"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
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
.feedback {
  background-color : #31B0D5;
  color: white;
  padding: 0.2rem;
  font-size: 3rem;
  border-radius: 10rem;
  border-color: #46b8da;
  width: 5rem;
}

#mybutton {
  position: fixed;
  bottom: 1rem;
  right: 2rem;
}

.feedback:hover{
    background-color: #0d556b;
    transition: 0.3s;
}
</style>
