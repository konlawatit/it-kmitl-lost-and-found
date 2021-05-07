<template>
	<div>
		{{ message }}
		{{ $route.params.id }}
	</div>
</template>

<script>
import MockupService from "../service/MockupService";

export default {
	name: "MockupComponent",
	data() {
		return {
			message: "",
			error: "",
		};
	},
  async created() {
    try {
      this.message = await MockupService.getTest();
    } catch (err) {
      this.error = err
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
div,a {
	color: #42b983;
}
</style>
