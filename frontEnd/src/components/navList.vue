<script setup>
import { ref, computed, onMounted } from "vue";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { layoutStore } from "@/stores/layout";
import gsap from "gsap";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const layout = layoutStore();

const layoutContent = computed(() => layout.layoutContent);
const showTab = computed(() => layout.showTab); 
const size = computed(() => layout.size);
var standAlone = ref(false);

function navigate(item) {
  console.log("navigate", item);
  if (item.path) {
    router.push({
      path: item.path,
      replace: true,
    });
    setTimeout( () => {
      layout.setShowTaskDetailOnMobile(false)
    }, 500)
    if (window.innerWidth < 628) {
      layout.toogleTab()
      // layout.toogleTabIconVisible()
    }
    
  }
}

function toogleItem(item, index) {
  if (item.children && item.children.length > 0 && "showChild" in item) {
    const itemHeight = 35;
    const length = item.children.length;
    item.showChild = !item.showChild;
    const subWrapper = document.querySelectorAll(`.subWrapper`)[index];
    const duration = 0.3;
    if (item.showChild) {
      gsap.to(subWrapper, {
        duration: duration,
        height: itemHeight * length + "px",
        ease: "none",
      });
      subWrapper.querySelectorAll(".tabNavChild").forEach((item, i) => {
        gsap.to(item, {
          duration: duration,
          y: 0,
          ease: "none",
        });
      });
    } else {
      gsap.to(subWrapper, {
        duration: duration,
        height: "0",
        ease: "none",
      });
      subWrapper.querySelectorAll(".tabNavChild").forEach((item, i) => {
        gsap.to(item, {
          duration: duration,
          y: -itemHeight * length + "px",
          ease: "none",
        });
      });
    }
  }
}
onMounted(() => {
  console.log("layoutContent", layoutContent.value);
  standAlone.value =
    navigator.standalone ||
    window.matchMedia("(display-mode: standalone)").matches;
});
</script>
<template>
  <div
    class="tabNavWrapper trans overflow-auto bg-light-800 text-dark-900"
    :style="{
      width: showTab ? 'var(--tab_width)' : '0'
    }"
  >
    <scrollView class="tabList">
      <template v-slot:header>
        <scrollHeader class="h-[45px]" :showTab="showTab">
          <!-- <template #center>
            <h1 id="scrollTitle" class="text-lg">Influlex-Crawler</h1>
          </template> -->
        </scrollHeader>
      </template>
      <template v-slot:content>
        <header class="navHeader">
          <h1 id="scrollTitle" class="text-2xl">Influlex-Crawler</h1>
        </header>
        <div
          v-for="(item, index) in layoutContent"
          :key="index"
          @click="navigate(item)"
          class="w-full"
        >
          <div class="w-full">
            <button class="tabItem text-[1.2em] singleLine" @click="toogleItem(item, index)">
              <div class="flex">
                <img class="icon" :src="item.image" />
                <text>{{ item.text }}</text>
              </div>
              <div v-if="item.children">
                <button>
                  <img
                    class="icon"
                    :style="{ rotate: item.showChild ? '90deg' : '' }"
                    src="/src/assets/icons/arrow.svg"
                  />
                </button>
              </div>
            </button>
            <div class="divider" v-if="item.children"></div>
          </div>
          <div
            class="subWrapper"
            :style="{
              // height: item.children && item.showChild == false ? '0' : ''
            }"
          >
            <button
              v-for="child in item.children"
              :key="child.text"
              class="tabNavChild singleLine"
              @click="navigate(child)"
            >
              <img class="icon" :src="child.image" />
              <text>{{ child.text }}</text>
            </button>
          </div>
        </div>
        <div class="w-full h-4/5 flex-shrink-0"></div>
      </template>
    </scrollView>
  </div>
</template>
<style scoped lang="scss">
$tabNavWrapperWidth: 30vw;
$tabHeight: 2px;
$navTxSize: 16px;
$itemHeight: 35px;
::-webkit-scrollbar {
  display: none;
}
@import "@/style/variables.scss";
// * {
//   background: gray;
// }
.icon {
  width: 1rem;
  display: flex;
  aspect-ratio: 1 / 1;
  margin: 0 0.5rem;
  transition: $transBase;
}
.transNav {
  transform: translate(calc( -1 * var(--tab_width)), 0);
}
.tabList {
  backdrop-filter: blur(20px);
}
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: hsla(0, 0%, 13%, 0.94);
  z-index: 10;
} 
.tabNavWrapper {
  // background: var(--nav_bg_primary);
  width: var(--tab_width);
  height: 100dvh;
  // transition: width 0.25s linear;
  // will-change: width;
  display: flex;
  flex-direction: column;
  left: 0;
  // position: fixed;
  z-index: 99;
  // padding: 0 1rem;
  @media (width <= 1000px) {
    position: fixed;
    left: 0;
    z-index: 99;
  }
  .navHeader {
    width: 100%;
    padding: 0 1rem;
    flex-shrink: 0;
  }
  .tabItem {
    display: flex;
    width: 100%;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    height: $itemHeight;
  }
  .subWrapper {
    width: 100%;
    padding-left: 1.8rem;
    overflow: hidden;
    position: relative;
    // transition: $transBase;
    .tabNavChild {
      width: 100%;
      height: $itemHeight;
      color: var(--textColor_Primary);
      display: flex;
      align-items: center;
    }
  }
}
.bottomList {
  position: fixed;
  width: 100%;
  height: 10vh;
  padding-bottom: 1.2rem;
  color: white;
  backdrop-filter: blur(50px);
  background: rgba(76, 77, 78, 0.441);
  // padding: 5px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  justify-content: center;
  justify-items: center;
  bottom: 0;
  z-index: 999;
  .navBottomImage {
    height: 1.2rem;
    aspect-ratio: 1 / 1;
  }
}
</style>