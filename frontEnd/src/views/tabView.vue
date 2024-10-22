<script setup>
import { ref, computed, onMounted } from "vue";
import { layoutStore } from "@/stores/layout";
import NavList from "@/components/navList.vue";

const layout = layoutStore();

const size = computed(() => layout.size);
const showTab = computed(() => layout.showTab);
const tabIconVisible = computed(() => layout.tabIconVisible);

const breakPointSmall = 600;
const breakPointNormal = 1400;

const title = "Infulex";

const tabWidthSmall = "60vw";
const tabWidthNormal = "200px";
const tabWidthLarge = "18vw";
const padtop = "2rem";

const contentHeader = ref();
const content = ref();

const tabcontentLeft = computed(() => {
  const leftSpace = getCSSVariable("--tabWidth");
  if (size.value == "large") {
    return leftSpace;
  }
  if (size.value == "small") {
    return 0;
  }
  if (size.value == "normal") {
    if (showTab.value) {
      return leftSpace;
    } else {
      return 0;
    }
  }
});

const tabTranslate = computed(() => {
  if (size.value == "normal") {
    return showTab.value ? "0" : "-100%";
  } else {
    return 0;
  }
});

function getCSSVariable(name) {
  const root = document.documentElement;
  // 获取CSS变量
  return root.style.getPropertyValue(name);
}

// function setCSSVariable(name, value) {
//   const root = document.documentElement;
//   // 设置CSS变量
//   root.style.setProperty(name, value);
// }


onMounted(() => {});
</script>
<template>
  <div class="tabViewWrapper">
    <div 
      class="tabIcon h-[45px] aspect-square flex items-center fixed top-0 left-4 z-[100] cursor-pointer" 
      @click="layout.toogleTab"
      v-if="tabIconVisible"
    >
      <img class="h-[35px] aspect-square" src="/src/assets/icons/filter.svg" />
      <!-- <h1 class="whitespace-nowrap text-xl font-bold text-black">Infulex-Crawler</h1> -->
    </div>
    <NavList />

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
  background: var(--bgLight_Primary);
  .tabListWrapper {
    flex-shrink: 0;
    translate: 0 0;
    height: 100vh;

    .tablist {
      width: var(--tabWidth);
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