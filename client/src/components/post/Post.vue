<template>
  <div>
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-8">
        <h1>20 มี.ค. 2564</h1>
        <v-expansion-panels focusable id="post" class="mt-3">
          <v-expansion-panel v-for="(item, i) in 5" :key="i" class="mt-6">
            <v-expansion-panel-header>
              <div class="columns">
                <div class="column is-2">
                  <div class="ml-6 mt-6">12:59</div>
                  <div class="mt-2">
                    <v-chip class="ma-2" color="primary"> ประเภท </v-chip>
                  </div>
                </div>
                <div class="column is-1 mt-6">
                  <v-avatar color="primary" size="60">TB</v-avatar>
                </div>
                <div class="column is-6 mt-3 ml-6">
                  ธีรภัทร์ บุญช่วยแล้ว
                  <v-chip class="ma-2" color="primary"> M03 </v-chip>
                  <v-chip class="ma-2" color="primary"> L207 </v-chip><br />
                  <p class="mt-3">ใครเจอโทรศัพท์บ้างครับ</p>
                </div>
                <div class="column is-2">
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </div>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="mt-6">
              <div class="columns">
                  <div class="column is-1">
                      <v-avatar color="primary" size="40">TT</v-avatar>
                  </div>
                  <div class="column is-6">
                      13:24 น.
                      <br>
                      <p class="mt-2">ไม่เจอเลยครับ</p>
                  </div>
              </div>
              <div class="columns">
                  <div class="column is-1">
                      <v-avatar color="red" size="40">AA</v-avatar>
                  </div>
                  <div class="column is-6">
                      13:30 น.
                      <br>
                      <p class="mt-2">เจอค่ะ</p>
                  </div>
              </div>
              <div class="columns">
                  <div class="column is-9">
                      <input type="text" placeholder="comments" class="input is-black">
                  </div>
                  <div class="column is-2">
                      <button class="button is-info">เพิ่มความคิดเห็น</button>
                  </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="column is-2"></div>
    </div>
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-8">
        <h1>17 มี.ค. 2564</h1>
        <v-expansion-panels focusable id="post" class="mt-6">
          <v-expansion-panel v-for="(item, i) in 5" :key="i">
            <v-expansion-panel-header>Item</v-expansion-panel-header>
            <v-expansion-panel-content> comment.... </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div class="column is-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterpost",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#post {
  width: 85%;
}
img {
  width: 200rem;
}
</style>
