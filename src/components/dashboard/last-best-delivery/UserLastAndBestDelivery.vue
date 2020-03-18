<template>
  <div class="small">
    <h3>#2 Forrige liste</h3>
      <h4> Best delivered list :) {{ userLastAndBestFeedback.best.score }}%</h4>
      <h4> Last delivered list :) {{ userLastAndBestFeedback.last.score }}%</h4>
    <horizontal-bar-chart :chart-data="this.datacollection" :options="this.options"></horizontal-bar-chart>
  </div>
</template>


<script>
  // userLastAndBestFeedback: {
  //   last: {
  //     score: 66.0,
  //         questions: {
  //       right: 5,
  //           wrong: 4
  //     },
  //     date: "12312423"
  //   },
  //   best: {
  //     score: 100.0,
  //         questions: {
  //       right: 5,
  //           wrong: 4
  //     },
  //     date: "231232432"
  //   }
  // }
  import HorizontalBarChart from './HorizontalBarChart.js'

  export default {
    props: {
      userLastAndBestFeedback: { type: Object, required: true }
    },
    data() {
      return {
        datacollection: {
          labels: ['Best delivered list', 'Last devlivered list'],
          datasets: [{
            label: 'Forrige lista',
            backgroundColor: ['#28f825', '#f80000'],
            // data: [{x: 20, y:'Positive'}, {x: 7, y:'Negative'}],
            data: [100, 66, 0],
            order: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: ['Best delivered list', 'Last devlivered list'], datasets: [{
            label: 'Forrige lista',
            backgroundColor: ['#28f825', '#f80000'], // data: [{x: 20, y:'Positive'}, {x: 7, y:'Negative'}],
            data: [this.userLastAndBestFeedback.best.score, this.userLastAndBestFeedback.last.score, 0],
            order: 1
          }]
        }
      }
    },
    mounted() {
      this.fillData()
    },
    components: {
      HorizontalBarChart
    },
  }
</script>
