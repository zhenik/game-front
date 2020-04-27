<template>
  <div class="mdc-card analytics-chart analytics-pie">
<!--      <h3>#2 Forrige liste</h3>-->
<!--      <h4> Best delivered list :) {{ twoListsFeedback.best.feedback }}%</h4>-->
<!--      <h4> Last delivered list :) {{ twoListsFeedback.last.feedback }}%</h4>-->
      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
          <i class="material-icons">compare_arrows</i>
          <h3>Resultat forrige liste</h3>
          <button type="button"
                  data-toggle="modal"
                  data-target="#data-info-best-last">
              <i class="material-icons">
            help
            </i>
          </button>
      </div>
      <div class="dashboard-content">
    <horizontal-bar-chart :chart-data="this.datacollection" :options="this.options"></horizontal-bar-chart>
      </div>
      <div class="result-comparison">
          <div class="result-comparison-left">
              <small>Nyligste resultat:</small>
              <h4>{{Math.round(this.twoListsFeedback.last.feedback)}} %</h4>
          </div>
          <h4 class="vs">
            VS
          </h4>
          <div class="result-comparison-right">
              <small>Beste resultat:</small>
              <h4>{{Math.round(this.twoListsFeedback.best.feedback)}} %</h4>
          </div>
      </div>
      <!--Modal info-->
      <div class="modal fade bd-example-modal-sm" id="data-info-best-last" tabindex="-1" role="dialog" aria-labelledby="listUpdateModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                  Prosentandel godkjente sjekkpunkter på din nyligste leverte liste sammenlignet med den lista du har levert som fikk størst prosentandel godkjent.
              </div>
          </div>
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
          labels: ['Nyligste', 'Beste'],
          datasets: [{
            label: 'Nyligste',
            backgroundColor: ['#FF005C', 'rgba(38, 255, 111, 0.3);'],
            // data: [{x: 20, y:'Positive'}, {x: 7, y:'Negative'}],
            data: [100, 66, 0],
            order: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
                xAxes: [{
                    display: false,
                    gridLines: {
                        display: false,
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
                    }
                }]
            }
        }
      }
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: ['Nyligste', 'Beste'], datasets: [{
            backgroundColor: ['#FF005C', 'rgba(255, 0, 92, 0.3)'], // data: [{x: 20, y:'Positive'}, {x: 7, y:'Negative'}],
            data: [Math.round(this.twoListsFeedback.best.feedback), Math.round(this.twoListsFeedback.last.feedback), 0],
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
        margin-top: -1em;
    }
    .result-comparison {
        display: flex;
        flex-direction: row;
        margin-left: 1em;
        margin-right: 1em;
        margin-top: -1em;
    }
    .result-comparison-right {
        flex-grow: 2;
        text-align: left;
    }
    .result-comparison .vs {
        flex-grow: 1;
        text-align: center;
        color: #FF005C;
        align-self: center;
    }
    .result-comparison-left {
        flex-grow: 2;
        text-align: right;
    }
    .result-comparison h4 {
        font-size: 1em;
        margin-bottom: 1em;
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