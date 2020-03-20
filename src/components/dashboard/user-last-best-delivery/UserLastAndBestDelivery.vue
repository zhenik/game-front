<template>
  <div class="small">
    <h3>#2 Forrige liste</h3>
      <h4> Best delivered list :) {{ twoListsFeedback.best.score }}%</h4>
      <h4> Last delivered list :) {{ twoListsFeedback.last.score }}%</h4>
    <horizontal-bar-chart :chart-data="this.datacollection" :options="this.options"></horizontal-bar-chart>
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
