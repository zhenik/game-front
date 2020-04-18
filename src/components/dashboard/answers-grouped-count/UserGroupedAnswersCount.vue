<template>
  <div class="mdc-card analytics-chart analytics-pie">
<!--    <h3>#3 Alle sjekkpunkter</h3>-->
<!--    <h4> YES {{ this.group.yes }}%</h4>-->
<!--    <h4> NO {{ this.group.no }}%</h4>-->
<!--    <h4> IRRELEVANT {{ this.group.irrelevant }}%</h4>-->
<!--    <h4> NONE {{ this.group.none }}%</h4>-->
      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
          <i class="material-icons">donut_large</i>
          <h3>Alle sjekkpunkter</h3>
      </div>
      <div class="dashboard-content">
    <doughnut-chart :chart-data="this.datacollection" :options="this.options"></doughnut-chart>
      </div>
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
          labels: ['OK', 'IKKE OK', 'IRRELEVANT', 'NONE'],
          datasets: [{
            backgroundColor: ['#26FF6F', '#FA5C20', '#FFB800', '#575f57'],
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
          labels: ['OK', 'IKKE OK', 'IRRELEVANT', 'NONE'],
          datasets: [{
            backgroundColor: ['#26FF6F', '#FA5C20', '#FFB800', '#575f57'],
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
