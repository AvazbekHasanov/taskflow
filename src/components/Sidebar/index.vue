<template>
  <div :class="{'has-logo': showLogo}">
    <div class="flex flex-row">
<img src="https://www.fido-biznes.uz/wp-content/uploads/2023/09/footerlogo.svg" alt="Fido-Biznes" style="max-width: 200px;">
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="menuStyles.menuBg"
        :text-color="menuStyles.menuText"
        :unique-opened="false"
        :active-text-color="menuStyles.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
<sidebar-item
  v-for="route in routes"
  :key="route.path"
  :item="route"
  :base-path="route.path"

/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import {Edit} from "@element-plus/icons-vue";

export default {
  components: {Edit, SidebarItem, Logo },
  props: {
    showLogo: {
      type: Boolean,
      default: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    menuStyles: {
      type: Object,
      default: () => ({
        menuBg: '#ffffff', // Default background color
        menuText: '#303133', // Default text color
        menuActiveText: '#409EFF' // Default active text color
      })
    },
 routes: {
    type: Array,
    default: () => {
      const userRole = 'CO'
          // JSON.parse(localStorage.getItem('user_info')).role;
      const routes = [
        { path: '/cabinet/dashboard', name: 'Dashboard', meta: { title: 'Dashboard', icon: 'Document' }, perm: false },
        { path: '/cabinet/projects', name: 'Projects', meta: { title: 'Projects', icon: 'Briefcase' }, perm: false },
        { path: '/cabinet/workers', name: 'Employees', meta: { title: 'Employees', icon: 'User' }, perm: 'CO' },
        { path: '/cabinet/tasks', name: 'Tasks', meta: { title: 'Tasks', icon: 'List' }, perm: false },
        { path: '/cabinet/profile', name: 'Profile', meta: { title: 'Profile', icon: 'UserFilled' }, perm: false }
      ];

      // Remove the 'Workers' menu item if the user doesn't have 'CO' role
      if (userRole !== 'CO') {
        return routes.filter(route => route.name !== 'Employees');
      }

      return routes;
    }
    }

  },
  computed: {
    activeMenu() {
      const { meta, path } = this.$route
      return meta.activeMenu || path
    }
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('user_info')) || { role: '' },
    };
  }
}
</script>

<style >
.has-logo {
  /* Additional styling for 'has-logo' class if needed */
}
.el-menu{
  background-color: transparent !important;
}
</style>
