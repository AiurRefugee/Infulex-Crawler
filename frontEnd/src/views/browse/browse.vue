<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/apis/axiosWrapper.js";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import aiqiyiVideos from "./components/aiqiyiVideo.vue";
import tmdbVideo from "./components/tmdbVideo.vue";
// 可以在组件中的任意位置访问 `store` 变量 ✨
import { layoutStore } from "@/stores/layout";
import { tmdbApi } from "@/apis/tmdbApi.js";
import { aiqiyiApi } from "@/apis/aiqiyiApi.js";

const router = useRouter();
const layout = layoutStore();
const showTab = computed(() => layout.showTab); 

const defaultArray = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]; 

const nowPlayingMovie = ref(defaultArray); // 正在热映
const movieTrending = ref(defaultArray); // 热门电影
const topRatedMovie = ref(defaultArray); // 评分最高 电影
const aiqiyiTVTrending = ref(defaultArray); // 爱奇艺 电视剧热播
const tvTrending = ref(defaultArray); // 热门剧集
const aiqiyiUpcoming = ref(defaultArray); // 爱奇艺 即将带来
const aiqiyiWangju = ref(defaultArray); // 爱奇艺 网剧

const getNowPlayingMovie = async () => {
  tmdbApi.getNowPlayingMovies().then((videos) => {
    nowPlayingMovie.value = videos.results;
  }).catch(err => {
    console.log('getNowPlayingMovie', err)
  })
};

const getMovieTrending = () => {
  tmdbApi.getTrendingMovies().then((videos) => {
    movieTrending.value = videos.results;
  }).catch(err => {
    console.log('getMovieTrending', err)
  })
  
};

const getTopRatedMovie = () => {
  tmdbApi.getTopRatedMovies().then((videos) => {
    topRatedMovie.value = videos.results;
  }).catch(err => {
    console.log('getTopRatedMovie', err)
  })
};

const getTVTrending = () => {
  tmdbApi.getTrendingTVSeries().then((videos) => {
    tvTrending.value = videos.results;
  }).catch(err => {
    console.log('getTVTrending', err)
  })
};

const getAiqiyiVideos = async () => {
  const videos = await aiqiyiApi.getVideos();
  aiqiyiTVTrending.value = videos?.tvTrending?.slice(0, 20);
  aiqiyiUpcoming.value = videos?.upcoming?.slice(0, 20);
  aiqiyiWangju.value = videos?.wangju?.slice(0, 20);
};

const showAll = (apiName, title) => {
  router.push({ 
    path: '/browse/' + title,
    query: {
      apiName
    }
  });
}

onMounted(async () => {
  layout.setTabIconVisible(true)
  getNowPlayingMovie();
  getMovieTrending();
  getTopRatedMovie();
  getTVTrending();
  getAiqiyiVideos();
});
</script>
<template>
  <scrollView 
    class="bg-light-900 trans" 
    :class="showTab ? '' : ''"
  >
    <template v-slot:header>
      <scrollHeader class="h-[45px]">
        <template v-slot:center>
          <h1 class="text-dark-900 select-none text-xl font-bold">浏览</h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <h1 class="px-4 text-[1.6em] font-bold mb-2 text-dark-900">浏览</h1>

      <aiqiyiVideos
        :title="'电视剧热播榜'"
        :path="'/aiqiyiTVsTrending'"
        :videoPath="'tvTrending'"
        :aiqiyiList="aiqiyiTVTrending"
      />

      <div class="divider"></div>

      <videoListBasic :list="nowPlayingMovie" :title="'正在上映'" >
        <template #showAll>
          <button 
            class="showAllButton" 
            @click="showAll('getNowPlayingMovies', '正在上映')"
          >查看全部</button>
        </template>
        <template #card="{ media }">
          <videoCardBasic
            class="pr-2"
            :media="media"
            :mediaType="'movie'"
            :toDetail="true"
          />
        </template>
      </videoListBasic>

      <div class="divider"></div>

      <videoListBasic :list="movieTrending" :title="'热门电影'" >
        <template #showAll>
          <button 
            class="showAllButton" 
            @click="showAll('getTrendingMovies', '热门电影')"
          >查看全部</button>
        </template>
        <template #card="{ media }">
          <videoCardBasic
            class="pr-2"
            :media="media"
            :mediaType="'movie'"
            :toDetail="true"
          />
        </template>
      </videoListBasic> 

      <div class="divider"></div> 

      <videoListBasic :list="tvTrending" :title="'热门剧集'" >
        <template #showAll>
          <button 
            class="showAllButton" 
            @click="showAll('getTrendingTVSeries', '热门剧集')"
          >查看全部</button>
        </template>
        <template #card="{ media }">
          <videoCardBasic
            class="pr-2"
            :media="media"
            :mediaType="'tv'"
            :toDetail="true"
          />
        </template>
      </videoListBasic>  

      <div class="divider"></div> 

      <aiqiyiVideos
        :title="'网剧热播榜'"
        :path="'/aiqiyiWangju'"
        :videoPath="'wangju'"
        :aiqiyiList="aiqiyiWangju"
      />

      <div class="divider"></div> 

      <videoListBasic :list="topRatedMovie" :title="'高分电影'" >
        <template #showAll>
          <button 
            class="showAllButton" 
            @click="showAll('getTopRatedMovies', '高分电影')"
          >查看全部</button>
        </template>
        <template #card="{ media }">
          <videoCardBasic
            class="pr-2"
            :media="media"
            :mediaType="'movie'"
            :toDetail="true"
          />
        </template>
      </videoListBasic>   

      <div class="h-20"></div>
    </template>
  </scrollView>
</template>
<style lang="scss" scoped>
.divider {
  $space: 0.6em;
  height: 1px;
  // display: none;
  background-color: rgba(172, 172, 172, 0.4);
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: $space;
  margin-bottom: $space * 2;
  @media (width <= 1440px) {
    background-color: transparent;
    // $space: 5px;
    margin-top: $space;
    margin-bottom: $space;
  }
}
.scrollViewArea:nth-child(1) {
  background: red;
  .borderB {
    border-bottom: none;
  }
}
</style>