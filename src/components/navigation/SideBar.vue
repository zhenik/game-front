<template>
  <nav id="sidebar">
    <!--sidebar-logo-->
    <div class="sidebar-logo">
      <p style="float: left; text-align: start;">prosjektNAME</p>
      <p style="float: right; text-align: end;">prosjektNR</p>
    </div>

    <!--sidebar-profile block-->
    <div class="sidebar-profile">
      <img src="@/assets/dog.png" alt="Avatar">
      <h4>{{profile.role.toLowerCase()}}</h4>
      <p>Sjekkliste {{profile.name}}</p>
      <p>{{profile.email}}</p>
    </div>

    <!--user related side bar-->
    <div v-if="profile.role == 'USER'">
      <!--user lists component, block with segments-->
      <UserListSideBlock :current-list="currentList"></UserListSideBlock>
    </div>

    <hr v-if="profile.role == 'USER'">

    <div v-if="profile.role == 'USER' && !checkIfNoList()" class="list-actions">
      <button type="button"
          class="btn btn-warning btn-lg"
          data-toggle="modal"
          data-target="#list-deliver-modal"
      >Lever</button>
      <button type="button"
          class="btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#list-update-modal"
          v-on:click="saveListUserReview"
      >Lagre</button>
    </div>

    <hr v-if="profile.role == 'USER'">

    <div v-if="profile.role == 'USER'" class="additional-nav additional-navigation-1">
      <router-link to="/dashboard">
        <i aria-hidden="true" class="material-icons">trending_up</i>
        Dashboard
      </router-link>
    </div>

    <div v-if="profile.role == 'ADMIN'" class="additional-nav additional-navigation-1">
      <router-link to="/lists">
        <i aria-hidden="true" class="material-icons">assignment</i>
        Lists
      </router-link>
    </div>


    <hr>

    <div class="additional-nav additional-navigation-2">
      <router-link to="/">
        <i aria-hidden="true" class="material-icons">contact_support</i>
        Info
      </router-link>
      <button @click="onLogout" class="logout">
        <i aria-hidden="true" class="material-icons">exit_to_app</i>
        Logg ut</button>
    </div>

    <!-- modal: save list -->
<!--    <div>-->
      <div class="modal fade bd-example-modal-sm" id="list-update-modal" tabindex="-1" role="dialog" aria-labelledby="listUpdateModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content">
            Listet lagret
          </div>
        </div>
      </div>
<!--    </div>-->

    <!-- modal: deliver list -->
    <div class="modal fade" id="list-deliver-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Levering</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="allQuestionsAnswered" class="modal-body">
            Vil du levere?
          </div>
          <div v-else>
            Ikke alle spørsmål blir besvart!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Back to edit</button>
            <button
                v-if="allQuestionsAnswered"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="deliverListUserReview"
            >Yes</button>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
  import {mapGetters} from "vuex";
  import UserListSideBlock from "./UserListSideBlock";
  export default {
    components: {
      UserListSideBlock
    },
    props: {
      gamefication: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      ...mapGetters(["currentList", "profile"]),
      allQuestionsAnswered () {
        let answeredAll = true;
        this.currentList.segments.forEach(s => {
          s.questions.forEach(q => {
            if (q.answer === 'NONE') {
              answeredAll=false
            }
          })
        });
        return answeredAll;
      },
      authenticated () {
        return this.$store.getters.authenticatedAndAuthorized
      },
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout');
        this.$store.dispatch('currentListResetState');
        this.$router.push('/signin')
      },
      saveListUserReview() {
        this.$store.dispatch("updateList");
      },
      deliverListUserReview() {
        this.$store.dispatch("deliverList");
      },
      checkIfNoList() {
        if (this.currentList == null) return true;
        let id = this.currentList.id;
        return (id === '')
      }
    }
  }
</script>

<style scoped>
  #sidebar {
    min-width: 250px;
    max-width: 250px;
    background-color: #3D3D3D;
    color: white;
    transition: all 0.3s;
    min-height: 100vh;
  }

  #sidebar .sidebar-logo {
    background-color: #363636 !important;
  }
  .sidebar-logo {
    background-color: #363636 !important;
    text-align: center;
    font-weight: bold;
    color: white;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    margin: 10px auto 30px;
  }

  .sidebar-logo p {
    padding-right: 5px;
    padding-left: 5px;
    font-size: 0.6em;
    color: #C9C9C9;
    width: 50%;
    opacity: 0.8;
  }

  .sidebar-profile {
    width: 100%;
    text-align: center;
    margin: 0;
    background: #363636;
  }

  .sidebar-profile img {
    border-radius: 50%;
    width: 25%;
    margin: 20px auto 20px auto;
  }
  .sidebar-profile p {
    margin-bottom: 0px;
    padding-bottom: 10px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow:column nowrap;
  }

  li a {
    text-decoration: none;
    color: white;
  }
  /*reset button padding*/
  li button {
    padding: 0;
  }
  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }

  .additional-nav {
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    text-align: left;
    color: white;
  }


  .additional-nav a {
    color: inherit;
    border-radius: inherit;
    text-align: inherit;

    /*background-color: red;*/
    text-decoration: none;
    font-size: 1rem;
    margin: 8px;
    padding: 0 12px;
  }

  .additional-nav i {
    vertical-align: middle;
    margin: auto 1em auto auto;

    width: 24px;
    height: 1.5em;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    line-height: inherit;
  }

  .additional-nav button {
    color: inherit;
    border-radius: inherit;
    text-align: inherit;

    text-decoration: none;
    font-size: 1rem;
    margin: 8px;
    padding: 0 8px;
    display: block;
  }


  .additional-nav button i {
    margin: auto 1em auto 5px;
  }

  .additional-nav a:hover,
  .additional-nav button:hover {
    color: white;
    background-color: #363636;

  }

  .list-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .list-actions .btn-primary {
    background-color: #363636;
  }

  .list-actions .btn-warning {
    background-color: #ffc107;
  }

  .modal-content {
    color: white;
    background-color: rgba(0, 0, 0, 0.95);
    border-radius: 4px;
    padding: 1em;
    width: 100%;
  }

  .modal {
    text-align: center;
  }

  .modal-body {
    text-align: left;
  }

</style>
