<template>
  <div class="small">
    <h3>Total feedback</h3>
    <pie-chart :chart-data="this.datacollection" :options="this.options"></pie-chart>

  </div>
</template>

<script>
  import PieChart from './PieChart.js'
  export default {
    props: {
      score: { type: Number, required: true }
    },
    data() {
      return {
        datacollection: {
          labels: ['Positive', 'Negative'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#DD1B16'
              ],
              data: [0, 0]
            }
          ]
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
          labels: ['Positive', 'Negative'], datasets: [{
            backgroundColor: ['#41B883', '#DD1B16'], data: [this.score, 100 - this.score]
          }]
        }
      }
    },
    mounted() {
      this.fillData()
    },
    components: {
      PieChart
    },
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  100px auto;
  }
</style>
