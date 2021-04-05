<template>
  <div>
    <div class="columns">
      <div class="column is-8 is-mobile">
        <chart :type="'bar'" :data="data" :options="options"></chart>
      </div>
      <div class="column is-4 is-mobile mt-5" id="head">
        <div class="has-text-centered">
          <p>อันดับ</p>
        </div>
        <div class="columns is-mobile">
          <div class="column is-2 has-text-centered">
            อันดับ
          </div>
          <div class="column is-7 has-text-centered">
            รหัสนักศึกษา
          </div>
          <div class="column is-2 has-text-centered">
            คะแนน
          </div>
        </div>
        <div class="columns mb-5 is-mobile" v-for="item in infoScore" :key="item.id">
          <div class="column is-2 has-text-centered">
            {{item.rank}}
          </div>
          <div class="column is-7 has-text-centered">
            {{ item.id }}
          </div>
          <div class="column is-2 has-text-centered">
            {{item.score}}
          </div>
        </div>
      </div>
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
      infoScore: [{
        rank: "1",
        id: "62070096",
        score: 80
      },
      {
        rank: "2",
        id: "62070007",
        score: 79
      },
      {
        rank: "3",
        id: "62070027",
        score: 68
      },
      {
        rank: "4",
        id: "62070126",
        score: 64
      },
      {
        rank: "5",
        id: "62070001",
        score: 63
      },
      ],
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
              "#0f3057",
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
#head {
  background-color: rgb(15, 48, 87);
  color:white;
  height: 100%;
  border-radius: 1rem;
  font-family: "Kanit", sans-serif;
}
</style>
