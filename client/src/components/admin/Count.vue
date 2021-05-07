<template>
  <div class="columns mt-6">
    <div class="column is-12" id="boxcount">
      <div class="columns mt-6 mb-6">
        <div class="column is-6 has-text-centered is-size-2">
          จำนวนผู้ใช้งาน : {{countuser}}
        </div>
        <div class="column is-6 has-text-centered is-size-2">
          จำนวนโพสต์ : {{countpost}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../../service/PostService";
export default {
  name: "count",
  data() {
    return {
      countuser: 0,
      countpost: 0
    };
  },
  created: async function(){
    await PostService.countuser().then((result) => {
      this.countuser = result.data;
    });
    await PostService.countpost().then((result) =>{
      this.countpost = result.data
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#boxcount {
  border-radius: 1rem;
  font-family: "Kanit", sans-serif;
  background: rgb(187, 186, 186);
}
</style>
