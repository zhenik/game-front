<template>
  <div class="small">
    <h3>#3 Alle sjekkpunkter</h3>
    <h4> YES {{ this.group.yes }}%</h4>
    <h4> NO {{ this.group.no }}%</h4>
    <h4> IRRELEVANT {{ this.group.irrelevant }}%</h4>
    <h4> NONE {{ this.group.none }}%</h4>

    <doughnut-chart :chart-data="this.datacollection" :options="this.options"></doughnut-chart>
  </div>
</template>

<script>
  // "allListsFeedback": {
  //   "questions": 7,
  //   "score": 0,
  //   "feedback": 75.0,
  //   "group": {
  //     "IRRELEVANT": 2,
  //     "NO": 1,
  //     "YES": 3,
  //     "NONE": 1
  //   }
  // }
  import DoughnutChart from './DoughnutChart'
  export default {
    props: {
      allListsFeedback: {type: Object, required: true},
    },
    data() {
      return {
        datacollection: {
          labels: ['YES', 'NO', 'IRRELEVANT', 'NONE'],
          datasets: [{
            backgroundColor: ['#41B883', '#DD1B16', '#ffb8a7', '#575f57'],
            data: [40, 20, 80, 10]
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false
        },
        group: { // percents
          none: 0,
          irrelevant: 0,
          yes: 0,
          no: 0
        }
      }
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: ['YES', 'NO', 'IRRELEVANT', 'NONE'],
          datasets: [{
            backgroundColor: ['#41B883', '#DD1B16', '#ffb8a7', '#575f57'],
            data: [
                this.allListsFeedback.group.YES,
                this.allListsFeedback.group.NO,
                this.allListsFeedback.group.IRRELEVANT,
                this.allListsFeedback.group.NONE,
            ]
          }]
        }
      },
      fillGroupAnswersPercents() {
        this.group.none = this.calculatePercent(this.allListsFeedback.group.NONE)
        this.group.yes = this.calculatePercent(this.allListsFeedback.group.YES)
        this.group.no = this.calculatePercent(this.allListsFeedback.group.NO)
        this.group.irrelevant = this.calculatePercent(this.allListsFeedback.group.IRRELEVANT)
      },
      calculatePercent(x) {
        if (this.allListsFeedback.questions != 0) {
          return ((x/this.allListsFeedback.questions)*100).toPrecision(4);
        } else {
          return 0
        }
      }
    },
    mounted() {
      this.fillData()
      this.fillGroupAnswersPercents()
    },
    components: {
      DoughnutChart
    }
  }
</script>

<style>

</style>
