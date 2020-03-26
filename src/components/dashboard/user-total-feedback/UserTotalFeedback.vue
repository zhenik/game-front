<template>
  <div class="analytics-chart analytics-pie">
<!--    <h3>#1 Total feedback</h3>-->
    <pie-chart :chart-data="this.datacollection" :options="this.options"></pie-chart>

  </div>
</template>

<script>
  import PieChart from './PieChart.js'
  export default {
    props: {
      feedback: { type: Number, required: true }
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
            backgroundColor: ['#41B883', '#DD1B16'], data: [this.feedback, 100 - this.feedback]
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
</style>
