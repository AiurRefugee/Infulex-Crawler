<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import commonScrollHeader from "@/components/commonScrollHeader.vue";
import { layoutStore } from "@/stores/layout";
import Crousel from "@/components/Crousel.vue";
import OverviewList from "@/components/overviewList.vue";
import DailRecommend from "@/components/dailRecommend.vue";
import ClassButtonList from "@/components/classButtonList.vue";
import BasicList from "@/components/basicList.vue";
import ScrollView from "@/views/ScrollView.vue"; 

// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = layoutStore();
const genres = computed(() => store.genres);

const router = useRouter();
const route = useRoute();

const tmdbAPIPrefix = "/tmdb";
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";

const title = ref("浏览");
const trendingType = ref("movie");
const movies = ref(["", "", "", "", "", ""]);
const popularMovies = ref(["", "", "", "", "", ""]);
const popularTV = ref(["", "", "", "", "", ""]);
const nowPlayingMovies = ref(["", "", "", "", "", ""]);
const trendingMovies = ref(["", "", "", "", "", ""]);
const trendingTV = ref(["", "", "", "", "", ""]);
const topRatedMovies = ref(["", "", "", "", "", ""]);
const topRatedTV = ref(["", "", "", "", "", ""]);
const animationMovies = ref(["", "", "", "", "", ""]);
const animationTV = ref(["", "", "", "", "", ""]);
const movieInOneYear = ref(["", "", "", "", "", ""]);

const size = computed(() => store.size);
const showTabFlg = computed( () => {
  if (size.value != 'small') {
    return !store.showTab
  } else {
    return true
  }
})

onMounted(async () => {
  //  const testRes = await get(tmdbAPIPrefix + '/discover/movie', {
  //     language: 'zh-CN',
  //     with_genres: '14'
  //  })
  //  movies.value = testRes.results
  get(tmdbAPIPrefix + "/movie/popular", {
    language: "zh-CN",
  }).then((data) => (popularMovies.value = data.results));
  get(tmdbAPIPrefix + "/tv/popular", {
    language: "zh-CN",
  }).then((data) => (popularTV.value = data.results));

  get(tmdbAPIPrefix + "/movie/now_playing", {
    language: "zh-CN",
  }).then((data) => (nowPlayingMovies.value = data.results));
  // get(tmdbAPIPrefix + "/tv/now_playing", {
  //   language: "zh-CN",
  // }).then((data) => (nowPlayingTV.value = data.results));
  get(tmdbAPIPrefix + "/trending/movie/week", {
    language: "zh-CN",
  }).then((data) => {
    trendingMovies.value = data.results;
  });
  get(tmdbAPIPrefix + "/trending/tv/week", {
    language: "zh-CN",
  }).then((data) => {
    trendingTV.value = data.results;
  });
  get(tmdbAPIPrefix + "/tv/top_rated", {
    language: "zh-CN",
  }).then((data) => (topRatedTV.value = data.results));
  get(tmdbAPIPrefix + "/discover/movie", {
    language: "zh-CN",
    with_genres: "16",
  }).then((data) => (animationMovies.value = data.results));
  get(tmdbAPIPrefix + "/discover/tv", {
    language: "zh-CN",
    with_genres: "16",
    "primary_release_date.gte": "2010-01-01",
    with_origin_country: "JP",
  }).then((data) => (animationTV.value = data.results));
  get(tmdbAPIPrefix + "/movie/top_rated", {
    language: "zh-cn",
  }).then((data) => (topRatedMovies.value = data.results));
});
</script>
<template>
  <ScrollView :title="'浏览'">
    <template v-slot:header>
      <commonScrollHeader :title="title" :showTabFlag="showTabFlg"/>
    </template>
    <template v-slot:content>
      <div class="browseWrapper">
        <header class="navHeader">
          <h1 id="scrollTitle" class="text-2xl pl-4 flex items-center">浏览</h1>
        </header>
        <!-- <div class="w-full h-4"></div> -->
        <!-- <Crousel :medias="popularMovies" :title="'最受欢迎的电影'" /> -->

        <DailRecommend :medias="popularMovies" :title="'最受欢迎的电影'" />
        <div class="w-full h-4"></div>
        <!-- <div class="browseDivdier"></div> -->
        <BasicList :medias="nowPlayingMovies" :title="'正在热映'" />
        <div class="w-full h-4"></div>
        <ClassButtonList />
        <div class="w-full h-4"></div>
        <OverviewList :medias="trendingMovies" :title="'本周影片趋势'" />
        <div class="w-full h-4"></div>
        <BasicList :medias="animationMovies" :title="'动画电影'" />
        <div class="w-full h-4"></div>
        <!-- <BasicList :medias="movieInOneYear" :title="'近一年的电影'" />
      <div class="w-full h-4"></div> -->
        <DailRecommend :medias="topRatedTV" :title="'最受欢迎的节目'" />
        <div class="w-full h-4"></div>
        <OverviewList :medias="trendingTV" :title="'热门剧集'" />
        <BasicList :medias="topRatedTV" :title="'高分剧集'" />
        <div class="w-full h-4"></div>

        <!-- <BasicList :medias="" -->
        <!-- <BasicList
        v-for="(meida, index) in genreMedia"
        :key="index"
        :medias="meida"
        :title="genres[index].name"
      /> -->
        <div class="w-full h-56"></div>
      </div>
    </template>
  </ScrollView>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
$upperHeight: 52vh;
$castHeight: 40vh;
$basicColor: rgb(172, 172, 172);
* {
  // border: 1px solid gray;
}
img {
  height: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 5px;
}
.browseDivdier {
  width: 98%;
  height: 3px;
  align-self: center;
  flex-shrink: 0;
  background: white;
}
.browseWrapper {
  width: 100%; 
  // padding: 0 1rem;
  display: flex;
  flex-direction: column;
  color: white;
  // background: gray;
  // transform: translateX(0);
}

.nowPlayingWrapper {
  width: 100%;
  height: 35vh;
}
.gridWrapper {
  width: 100%;
  height: 83.333333%;
  display: grid;
  overflow: auto;
  grid-template-rows: repeat(3, 30%);
  grid-template-columns: repeat(auto-fill, 45%);
}
</style>