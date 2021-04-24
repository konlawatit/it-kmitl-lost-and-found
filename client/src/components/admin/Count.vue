<template>
  <div class="columns mt-6">
    <div class="column is-12" id="boxcount">
      <div class="columns mt-6 mb-6">
        <div class="column is-6 has-text-centered is-size-2">
          จำนวนผู้ใช้งาน : 200
        </div>
        <div class="column is-6 has-text-centered is-size-2">
          จำนวนโพสต์ : 50
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "count",
  data() {
    return {
      
    };
  },
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
