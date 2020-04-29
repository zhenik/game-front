<template>
  <div class="list-row-container">
    <router-link :to="listLink"
                 class="list-group-item list-group-item-action flex-column align-items-start"
                 @mouseout.native="isHovering = false" @mouseover.native="isHovering = true"
                 :class="[{active: isHovering}, styleRow]"
    >

      <div>
        <div class="list-row-header">
          <p v-if="list.assignedToEmail !== null">{{list.assignedToEmail}} </p>
          <p v-else>Ikke tildelt noen bruker.</p>
          <hr>

        </div>
        <div class="list-row-description">
          <div class="list-row-description-meta">
            <small v-if="list.state==='WORK_IN_PROGRESS'" class="list-deadline"><span class="make-bold">Frist:</span> {{timeStampConverter(list.deadline)}}</small>
            <small v-if="list.state==='DELIVERED'" class="list-deadline"><span class="make-bold">Ferdig:</span> {{timeStampConverter(list.updatedAt)}}</small>
            <small v-else class="list-deadline"><span class="make-bold">Sist endret:</span> {{timeStampConverter(list.updatedAt)}}</small>
            <small><span class="make-bold">Punkter:</span> {{questionsCount}}</small>
          </div>
          <span v-if="list.state ==='WORK_IN_PROGRESS'" class="material-icons status-icon">
          clear
          </span>
          <span v-if="list.state ==='UNDER_REVIEW'" class="material-icons status-icon">
          arrow_forward_ios
          </span>
          <span v-if="list.state ==='DELIVERED'" class="material-icons status-icon">
          done
          </span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    props: {
      list: {
        type: Object, required: true
      }
    },
    data() {
      return {
        isHovering: false
      }
    },
    computed: {
      ...mapGetters(["gamefication"]),
      // }===|==>----
      dateDelta () {
        const createdAt = new Date(this.list.createdAt).getTime();
        const now = new Date().getTime();
        const daysAgo = Math.round((now - createdAt) / (1000*60*60*24));
        if (daysAgo > 0) {
          return daysAgo + " dager siden";
        } else {
          return "i dag"
        }
      },
      // list states [NOT_ASSIGNED,UNDER_REVIEW,WORK_IN_PROGRESS,DELIVERED]
      styleRow () {
        if (!this.gamefication) {
          return "list-row-none"
        }
        if (this.list.state === "WORK_IN_PROGRESS") {
          return 'list-row-wip'
        } else if (this.list.state === "UNDER_REVIEW") {
          return "list-row-ur"
        } else if(this.list.state === "DELIVERED") {
          return "list-row-d"
        } else {
          return "list-row-na"
        }
      },
      // }===|==>----
      questionsCount() {
        let count = 0;
        this.list.segments.forEach(segment => {
          count += segment.questions.length
        });
        return count;
      },
      listLink() {
        return {
          name: "List",
          params: {
            slug: this.list.id
          }
        };
      },
    },
    methods: {
      timeStampConverter(dateIn){
        const d = new Date(dateIn);
        const months = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des'];
        const year = d.getFullYear();
        const month = months[d.getMonth()];
        const date = d.getDate();
        const hour = d.getHours();
        const min = d.getMinutes();

        let minChecked = '';
        if(min < 10){
          minChecked = '0' + min;
        }else minChecked = min;

        const time = date + ' ' + month + ' ' + year + ', ' + hour + ':' + minChecked;
        return time;
      },
    }
  }
</script>

<style scoped>
  .active {
    /*background-color: rgba(0, 0, 0, 0.1);*/
    background-color: rgba(0, 0, 0, 0.9);
  }

  .list-row-container {
    display: flex;
    flex-direction: column;
    min-height: 5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .list-row-description {
    display: flex;
    align-content: space-between;
    align-items: center;
  }

  .list-row-description-meta {
    display: flex;
    flex-direction: column;
    width: 80%;
  }
  .list-deadline {
    color: rgba(255, 255, 255, 0.8);
  }

  .list-group-item {
    border-radius: 0;
  }
  .make-bold {
    font-weight: 500;
  }
  .list-row-wip {
    background: #1E1E1E;
    color: rgba(250, 92, 32, 0.6);
    border: 1px solid rgba(250, 92, 32, 0.6);
  }
  .list-row-wip:hover {
    background: #2E2E2E;
    color: rgba(250, 92, 32, 1);
    border: 1px solid rgba(250, 92, 32, 1);
  }
  .list-row-ur {
    background: rgba(10, 61, 194, 0.5);
    border: 1px solid #0A3DC2;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 0.7);
  }
  .list-row-ur:hover {
    background: rgba(10, 61, 194, 0.7);
    border: 1px solid #ffffff;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 1);
  }
  .list-row-d {
    background: rgba(38, 255, 111, 0.3);
    border: 1px solid #26FF6F;
    box-sizing: border-box;
    color: #26FF6F;
  }
  .list-row-d:hover {
    background: rgba(38, 255, 111, 0.7);
    border: 1px solid #ffffff;
    box-sizing: border-box;
    color: #ffffff;
  }

</style>
