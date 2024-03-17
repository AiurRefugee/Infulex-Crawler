<script setup>
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
import List from "@/components/list.vue";
import TabView from "@/components/tabView.vue";
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
  <!-- <div class="homeWrapper" @scroll="changeHeader">
    <Header></Header>
    <List listTitle="每日推荐" :array="films">
      <template v-slot="{ item }">
        <div class="card">
          <div class="card-body mb-2">
            <div class="cardIcon">
              <img class="w-full h-full" src="/src/assets/icons/play-circle.svg" alt="">
            </div>
            <img class="cardBackground" :src="getFilmImage(item.imageUrls)">
          </div>
          <div class="primText">{{ item.film.title }}</div>
          <div class="year">{{ item.film.release_date}}</div>
        </div>
      </template>
    </List>
    <List listTitle="评分最高" :canShowAll="false" :array="topTwenty">
      <template v-slot="{ item }">
        <basicFilmCard :item="item" />
      </template>
    </List>
    <classButtonList />
    <List listTitle="全部影片" :canShowAll="true" :array="films">
      <template v-slot="{ item }">
        <basicFilmCard :item="item" />
      </template>
    </List>
    <div class="w-full h-20"></div>
  </div> -->
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