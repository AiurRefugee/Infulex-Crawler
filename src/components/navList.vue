<script setup>
import { ref, computed, onMounted } from "vue";
import { layoutStore } from "@/stores/layout";
import ScrollView from "@/views/ScrollView.vue";
import gsap from "gsap";
const store = layoutStore();

const layoutContent = computed(() => store.layoutContent);
const size = computed(() => store.size);
const typeWidth = 50;
const activeMediaIndex = ref(0);
const title = ref("Infulex");
const scale = false;

function toogleItem(item, index) {
  if (item.children.length > 0 && "showChild" in item) {
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
});
</script>
<template>
  <ScrollView :title="'Infulex'" v-if="size != 'small'">
    <div class="tabNavWrapper">
      <header class="navHeader">
        <h1 id="scrollTitle" class="text-2xl">{{ title }} {{ size }}</h1>
      </header>
      <div
        v-for="(item, index) in layoutContent"
        :key="item.text"
        class="w-full"
      >
        <div class="w-full">
          <button class="tabItem" @click="toogleItem(item, index)">
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
            class="tabNavChild"
          >
            <img class="icon" :src="child.image" />
            <text>{{ child.text }}</text>
          </button>
        </div>
      </div>
      <div class="w-full h-4/5 flex-shrink-0"></div>
    </div>
  </ScrollView>
  <div class="bottomList" v-else>
    <button
      class=" bg-transparent flex flex-col justify-center items-center h-full"
      v-for="(item, index) in layoutContent"
      :key="index"
    >
      <div class="">
        <img class="navBottomImage" :src="item.image" />
      </div>
      <div>
        <text class="text-sm">{{ item.text }}</text>
      </div>
    </button>
  </div>
</template>
<style scoped lang="scss">
$tabNavWrapperWidth: 30vw;
$tabHeight: 2px;
$navTxSize: 16px;
$itemHeight: 35px;
@import "@/style/variables.scss";
// * {
//   background: gray;
// }
.icon {
  width: 1rem;
  display: flex;
  aspect-ratio: 1 / 1;
  margin: 0 0.5rem;
  transition: $basicTrans;
}
.tabNavWrapper {
  color: white;
  background: gray;
  width: var(--tabWidth);
  height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  .navHeader {
    width: 100%;
    height: 6vh;
    flex-shrink: 0;
  }
  .tabItem {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: $itemHeight;
  }
  .subWrapper {
    width: 100%;
    padding-left: 5%;
    overflow: hidden;
    position: relative;
    // transition: $basicTrans;
    .tabNavChild {
      width: 100%;
      height: $itemHeight;
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