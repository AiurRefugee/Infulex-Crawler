<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import { useFilmStore } from "@/stores/films";
import OverviewCard from "@/components/overviewCard.vue";

import ScrollView from "@/views/ScrollView.vue";
// 可以在组件中的任意位置访问 `store` 变量 ✨
const filmStore = useFilmStore();

const router = useRouter();
const route = useRoute();

const tmdbAPIPrefix = "/tmdb";
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";

const title = ref("浏览");
const movies = ref([]);
const popularMovies = ref([]);
const upcomingMovies = ref([]);
const trendingMovies = ref([]);
const trendingTV = ref([]);

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
});
</script>
<template>
  <div class="browseWrapper">
    <ScrollView :title="'浏览'">
      <header class="navHeader">
        <h1 id="scrollTitle" class="text-2xl">浏览</h1>
      </header>
      <div class="dailRecWrapper">
        <h2 class="h-1/6">每日推荐</h2>
        <div
          class="w-full h-5/6 flex flex-1 items-center overflow-x-auto overflow-y-hidden"
        >
          <div class="dailCard" v-for="movie in popularMovies" :key="movie">
            <div class="w-full h-3/4">
              <img
                class="w-full h-full object-cover"
                :src="imageSrcPrefix + movie.backdrop_path"
              />
            </div>
            <p class="filmTitle">{{ movie.title || "--" }}</p>
            <p class="text-sm">{{ movie.release_date }}</p>
          </div>
        </div>
      </div>
      <div class="trendingWrapper">
        <h2 class="h-1/6">热门电影</h2>
        <div class="w-full h-5/6 flex flex-col flex-wrap overflow-auto">
          <OverviewCard
            :media="media"
            v-for="media in trendingMovies"
            :key="media"
          />
        </div>
      </div>
      <div class="trendingWrapper">
        <h2 class="h-1/6">热门剧集</h2>
        <div class="w-full h-5/6 flex flex-col flex-wrap overflow-auto">
          <OverviewCard
            :media="media"
            v-for="media in trendingTV"
            :key="media"
          />
        </div>
      </div>
      <div class="upcomingWrapper">
        <h2 class="h-1/6">即将上映</h2>
        <div
          class="w-full h-5/6 flex flex-1 items-center overflow-x-auto overflow-y-hidden"
        >
          <div class="basicCard" v-for="movie in upcomingMovies" :key="movie">
            <div class="w-full h-3/4">
              <img
                class="w-full h-full object-cover"
                :src="imageSrcPrefix + movie.poster_path"
              />
            </div>
            <p class="filmTitle">{{ movie.title || "--" }}</p>
            <p class="text-sm">{{ movie.release_date }}</p>
          </div>
        </div>
      </div>
      <div class="w-full h-52"></div>
    </ScrollView>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
$upperHeight: 52vh;
$castHeight: 40vh;
$basicColor: rgb(172, 172, 172);
* {
  border: 1px solid gray;
}
.filmTitle {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.browseWrapper {
  width: 100%;
  height: 100vh;
  transform: 0;
  color: white;
  background: gray;
  transform: translateX(0);
}
.dailRecWrapper {
  width: 100%;
  height: 40vh;
  .dailCard {
    --dailNum: 3.1;
    width: calc(100% / var(--dailNum));
    height: 100%;
    flex-shrink: 0;
    padding-right: 1rem;
    @media (width <=628px) {
      --dailNum: 1.1;
    }
    .dailTitle {
      font-size: 1;
    }
  }
}
.trendingWrapper {
  width: 100%;
  height: 40vh;
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
.basicCard {
  --basciNum: 8.1;
  width: calc(100% / var(--basciNum));
  height: 100%;
  padding-right: 1%;
  flex-shrink: 0;
  @media (width <=628px) {
    --basciNum: 4.1;
  }
}
</style>