<script setup>
import { ref, computed, onMounted } from "vue";
import { layoutStore } from "@/stores/layout";
import NavList from "@/components/navList.vue";
import { useMediaStore } from "@/stores/media";
const mediaStore = useMediaStore();
const layout = layoutStore();
const tabIconVisible = computed(() => layout.tabIconVisible);
const showTab = computed(() => layout.showTab);
const size = computed(() => layout.size);
const shouldTrans = computed(() => showTab.value && size.value != 'small');

onMounted(() => {
  // mediaStore.initMediaStore();
  layout.calSize()
  layout.setTabIconVisible(true)
  window.addEventListener("resize", layout.calSize);
});
</script>
<template>
  <div class="tabViewWrapper">
    <div
      class="tabIcon h-[45px] w-[40px] flex items-center fixed top-0 left-3 z-[100] cursor-pointer"
      @click="layout.toogleTab"
      v-if="tabIconVisible"
    > 
      <img src="@/assets/icons/sideBar.svg"/>
      <!-- <h1 class="whitespace-nowrap text-xl font-bold text-black">Infulex-Crawler</h1> -->
    </div>
    <NavList />

    <div 
      class="tabcontent flex"
    >
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
    width: 100vw;
    // height: 100vh;
    flex: 1;
    position: relative; 
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