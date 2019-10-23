<template>
  <div>
    <m-menu>
      <template v-for="v in data">
        <m-submenu v-if="v.chilren"></m-submenu>
        <template slot="title">{{v.name}}</template>
        <reSub :data="v" :key="v.id" v-if="v.children"></reSub>
        <m-menu-item v-else :key="v.id">{{v.name}}</m-menu-item>
      </template>
    </m-menu>
  </div>
</template>
<script>
import mMenu from "./m-menu";
import mMenuItem from "./m-menu-item";
import mSubmenu from "./m-submenu";
import reSub from "./resub";
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    mMenu,
    mMenuItem,
    mSubmenu,
    reSub
  }
};
</script>