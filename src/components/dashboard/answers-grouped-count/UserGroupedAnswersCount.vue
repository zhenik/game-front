<template>
  <div class="mdc-card analytics-chart analytics-pie">
<!--    <h3>#3 Alle sjekkpunkter</h3>-->
<!--    <h4> YES {{ this.group.yes }}%</h4>-->
<!--    <h4> NO {{ this.group.no }}%</h4>-->
<!--    <h4> IRRELEVANT {{ this.group.irrelevant }}%</h4>-->
<!--    <h4> NONE {{ this.group.none }}%</h4>-->
      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
          <i class="material-icons">donut_large</i>
          <h3>Totale sjekkpunkter</h3>
          <button type="button"
                  data-toggle="modal"
                  data-target="#data-info-grouped">
              <i class="material-icons">
                  help
              </i>
          </button>
      </div>
      <div class="dashboard-content">
    <doughnut-chart :chart-data="this.datacollection" :options="this.options"></doughnut-chart>
      </div>
      <h4>Totalt <span class="total-checkpoints">{{totalCheckpoints()}}</span> punkter</h4>
      <!--Modal info-->
      <div class="modal fade bd-example-modal-sm" id="data-info-grouped" tabindex="-1" role="dialog" aria-labelledby="listUpdateModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                  Alle sjekkpunkter fra alle lister du har levert, fordelt på "gjort", "ikke gjort" og "irrelevant".
              </div>
          </div>
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
          labels: ['Utført', 'Ikke utført', 'Irrelevant'],
          datasets: [{
            backgroundColor: ['#26FF6F', '#FA5C20', '#FFB800'],
            data: [40, 20, 80, 10]
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
            legend: {
                labels: {
                    fontColor: 'white'
                }
            },
            cutoutPercentage: 70,
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
          labels: ['Utført', 'Ikke utført', 'Irrelevant'],
          datasets: [{
            backgroundColor: ['#26FF6F', '#FA5C20', '#FFB800'],
            borderColor: 'rgba(0, 0, 0, 0)',
            data: [
                this.allListsFeedback.group.YES,
                this.allListsFeedback.group.NO,
                this.allListsFeedback.group.IRRELEVANT,
            ]
          }]
        }
      },
      fillGroupAnswersPercents() {
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
      },
        totalCheckpoints() {
          const checkpoints = [
              this.allListsFeedback.group.YES,
              this.allListsFeedback.group.NO,
              this.allListsFeedback.group.IRRELEVANT,
          ]
            const sum = checkpoints.reduce(function(a, b){
                return a + b;
            }, 0);
            return sum;
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
        display: flex;
    }
    .dashboard-header button {
        background-color: rgba(0, 0, 0, 0);
        border: 0;
        outline: 0;
        margin-left: auto;
    }
    .dashboard-header button:hover i {
        color: rgba(255, 255, 255, 1);
    }
    .dashboard-content {
        padding: 1em;
        margin: 1em;
    }
    h4 {
        text-align: center;
        font-size: 1em;
        margin-bottom: 1em;
        margin-top: -1em;
    }
    .total-checkpoints {
        font-size: 1.5em;
        margin-right: 0.3em;
        margin-left: 0.3em;
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
    .modal-content {
        background-color: rgba(0, 0, 0, 1);
        padding: 2em;
    }
</style>
