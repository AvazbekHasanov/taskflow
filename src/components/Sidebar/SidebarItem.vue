<template>
  <div >
    <template
      v-if="hasOneShowingChild(item.children, item) &&
            (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
            !item.alwaysShow"
    >
      <app-link :to="item.path">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" class="submenu-title-noDropdown" style="padding-left: 20px; color: rgb(191, 203, 217); ">
          <component :is="item.meta.icon" class="menu-item-icon"/>
          <span class="menu-text"> {{item.name}}</span>
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script>
import path from 'path';
import AppLink from './Link.vue';
import Item from './Item.vue';
import { Document, Briefcase, User, List, Tickets, UserFilled } from '@element-plus/icons-vue';


export default {
  name: 'SidebarItem',
  components: {AppLink, Item},
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    this.onlyOneChild = null;
    return {
      userData: JSON.parse(localStorage.getItem('user_data'))
    };
  },
  mounted() {
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set (will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child routers to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = {...parent, path: '', noShowingChildren: true};
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      return routePath;
    },
  },
};
</script>

<style scoped>
.icon-container {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
}

.svg-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.menu-item-icon{
  width: 24px;
}


</style>
