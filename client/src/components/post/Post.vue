<template>
  <div>
    <div class="columns" id="body">
      <div class="column is-12">
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
                <div class="ml-3 mt-6 is-size-3">12:59
                  <v-chip class="ma-2" color="pink" label text-color="white">
                    Tags
                  </v-chip>
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
              <div class="column is-3 is-mobile">
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
    </div>
    <div class="columns">
      <div class="column is-12">
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
      </div>
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
</style>
