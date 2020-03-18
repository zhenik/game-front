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
  // userGroupedAnswersCount: {
  //   group: {
  //         IRRELEVANT: 2,
  //         NO: 1,
  //         YES: 3,
  //         NONE: 1
  //   },
  //   totalQuestions: 7
  // },
  import DoughnutChart from './DoughnutChart'
  export default {
    props: {
      userGroupedAnswersCount: {type: Object, required: true},
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
                this.userGroupedAnswersCount.group.YES,
                this.userGroupedAnswersCount.group.NO,
                this.userGroupedAnswersCount.group.IRRELEVANT,
                this.userGroupedAnswersCount.group.NONE,
            ]
          }]
        }
      },
      fillGroupAnswersPercents() {
        this.group.none = this.calculatePercent(this.userGroupedAnswersCount.group.NONE)
        this.group.yes = this.calculatePercent(this.userGroupedAnswersCount.group.YES)
        this.group.no = this.calculatePercent(this.userGroupedAnswersCount.group.NO)
        this.group.irrelevant = this.calculatePercent(this.userGroupedAnswersCount.group.IRRELEVANT)
      },
      calculatePercent(x) {
        if (this.userGroupedAnswersCount.totalQuestions != 0) {
          return ((x/this.userGroupedAnswersCount.totalQuestions)*100).toPrecision(4);
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
