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
  mediaStore.initMediaStore();
});
</script>
<template>
  <div class="tabViewWrapper">
    <div
      class="tabIcon h-[40px] aspect-square flex items-center fixed top-0 left-3 z-[100] cursor-pointer"
      @click="layout.toogleTab"
      v-if="tabIconVisible"
    > 
      <svg 
        class="h-[35px] aspect-square"
        viewBox="0 0 1024 1024" 
      >
        <path
          fill="#f59305fa"
          d="M384 213.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334zM263.253333 213.333333a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 0 1 0-85.333334h49.92zM640 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-49.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h305.92zM384 725.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h49.92z"
          p-id="4204"
        ></path>
      </svg>
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