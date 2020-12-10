<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar :sidebar-item-color="sidebarBackground">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/cryptos">
        <md-icon>attach_money</md-icon>
        <p>Crypto currencies</p>
      </sidebar-link>
      <sidebar-link to="/articles">
        <md-icon>article</md-icon>
        <p>Articles</p>
      </sidebar-link>
      <sidebar-link to="/user" v-if="userRole === 'USER'">
        <md-icon>person</md-icon>
        <p data-cy="menu-profile">User Profile</p>
      </sidebar-link>
      <sidebar-link to="/admin" v-if="userRole === 'ADMIN'">
        <md-icon>admin_panel_settings</md-icon>
        <p>Admin</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
import TopNavbar from './TopNavbar.vue';
import DashboardContent from './Content.vue';
import MobileMenu from '@/pages/Layout/MobileMenu.vue';
import { getUserRoleById } from '../../api_wrapper/user';
import { getUserIdByToken } from '../../api_wrapper/token';
import Cookies from 'js-cookie';

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
  },
  data() {
    return {
      sidebarBackground: 'blue',
      userRole: '',
    };
  },
  async mounted() {
    const userToken = Cookies.get('token');
    const userId = await getUserIdByToken(userToken);
    this.userRole = await getUserRoleById(userId);
  },
};
</script>
