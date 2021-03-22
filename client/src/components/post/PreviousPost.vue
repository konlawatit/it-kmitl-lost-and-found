<template>
  <div class="box m-6">
    <p class="is-size-3 has-text-centered" id="prepost">
      <span>โพสต์ก่อนหน้านั้น</span>
    </p>
    <v-card
      class="mx-auto mt-6"
      max-width="430"
      outlined
      v-for="(item, i) in 3"
      :key="i"
      id="cardprepost"
    >
      <v-list-item three-line>
        <div class="columns">
          <div class="column is-8">
            <v-list-item-content>
              <div class="overline is-white" id="prepost">10/02/2564 02:25</div>
              <v-list-item-title class="headline mb-1 is-size-6" id="prepost">
                ธีรภัทร์ บุญช่วยแล้ว<br />
              </v-list-item-title>
              <v-list-item-subtitle id="prepost">
                <v-chip class="ma-1 mr-2 mt-3" color="primary"> M03 </v-chip>
                <v-chip class="ma-1 mr-2 mt-3" color="primary"> L207 </v-chip
                ><br />
              </v-list-item-subtitle>
            </v-list-item-content>
          </div>
          <div class="column is-4">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
              class="mt-3 is-tablet"
            />
          </div>
        </div>
      </v-list-item>
      <div class="columns">
        <div class="column is-12">
          <p class="ml-3 mb-6" id="prepost">
            ตามหาหูฟังสีขาวครับใครพบเจอติดต่อด้วยครับ กราบงามๆ 3 ที
            ใครเจอมีรางวัลให้นะ
          </p>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      page: 1,
    };
  },
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
img{
    width: 100%;
    margin-bottom: 1rem;
}
.box{
    background: #0f3057;
    border-radius: 2rem;
}
span{
    color:white
}
</style>
