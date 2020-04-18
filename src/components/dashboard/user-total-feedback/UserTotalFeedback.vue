<template>
  <div class="mdc-card analytics-chart analytics-pie">
<!--    <h3>#1 Total feedback</h3>-->
      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
          <i class="material-icons">panorama_fish_eye</i>
          <h3>Total feedback</h3>
      </div>
      <div class="dashboard-content">
    <pie-chart :chart-data="this.datacollection" :options="this.options"></pie-chart>
      </div>
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
          labels: ['Positiv', 'Negativ'],
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
          labels: ['Positiv', 'Negativ'], datasets: [{
            backgroundColor: ['#26FF6F', '#FA5C20'], data: [this.feedback, 100 - this.feedback]
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

<style scoped>
    .dashboard-header {
        background-color: rgba(111, 111, 111, 0.4);
    }
    .dashboard-content {
        padding: 1em;
        margin: 1em;
    }
    h3 {
        font-size: 1em;
        padding: 0.5em;
        color: #C9C9C9;
        font-weight: 300;
        margin-bottom: 0;
    }
    i {
        padding: 0.5em;
        color: #C9C9C9;
    }
</style>
