<script setup>
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
import List from "@/components/list.vue";
import TabView from "@/views/tabView.vue";
import classButtonList from "@/components/classButtonList.vue";
import basicFilmCard from "@/components/basicFilmCard.vue"; 
import { useRouter } from "vue-router";
import gsap from "gsap"; 

import { useFilmStore } from '@/stores/films'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useFilmStore() 

const films = computed( () => store.films );
const topTwenty = computed( () => store.topTwenty );
 
function getFilmImage(urls) {
  const filmImageBaseUrl = '/filmImages/w900'
  return filmImageBaseUrl + urls[0]
}
 

function changeHeader(event) {
  const top = event.target.scrollTop 
  const x = Math.min(top, 50) / 50
  document.documentElement.style.setProperty("--headerOpacity", `${ 1 - Math.pow(1 - x, 2) }`);
}
</script>
<template>
  <TabView></TabView> 
</template>
<style lang="scss">
@keyframes enter {
  from {
    opacity: 0.5;
    height: 0;
  }
  to {
    opacity: 1;
    height: 100vh;
  }
}
$headerHeight: 10px;
.homeWrapper {
  width: 100vw;
  height: 100vh;
  animation: enter 0.3s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-timeline-name: --squareTimeline;
}
</style>