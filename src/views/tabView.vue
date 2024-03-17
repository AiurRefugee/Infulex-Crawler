<script setup>
import { ref, computed, onMounted } from "vue";
import ScrollView from "@/views/ScrollView.vue";
import { layoutStore } from "@/stores/layout";
import NavList from "@/components/navList.vue";

const layout = layoutStore();

const size = computed(() => layout.size);

const breakPointSmall = 600;
const breakPointNormal = 1400;

const title = "Infulex";

const tabWidthSmall = "60vw";
const tabWidthNormal = "200px";
const tabWidthLarge = "18vw";
const padtop = "2rem";

const contentHeader = ref();
const content = ref();
const showTab = ref(true);

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

function toogle() {
  showTab.value = !showTab.value;
}

onMounted(() => {});
</script>
<template>
  <div class="tabViewWrapper">
    <div class="tabListWrapper" v-if="size != 'small'">
      <div
        class="tablist"
        
        :style="{
          translate: tabTranslate,
          // paddingTop: size == 'normal' ? '5vh' : 0
        }"
      >
        <NavList />
      </div>
      
    </div>
    <div v-else class="bottomList"></div>
    <div class="tabcontent" :style="{ paddingLeft: tabcontentLeft }">
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
  .tabListWrapper {
    width: var(--tabWidth);
    flex-shrink: 0;
    height: 100vh;
    @media (width >=600px) and (width <= 1400px) {
      --tabWidth: 250px;
    }
    @media (orientation: portrait) {
      --tabWidth: 32vw;
    }
    @media (width >= 1400px) {
      --tabWidth: 18vw;
    }
    .tablist {
      width: var(--tabWidth);
      height: 100dvh;
      border-right: $borderSize solid lightgray;
      border-collapse: separate;
      transition: $basicTrans; 
      display: flex;
      flex-direction: column;
      z-index: 999; 
    }
  }

  .bottomList {
    width: 100vw;
    position: absolute;
    border-top: 1px solid lightgray;
    bottom: 0;
  }
  .tabcontent {
    width: calc(100% - var(--tabWidth));
    height: 100vh;
    flex: 1;
    position: relative;
    transition: $basicTrans;
    overflow-x: hidden;
    overflow-y: auto;

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