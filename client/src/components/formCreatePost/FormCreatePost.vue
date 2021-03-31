<template>
  <div class="columns">
    <div class="column is-12" id="bodyblackground">
      <div class="columns">
        <div class="column is-1 ml-6">
          <v-avatar color="primary" size="90" class="mt-3">TB</v-avatar>
        </div>
        <div class="column is-10">
          <div class="columns">
            <div class="column is-2">
              <p class="is-size-4 ml-6 mt-2 has-text-centered">หัวข้อ :</p>
            </div>
            <div class="column is-9">
              <input type="text" class="input mt-2" placeholder="Title" />
            </div>
          </div>
          <div class="columns">
            <div class="column is-12">
              <p class="is-size-5 ml-6">ธีรภัทร์ บุญช่วยแล้ว</p>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              ประเภทโพสต์ :
            </div>
            <div class="column is-8">
              <v-chip-group mandatory active-class="primary">
                <v-chip v-for="tag in tagsPost" :key="tag" class="is-size-5">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              วันที่ :
            </div>
            <div class="column is-3">
              <input type="date" class="input" />
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              เวลา :
            </div>
            <div class="column is-8">
              <v-chip-group mandatory active-class="primary">
                <v-chip v-for="tag in tagsTime" :key="tag" class="is-size-5">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              สิ่งของ :
            </div>
            <div class="column is-5">
              <v-select
                v-model="valueItem"
                :items="items"
                chips
                label="Items"
                multiple
                solo
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              สถานที่ :
            </div>
            <div class="column is-5">
              <v-select
                v-model="valueLocation"
                :items="locations"
                chips
                label="Locations"
                multiple
                solo
              ></v-select>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              รูปภาพ :
            </div>
            <div class="column is-5">
              <v-file-input
                label="File input"
                filled
                prepend-icon="mdi-camera"
              ></v-file-input>
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-2 has-text-centered mt-2 is-size-5">
              รายละเอียด :
            </div>
          </div>
        </div>
      </div>
      <div class="columns ml-1">
        <div class="column is-12">
          <div class="columns">
            <div class="column is-12">
              <v-container fluid>
                <v-textarea
                  clearable
                  label="รายละเอียด"
                  clear-icon="mdi-close-circle"
                ></v-textarea>
              </v-container>
            </div>
          </div>
        </div>
      </div>
      <div class="columns mb-4">
        <div class="column is-8"></div>
        <div class="column is-2">
          <v-btn tile color="success">
            Create
          </v-btn>
        </div>
        <div class="column is-2">
          <v-btn tile color="error" @click="redirect('home')">
            Cancle
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "formCreatePost",
  data() {
    return {
      tagsPost: ["ตามหาเจ้าของ", "ตามหาของหาย"],
      tagsTime: ["เช้า", "กลางวัน", "เย็น", "กลางคืน"],
      items: ["กระเป๋า", "เสื้อ", "แว่นตา", "Electronic"],
      valueItem: "",
      locations: ["M04", "M03", "L207"],
      valueLocation: "",
    };
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
#bodyblackground {
  background: rgb(192, 191, 191);
  border-radius: 1rem;
  font-family: "Kanit", sans-serif;
}
.v-chip {
  width: 30%;
  justify-content: center;
}
</style>
