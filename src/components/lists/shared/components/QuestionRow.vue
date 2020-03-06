<template>

  <div class="card">

    <div class="card-body d-flex justify-content-between align-items-center">
      {{localQuestion.text}}

      <!--   button group   -->
      <span class="badge badge-pill">
        <div class="btn-group btn-group-toggle">
          <label class="btn btn-secondary"
                 :class="{ active:  'YES' === localQuestion.answer}">
            <input type="radio"
                   :disabled="checkDisabled"
                   v-model="localQuestion.answer"
                   value="YES"
                   :name="'s-'+this.segmentId+'-q-'+localQuestion.id"
                   > Yes
          </label>
          <label class="btn btn-secondary"
                 :class="{ active:  'NO' === localQuestion.answer}">
            <input type="radio"
                   :disabled="checkDisabled"
                   v-model="localQuestion.answer"
                   value="NO"
                   :name="'s-'+this.segmentId+'-q-'+localQuestion.id"
                   > No
          </label>
          <label class="btn btn-secondary"
                 :class="{ active:  'IRRELEVANT' === localQuestion.answer}">
            <input type="radio"
                   :disabled="checkDisabled"
                   v-model="localQuestion.answer"
                   value="IRRELEVANT"
                   :name="'s-'+this.segmentId+'-q-'+localQuestion.id"
                   > Irrelevant
          </label>
          <label class="btn btn-secondary"
                 :class="{ active:  'NONE' === localQuestion.answer}">
            <input type="radio"
                   :disabled="checkDisabled"
                   v-model="localQuestion.answer"
                   value="NONE"
                   :name="'s-'+this.segmentId+'-q-'+localQuestion.id"
            > None
          </label>
        </div>
      </span>
    </div>

    <!--   collapse comment   -->
    <p>
      <button class="btn btn-secondary dropdown-toggle"
              type="button"
              data-toggle="collapse"
              :data-target="'#s-'+this.segmentId+'-q-'+localQuestion.id"
              aria-expanded="false"
              aria-controls="collapseExample">
        Comment
      </button>
    </p>
    <div class="collapse" :id="'s-'+this.segmentId+'-q-'+localQuestion.id">
      <div class="card card-body">
        <div class="card-text">
          <label>Comment</label>
          <textarea v-model="localQuestion.comment"
                    :disabled="checkDisabled"
                    class="form-control"
                    rows="2"></textarea>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    props: {
      question: {
        type: Object,
        required: true
      },
      segmentId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        localQuestion: {...this.question}
      }
    },
    watch: {
      localQuestion: {
        deep: true,
        handler() {
          this.$emit('update:question', this.localQuestion);
        }
      }
    },
    computed: {
      ...mapGetters(["currentList", "isAdmin"]),
      checkDisabled () {
        if (this.isAdmin) {
          return false
        } else {
          const dis = 'WORK_IN_PROGRESS' !== this.currentList.state
          return dis
        }
      }
    },
  }
</script>
