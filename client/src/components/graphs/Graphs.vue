<template>
  <div class="columns">
    <div class="column is-12">
      <chart :type="'bar'" :data="data" :options="options"></chart>
    </div>
  </div>
</template>

<script>
import Chart from "vue-bulma-chartjs";
export default {
  components: {
    Chart,
  },
  name: "graphs",
  data() {
    return {
      data: {
        labels: [
          "62070096",
          "62070007",
          "62070027",
          "62070126",
          "62070001",
          "62070011",
          "62070034",
          "62070078",
          "62070077",
          "62070123",
        ],
        datasets: [
          {
            label: "Score",
            data: [80, 79, 68, 64, 63, 42, 40, 30, 26, 19],
            backgroundColor: [
                "#0f3057",
                "#0f3057",
                "#0f3057",
                "#0f3057",
                "#0f3057",
                "#0f3057",
                "#0f3057",
                "#0f3057",
                "#0f3057",
                "#0f3057"
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
