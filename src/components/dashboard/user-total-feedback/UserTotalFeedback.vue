<template>
  <div class="mdc-card analytics-chart analytics-pie">
<!--    <h3>#1 Total feedback</h3>-->
      <div class="dashboard-header d-flex flex-row w-100 align-items-center">
          <i class="material-icons">panorama_fish_eye</i>
          <h3>Totale resultater</h3>
          <button type="button"
                  data-toggle="modal"
                  data-target="#data-info-total">
              <i class="material-icons">
                  help
              </i>
          </button>
      </div>
      <div class="dashboard-content">
    <pie-chart :chart-data="this.datacollection" :options="this.options"></pie-chart>
      </div>
      <div class="result-percentage">
          <h4><span :style="{'color': '#FF005C'}">{{Math.round(this.feedback)}}%</span> godkjente punkter totalt</h4>
      </div>
      <!--Modal info-->
      <div class="modal fade bd-example-modal-sm" id="data-info-total" tabindex="-1" role="dialog" aria-labelledby="listUpdateModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                  Total prosentandel godkjente og ikke godkjente sjekkpunkter på alle lister du har levert.
              </div>
          </div>
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
          labels: ['Godkjent', 'Ikke godkjent'],
          datasets: [
            {
              backgroundColor: [
                  '#FF005C',
                  'rgba(10, 61, 194, 0.3)'
              ],
              data: [0, 0]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
            legend: {
                display: false,
            },
        }
      }
    },
    methods: {
      fillData() {
        this.datacollection = {
          labels: ['Godkjent', 'Ikke godkjent'], datasets: [{borderColor: 'rgba(0, 0, 0, 0)',
            backgroundColor: ['#FF005C', 'rgba(10, 61, 194, 0.3)'], data: [Math.round(this.feedback), 100 - Math.round(this.feedback)]
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
    .result-percentage {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -2em;
    }
    h4 {
        text-align: center;
        font-size: 1em;
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
