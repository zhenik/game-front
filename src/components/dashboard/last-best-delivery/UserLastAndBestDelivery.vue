<template>
  <div class="small">
    <h3>Forrige lista</h3>
      <h4> Best delivered list :) {{ userLastAndBestFeedback.best.score }}%</h4>
      <h4> Last delivered list :) {{ userLastAndBestFeedback.last.score }}%</h4>
    <horizontal-bar-chart :chart-data="this.datacollection" :options="this.options"></horizontal-bar-chart>
  </div>
</template>

<script>
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
    // methods: {
    //   fillData() {
    //     this.datacollection = {
    //       labels: ['Positive', 'Negative'], datasets: [{
    //         label: 'Last delivered list',
    //         backgroundColor: ['#bcf831', '#f8693d'],
    //         data: [3214, 32143]
    //       }]
    //     }
    //   }
    // },
    // mounted() {
    //   this.fillData()
    // },
    components: {
      HorizontalBarChart
    },
  }
</script>
