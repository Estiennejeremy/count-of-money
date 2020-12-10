<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end end-container">
        <i
          v-if="userRole === 'USER' || userRole === 'ADMIN'"
          class="far fa-user icon"
        ></i>
        <p data-cy="profile-name" v-if="userRole === 'USER' || userRole === 'ADMIN'" class="username">
          {{ username }}
        </p>
        <md-button
          v-if="userRole === 'USER' || userRole === 'ADMIN'"
          class="md-raised md-danger button-size"
          @click.prevent="handleLogout"
          data-cy="btn-logout"
        >
          Logout
        </md-button>
        <md-button
          v-if="userRole !== 'USER' && userRole !== 'ADMIN'"
          class="md-raised md-info button-size"
          @click.prevent="redirectSignup"
        >
          Create an account
        </md-button>
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { getUsernameById, getUserRoleById } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      username: '',
      userRole: '',
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    handleLogout() {
      Cookies.remove('token');
      this.$router.push('signin');
    },
    redirectSignup() {
      this.$router.push('signup');
    },
  },
  async mounted() {
    const userToken = Cookies.get('token');
    const userId = await getUserIdByToken(userToken);
    this.username = await getUsernameById(userId);
    this.userRole = await getUserRoleById(userId);
  },
};
</script>

<style lang="css">
.username {
  padding-right: 15px;
  margin: unset;
  font-size: 15px;
}
.end-container {
  align-items: center;
}
.icon {
  margin-right: 5px;
}
</style>
