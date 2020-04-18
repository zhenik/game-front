<template>
  <div class="mdc-card analytics-chart analytics-pie">
<!--      <h3>#2 Forrige liste</h3>-->
<!--      <h4> Best delivered list :) {{ twoListsFeedback.best.feedback }}%</h4>-->
<!--      <h4> Last delivered list :) {{ twoListsFeedback.last.feedback }}%</h4>-->
      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
          <i class="material-icons">compare_arrows</i>
          <h3>Forrige liste</h3>
      </div>
      <div class="dashboard-content">
    <horizontal-bar-chart :chart-data="this.datacollection" :options="this.options"></horizontal-bar-chart>
      </div>
  </div>
</template>


<script>

  import HorizontalBarChart from './HorizontalBarChart.js'
  // "twoListsFeedback": {
  //   "last": {
  //         "questions": 0,
  //         "score": 0,
  //         "feedback": 0.0,
  //         "group": {
  //           "NO": 0,
  //           "YES": 0,
  //           "IRRELEVANT": 0,
  //           "NONE": 0
  //         }
  //   },
  //   "best": {
  //         "questions": 0,
  //         "score": 0,
  //         "feedback": 0.0,
  //         "group": {
  //           "NO": 0,
  //           "YES": 0,
  //           "IRRELEVANT": 0,
  //           "NONE": 0
  //     }
  //   }
  // }
  export default {
    props: {
      twoListsFeedback: { type: Object, required: true }
    },
    data() {
      return {
        datacollection: {
          labels: ['Forrige liste', 'Beste liste'],
          datasets: [{
            label: 'Forrige liste',
            backgroundColor: ['#26FF6F', 'rgba(38, 255, 111, 0.3);'],
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
          labels: ['Forrige liste', 'Beste liste'], datasets: [{
            label: 'Positiv feedback',
            backgroundColor: ['#26FF6F', 'rgba(38, 255, 111, 0.3)'], // data: [{x: 20, y:'Positive'}, {x: 7, y:'Negative'}],
            data: [this.twoListsFeedback.best.feedback, this.twoListsFeedback.last.feedback, 0],
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