<template>
  <div class="sidebar" :data-color="sidebarItemColor">
    <div class="logo">
      <a href="#" class="simple-text logo-mini">
        <img :src="imgLogo" alt="" />
      </a>
      <a class="simple-text logo-normal">
        {{ title }}
      </a>
    </div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          >
          </sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from './SidebarLink.vue';

export default {
  components: {
    SidebarLink,
  },
  props: {
    title: {
      type: String,
      default: 'Count of money',
    },

    imgLogo: {
      type: String,
      default: require('@/assets/img/Bitcoin.png'),
    },
    sidebarItemColor: {
      type: String,
      default: 'green',
      validator: value => {
        let acceptedValues = ['', 'purple', 'blue', 'green', 'orange', 'red'];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
  .sidebar {
    background-color: #3e3e3e;
  }
}
</style>
