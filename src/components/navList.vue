<script setup>
import { ref, computed } from "vue";
import { layoutStore } from "@/stores/layout";
import ScrollView from "@/views/ScrollView.vue";
import gsap from "gsap";
const store = layoutStore(); 

const layoutContent = computed(() => store.layoutContent);
const typeWidth = 50;
const activeMediaIndex = ref(0);
const title = ref('Infulex')
const scale = false;

function toogleItem(item, index) {
  if (item.children.length > 0 && 'showChild' in item) {
    const itemHeight = 35
    const length = item.children.length
    item.showChild = !item.showChild 
    const subWrapper = document.querySelectorAll(`.subWrapper`)[index]
    const duration = 0.3
    if (item.showChild) {
      gsap.to(subWrapper, {
        duration: duration, 
        height: itemHeight * length + 'px',
        ease: 'none'
      })
      subWrapper.querySelectorAll('.tabNavChild').forEach((item, i) => {
        gsap.to(item, {
          duration: duration, 
          y: 0,
          ease: 'none'
        })
      })
    } else {
      gsap.to(subWrapper, {
        duration: duration,  
        height: '0',
        ease: 'none',
      })
      subWrapper.querySelectorAll('.tabNavChild').forEach((item, i) => {
        gsap.to(item, {
          duration: duration, 
          y: -itemHeight * length + 'px',
          ease: 'none'
        })
      })
      
    }
  }

}
</script>
<template>
  <ScrollView :title="'Infulex'">
    <div class="tabNavWrapper">
      <header class="navHeader">
        <h1 id="scrollTitle" class="text-2xl">{{ title }}</h1>
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
                <img class="icon" :style="{rotate: item.showChild ? '90deg' : ''}" src="/src/assets/icons/arrow.svg" />
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
</template>
<style scoped lang="scss">
$tabNavWrapperWidth: 30vw;
$tabHeight: 2px;
$navTxSize: 16px;
$itemHeight: 35px;
@import "@/style/variables.scss";
* {
  background: gray;
}
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 5%;
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
</style>