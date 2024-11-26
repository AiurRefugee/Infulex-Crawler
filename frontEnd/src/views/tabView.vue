<script setup>
import { ref, computed, onMounted } from "vue";
import { layoutStore } from "@/stores/layout";

const layout = layoutStore(); 
const tabIconVisible = computed(() => layout.tabIconVisible);  
 

onMounted(() => {});
</script>
<template>
  <div class="tabViewWrapper">

    <div class="tabcontent">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss">
@import "@/style/variables.scss";

.tabViewWrapper {
  width: 100vw;
  height: 100dvh;
  display: flex;
  position: relative;
  justify-content: space-between;
  background: var(--bg_light_primary);
  .tabListWrapper {
    flex-shrink: 0;
    translate: 0 0;
    height: 100vh;

    .tablist {
      width: var(--tab_width);
      height: 100dvh;
      border-right: $borderSize solid lightgray;
      border-collapse: separate;
      transition: $transBase;
      display: flex;
      flex-direction: column;
      z-index: 999;
    }
  }

  .tabcontent {
    width: 100%;
    // height: 100vh;
    flex: 1;
    position: relative;
    transition: $transBase;
    // transform: translate(0, 0);
    overflow: hidden;
    translate: 0 0;
    .scrollWrapper {
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      .test {
        width: 80%;
        height: 50vh;
        background-color: gray;
        margin: 8px;
        flex-shrink: 0;
      }
    }
  }
}
</style>