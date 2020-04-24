<template>
  <nav id="sidebar">
    <!--sidebar-logo-->
    <div class="sidebar-logo">
      <p style="float: left; text-align: start;">Fellow</p>
      <p style="float: right; text-align: end; opacity: 0;">13100307</p>
    </div>

    <!--sidebar-profile block-->
    <div class="sidebar-profile">
      <img v-if="gamefication" src="@/assets/dog1.png" alt="Avatar">
      <div v-else class="no-gamification-img"></div>
      <h4 v-if="profile.role === 'ADMIN'">{{profile.role.toLowerCase()}}</h4>
      <p>Sjekkliste for {{profile.name}}</p>
      <p class="profile-email">{{profile.email}}</p>

      <div v-if="gamefication && profile.role == 'USER'" class="gamification-actions">
        <!--Dashboard button-->
        <div  class="gamification-btn dashboard-btn">
          <router-link to="/dashboard">
            <p>Resultater</p>
          </router-link>
        </div>
        <!--Top list button-->
        <div class="gamification-btn toplist-btn">
          <router-link to="#">
            <p>Toppliste</p>
          </router-link>
        </div>
      </div>

    </div>

    <!--user side bar block-->
    <div v-if="profile.role == 'USER'">
      <!--Refresh button, deadline and segments-->
      <UserListSideBlock :current-list="currentList"></UserListSideBlock>
      <br>
      <!--Lever and Lagre buttons-->
      <div v-if="!checkIfNoList()" class="list-actions">
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
    </div>

    <!--admin side bar block-->
    <div v-if="profile.role == 'ADMIN'" class="dashboard-btn">
      <router-link to="/lists">
        <p>Lister</p>
      </router-link>
    </div>

    <hr>

    <!--common for all side bar block-->
    <div class="additional-nav">
      <router-link to="/">
        <i aria-hidden="true" class="material-icons additional-nav-i">contact_support</i>
        <span class="additional-nav-text">Info</span>
      </router-link>
      <button @click="onLogout" class="logout">
        <i aria-hidden="true" class="material-icons additional-nav-i">exit_to_app</i>
        <span class="additional-nav-text">Logg ut</span></button>
    </div>

    <!-- modal: save list -->
      <div class="modal fade bd-example-modal-sm" id="list-update-modal" tabindex="-1" role="dialog" aria-labelledby="listUpdateModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
          <div class="modal-content">
            Liste lagret. Du kan komme tilbake og fortsette på den senere.
          </div>
        </div>
      </div>

    <!-- modal: deliver list -->
    <div class="modal fade" id="list-deliver-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Levering</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" :style="{'color': '#ffffff'}">&times;</span>
            </button>
          </div>
          <div v-if="allQuestionsAnswered" class="modal-body">
            Vil du levere lista? Du kan ikke gjøre endringer etterpå.
          </div>
          <div v-else>
            Du må sjekke av alle punkter før du kan levere!
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Avbryt</button>
            <button
                v-if="allQuestionsAnswered"
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                v-on:click="deliverListUserReview"
            >Lever</button>
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
    computed: {
      ...mapGetters(["currentList", "profile", "gamefication"]),
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
        this.$store.dispatch("deliverList")
            .then(() => this.$store.dispatch("currentListResetState"))
            .then(() => this.$router.push('/'));
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
    background: rgba(0, 0, 0, 0.13);
    padding-bottom: 10px;
  }

  .sidebar-profile img {
    border-radius: 50%;
    width: 25%;
    margin: 20px auto 20px auto;
    background-color: #000000;
  }
  .no-gamification-img{
    height: 30px;
    background-color: transparent;
  }
  .sidebar-profile p {
    margin-bottom: 0;
    padding-bottom: 10px;
  }
  .profile-email {
    font-size: 0.8em;
    font-style: italic;
    opacity: 0.6;
  }

  .gamification-actions {
    display: flex;
    flex-direction: row;
  }

  .gamification-btn {
    width: 40%;
    margin: 0.5em auto;
    background-color: rgba(255, 0, 92, 0.2);
    box-sizing: border-box;
    padding: 0.2em;
    transition: all 200ms;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    box-shadow: 0 5.5px 5px rgba(0, 0, 0, 0.24), 0 9px 18px rgba(0, 0, 0, 0.18);
  }

  .gamification-btn p {
    margin: auto;
    padding: 5px;
  }

  .gamification-btn:hover {
    background-color: rgba(255, 0, 92, 0.4);
    border: 1px solid rgba(255, 0, 92, 1);
    cursor: pointer;
  }

  .dashboard-btn:hover p {
    color: rgba(255, 255, 255, 1);
  }

  .gamification-btn a {
    text-decoration: none;
    color: rgba(255, 255, 255, 1);
    font-weight: 300;
    text-align: center;
    font-size: 0.9em;
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

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }

  .additional-nav {
    display: flex;
    width: 100%;
  }

  .additional-nav * {
    padding: 0;
    flex-direction: column;
    margin: auto;
  }

  .additional-nav a, .additional-nav button {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .additional-nav-i {
    width: 100%;
    text-align: center;
    display: inline;
    font-size: 1.2em;
  }

  .additional-nav *:hover {
    color: rgba(255, 255, 255, 1);
  }

  .list-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .list-actions * {
    font-size: 0.9em;
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
    padding: 2em;
    width: 100%;
  }

  .modal {
    text-align: center;
  }

  .modal-body {
    text-align: left;
  }
</style>
