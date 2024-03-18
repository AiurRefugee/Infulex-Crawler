<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import { useFilmStore } from "@/stores/films";
import OverviewList from "@/components/overviewList.vue";
import DailRecommend from "@/components/dailRecommend.vue";
import ClassButtonList from "@/components/classButtonList.vue";
import BasicList from "@/components/basicList.vue";
import ScrollView from "@/views/ScrollView.vue";

// 可以在组件中的任意位置访问 `store` 变量 ✨
const filmStore = useFilmStore();

const router = useRouter();
const route = useRoute();

const tmdbAPIPrefix = "/tmdb";
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";

const title = ref("浏览");
const trendingType = ref("movie");
const movies = ref([]);
const popularMovies = ref([]);
const upcomingMovies = ref([]);
const trendingMovies = ref([]);
const trendingTV = ref([]);
const genreMedia = ref([]);

onMounted(async () => {
  //  const testRes = await get(tmdbAPIPrefix + '/discover/movie', {
  //     language: 'zh-CN',
  //     with_genres: '14'
  //  })
  //  movies.value = testRes.results
  get(tmdbAPIPrefix + "/movie/popular", {
    language: "zh-CN",
  }).then((data) => (popularMovies.value = data.results));
  get(tmdbAPIPrefix + "/movie/upcoming", {
    language: "zh-CN",
  }).then((data) => (upcomingMovies.value = data.results));
  get(tmdbAPIPrefix + "/trending/movie/week", {
    language: "zh-CN",
  }).then((data) => {
    trendingMovies.value = data.results;
    console.log(trendingMovies.value);
  });
  get(tmdbAPIPrefix + "/trending/tv/week", {
    language: "zh-CN",
  }).then((data) => {
    trendingTV.value = data.results;
  });
//   for (const genre of genres) {
//     get(tmdbAPIPrefix + "/discover/movie", {
//       language: "zh-CN",
//       with_genres: genre.id,
//     }).then((data) => genreMedia.value.push(data.results));
//   }
});
</script>
<template>
  <ScrollView :title="'浏览'">
    <div class="browseWrapper">
      <header class="navHeader">
        <h1 id="scrollTitle" class="text-2xl pl-4 flex items-center">浏览</h1>
      </header>
      <DailRecommend :movies="popularMovies" />
      <!-- <div class="browseDivdier"></div> -->
      <BasicList :medias="upcomingMovies" :title="'最新上映'" />
      <ClassButtonList/>
      <OverviewList :medias="trendingMovies" />
      
      <!-- <BasicList
        v-for="(meida, index) in genreMedia"
        :key="index"
        :meidas="meida"
        :title="genres[index].name"
      /> -->
      <BasicList :medias="trendingTV" :title="'热门剧集'" />
      <div class="w-full h-52"></div>
    </div>
  </ScrollView>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
$upperHeight: 52vh;
$castHeight: 40vh;
$basicColor: rgb(172, 172, 172);
* {
  border: 1px solid gray;
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
  transform: 0;
  display: flex;
  flex-direction: column;
  color: white;
  background: gray;
  transform: translateX(0);
}

.upcomingWrapper {
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