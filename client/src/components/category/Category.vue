<template>
  <div class="container">
    <div class="columns is-mobile is-centered mt-1">
      <div class="column is-12" id="categoryitem">
        <div class="columns">
          <button class="button" id="iconleft">
            <i class="fas fa-angle-left" id="angle"></i>
          </button>
          <div class="column is-1" id="item">
            <img src="./bag.png" alt="" />
            <p class="textitem mt-1">Bag</p>
          </div>
          <div class="column is-1" id="item">
            <img src="./costume.png" alt="" />
            <p class="textitem mt-1">Costume</p>
          </div>
          <div class="column is-1" id="item">
            <img src="./glasses.png" alt="" />
            <p class="textitem mt-1">Glasses</p>
          </div>
          <div class="column is-1" id="item">
            <img src="./electronic.png" alt="" />
            <p class="textitem mt-2">Electronic</p>
          </div>
          <button class="button" id="iconright">
            <i class="fas fa-angle-right" id="angle"></i>
          </button>
          <div class="column is-2"></div>
          <div class="column is-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#iconleft {
  height: 5.5rem;
  background-color: #0f3057;
  color: rgb(245, 243, 243);
  border: 0px;
  border-radius: 1rem 0rem 0rem 1rem;
}
#item {
  background-color: #0f3057;
  height: 5.5rem;
}
#iconright {
  height: 5.5rem;
  background-color: #0f3057;
  color: rgb(245, 243, 243);
  border: 0px;
  border-radius: 0rem 1rem 1rem 0rem;
}
#item:hover{
    background-color: #61cbd2;
    transition-duration: 0.4s;
}
#iconleft:hover, #iconright:hover{
    background-color: #61cbd2;
    transition-duration: 0.4s;
}
#angle {
  font-size: 3rem;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.textitem {
  text-align: center;
  font-family: "Kanit", sans-serif;
  color: rgb(245, 243, 243);
}
</style>
