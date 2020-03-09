<template>
  <div id="new-list">
    <div class="new-list-form">
      <div class="btn-group mr-4">
        <!--new question-->
        <button type="button"
                class="btn btn-info btn-filter"
                v-on:click="addSegmentElement">Add segment</button>
      </div>
      <div class="btn-group mr-2">
        <!--create list-->
        <button type="button"
                class="btn btn-primary btn-filter"
                data-toggle="modal"
                data-target="#exampleModalCenter"
        >Save list</button>
      </div>

      <br/>
      <!--assigned to-->
      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Assign to:</label>
        </div>
        <select v-model="userAssignedTo" class="custom-select" id="inputGroupSelect01">
          <option value="" selected>None</option>
          {{getUsersEmails}}
          <option
              v-for="option in getUsersEmails"
              :key="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="list-group">
        <new-segment
            v-for="segment in segments"
            v-bind:segment="segment"
            :key="segment.id"
            @remove="removeSegmentElement"
            v-on:update:segment="setSegmentData"
        ></new-segment>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Create list with {{segments.length}} segments ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Back to edit</button>
            <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="saveList"
            >Yes</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  // import Question from './NewQuestion'
  import NewSegment from './NewSegment'
  import { mapGetters } from 'vuex'
  export default {
    name: "NewList",
    data() {
      return {
        segments:       [],
        userAssignedTo: null,
        deadline:       null,
        segmentCount:   0
      }
    },
    computed: {
      ...mapGetters({
        getUsersEmails: "getUsersEmails"
      }),
    },
    methods: {
      addSegmentElement: function () {
        this.segments.push({
          id:         this.segmentCount++,
          title:      '',
          description:'',
          questions:  []
        });
      },
      removeSegmentElement(id) {
        console.log('removing form element', id);
        const index = this.segments.findIndex(f => f.id === id);
        this.segments.splice(index,1)
      },
      setSegmentData(updatedSegment) {
        console.log('parent:segment '+ JSON.stringify(updatedSegment))
        this.segments.forEach((s, index) => {
          if (s.id === updatedSegment.id) {
            this.segments[index] = updatedSegment
          }
        })
      },
      saveList() {
        // console.log("newList:saveList segments "+JSON.stringify(this.segments))
        const newList = {
          assignedToEmail:    this.userAssignedTo,
          deadline:           this.deadline,
          segments:           this.segments
        };
        console.log("List " + JSON.stringify(newList))
        this.$store
            .dispatch('createList', newList)
            .then( () => this.$router.push('/lists'));
      }
    },
    beforeCreate() {
      // fetch data
      this.$store.dispatch("fetchUsersWithRoleUser");
    },
    components: {
      NewSegment,
    }
  }
</script>
<style scoped>
  .new-list-form {
    margin: 10px 5%;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

</style>

