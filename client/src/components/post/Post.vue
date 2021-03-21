<template>
  <div>
    <div class="columns" id="body">
      <div class="column is-1"></div>
      <div class="column is-7">
        <h1 class="ml-2 is-size-3">
          <strong>20 มี.ค. 2564</strong>
        </h1>
        <v-expansion-panels focusable id="post" class="mt-3">
          <v-expansion-panel v-for="(item, i) in 5" :key="i" class="mt-6">
            <i
              class="fas fa-ellipsis-h m-3"
              style="float: right; font-size: 1.3rem"
            ></i>
            <div class="columns mt-6 is-mobile">
              <div class="column is-2">
                <div class="ml-6 mt-6">12:59</div>
                <div class="mt-2">
                  <v-chip class="ma-2" color="primary">ประเภท</v-chip>
                </div>
              </div>
              <div class="column is-1 mt-6">
                <v-avatar color="primary" size="60">TB</v-avatar>
              </div>
              <div class="column is-6 mt-3 ml-6">
                ธีรภัทร์ บุญช่วยแล้ว
                <v-chip class="ma-2" color="primary">M03</v-chip>
                <v-chip class="ma-2" color="primary">L207</v-chip><br />
                <p class="mt-3">ใครเจอโทรศัพท์บ้างครับ</p>
              </div>
              <div class="column is-2 is-mobile">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </div>
            </div>
            <v-expansion-panel-header> Comments </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-6">
              <div class="columns">
                <div class="column is-1">
                  <v-avatar color="primary" size="40">TT</v-avatar>
                </div>
                <div class="column is-6">
                  13:24 น.
                  <br />
                  <p class="mt-2">ไม่เจอเลยครับ</p>
                </div>
              </div>
              <div class="columns">
                <div class="column is-1">
                  <v-avatar color="red" size="40">AA</v-avatar>
                </div>
                <div class="column is-6">
                  13:30 น.
                  <br />
                  <p class="mt-2">เจอค่ะ</p>
                </div>
              </div>
              <div class="columns">
                <div class="column is-9">
                  <input
                    type="text"
                    placeholder="comments"
                    class="input is-black"
                  />
                </div>
                <div class="column is-2">
                  <button class="button is-info">เพิ่มความคิดเห็น</button>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="column is-4">
        <p class="is-size-3 has-text-centered"><strong>โพสต์ก่อนหน้านั้น</strong></p>
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
              <div class="column is-8 is-mobile">
                <v-list-item-content>
                  <div class="overline is-white" id="prepost">
                    10/02/2564 02:25
                  </div>
                  <v-list-item-title
                    class="headline mb-1 is-size-6"
                    id="prepost"
                  >
                    ธีรภัทร์ บุญช่วยแล้ว<br />
                  </v-list-item-title>
                  <v-list-item-subtitle id="prepost">
                    <v-chip class="ma-1 mr-2 mt-3" color="primary">
                      M03
                    </v-chip>
                    <v-chip class="ma-1 mr-2 mt-3" color="primary">
                      L207 </v-chip
                    ><br />
                  </v-list-item-subtitle>
                </v-list-item-content>
              </div>
              <div class="column is-4">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John" class="mt-3"
                />
              </div>
            </div>
          </v-list-item>
          <div class="columns">
            <div class="column is-12">
              <p class="ml-3 mb-6" id="prepost">
                ตามหาหูฟังสีขาวครับใครพบเจอติดต่อด้วยครับ กราบงามๆ 3 ที ใครเจอมีรางวัลให้นะ
              </p>
            </div>
          </div>
        </v-card>
      </div>
    </div>
    <div class="columns mb-6">
      <div class="column is-1"></div>
      <div class="column is-7">
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
      </div>
      <div class="column is-4"></div>
    </div>
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
#post {
  width: 100%;
}
img {
  width: 100%;
}
#body {
  font-family: "Kanit", sans-serif;
}
#prepost {
  font-family: "Kanit", sans-serif !important;
  color: white !important;
}
#cardprepost {
  background-color: #0f3057;
  border-radius: 20px;
}
</style>
