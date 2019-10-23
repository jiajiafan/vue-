<template>
  <li>
    <span @click="isShow=!isShow">
      <slot name="title"></slot>
    </span>
    <ul v-show="isShow">
      <slot></slot>
    </ul>
  </li>
</template>
<style lang="">
</style>
<script>
export default {
  data() {
    return {
      isShow: false,
      
    };
  }
};
</script>