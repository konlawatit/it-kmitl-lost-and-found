<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MockupComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MockupComponent from '@/components/MockupComponent.vue'

export default {
  name: 'Mockup',
  components: {
    MockupComponent
  }
}
</script>
