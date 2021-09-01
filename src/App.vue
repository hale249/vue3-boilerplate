<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { PUBLIC_LAYOUT } from "./constants";

export default {
  name: "App",
  components: {},

  setup() {
    const route = useRoute();
    console.log(route);
    return {
      layout: computed(() => (route.meta.layout || PUBLIC_LAYOUT) + "-layout"),
    };
  },
};
</script>

<style lang="scss">
</style>
