<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/apis/axiosWrapper.js";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import aiqiyiVideos from "./components/aiqiyiVideo.vue";
// 可以在组件中的任意位置访问 `store` 变量 ✨

import { tmdbApi } from "@/apis/tmdbApi.js";
import { aiqiyiApi } from "@/apis/aiqiyiApi.js";

const router = useRouter();

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ];

// const router = useRouter();
// const route = useRoute();

const nowPlayingMovie = ref(defaultArray); // 正在热映
const movieTrending = ref(defaultArray); // 热门电影
const topRatedMovie = ref(defaultArray); // 评分最高 电影
const aiqiyiTVTrending = ref(defaultArray); // 爱奇艺 电视剧热播
const tvTrending = ref(defaultArray); // 热门剧集
const aiqiyiUpcoming = ref(defaultArray); // 爱奇艺 即将带来
const aiqiyiWangju = ref(defaultArray); // 爱奇艺 网剧

const getNowPlayingMovie = async () => {
  const videos = await tmdbApi.getNowPlayingMovies()
  nowPlayingMovie.value = videos
}

const getMovieTrending = async () => {
  const videos = await tmdbApi.getTrendingMovies()
  movieTrending.value = videos
}

const getTopRatedMovie = async () => {
  const videos = await tmdbApi.getTopRatedMovies()
  topRatedMovie.value = videos
}

const getTVTrending = async () => {
  const videos = await tmdbApi.getTrendingTVSeries()
  tvTrending.value = videos
}

const getAiqiyiVideos = async () => {
  const videos = await aiqiyiApi.getVideos()
  aiqiyiTVTrending.value = videos?.tvTrending?.slice(0, 20)
  aiqiyiUpcoming.value = videos?.upcoming?.slice(0, 20)
  aiqiyiWangju.value = videos?.wangju?.slice(0, 20)
}

const toDetail = (media, mediaType) => {
  const title = media.title || media.name
  const time = media.release_date || media.first_air_date
  router.push({
    path: '/mediaDetail/' + title,
    query: {
      id: media?.id,
      media_type: media?.media_type || mediaType,
      year: time.split('-')[0]
    },
  })
}

onMounted(async () => {
  getNowPlayingMovie()
  getMovieTrending()
  getTopRatedMovie()
  getTVTrending()
  getAiqiyiVideos()
});
</script>
<template>
  <div class="browseWrapper w-full h-full">
    <scrollView>
      <template v-slot:header>
        <scrollHeader>
          <template v-slot:center>
            <h1 class="txtDarkPrimary select-none text-xl font-bold">浏览</h1>
          </template>
        </scrollHeader>
      </template>
      <template v-slot:content>
        <h1 class="px-4 text-[1.6em] font-bold mb-2 txtDarkPrimary">浏览</h1>
        <!-- <videoListBasic :list="aiqiyiTVTrending" :title="'电视剧热播榜'">
          <template #card="{ media }">
            <videoCardBasic class="basicCardRect browsePr" :imageSrcPrefix="''" :media="media" :mediaType="'tv'" @click="toDetail(media, 'tv')"/>
          </template>
        </videoListBasic> -->
        <aiqiyiVideos :title="'电视剧热播榜'" :path="'/aiqiyiTVsTrending'" :videoPath="'tvTrending'" :aiqiyiList="aiqiyiTVTrending"/>
        <div class="divider"></div>
        <!-- <videoListBasic :card="videoCardBasicRect" :list="aiqiyiTVTrending" :title="'电视剧热播榜'"/>  -->
        <videoListBasic :list="nowPlayingMovie" :title="'正在热映'">
          <template #card="{ media }">
            <videoCardBasic class="browsePr" :media="media" :mediaType="'movie'" @click="toDetail(media, 'movie')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>
        <videoListBasic :list="movieTrending" :title="'热门电影'">
          <template #card="{ media }">
            <videoCardBasic class="browsePr" :media="media" :mediaType="'movie'" @click="toDetail(media, 'movie')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>

        <videoListBasic :list="tvTrending" :title="'热门剧集'">
          <template #card="{ media }">
            <videoCardBasic class="browsePr" :media="media" :mediaType="'tv'" @click="toDetail(media, 'tv')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>

        <aiqiyiVideos :title="'网剧热播榜'" :path="'/aiqiyiWangju'" :videoPath="'wangju'" :aiqiyiList="aiqiyiWangju"/>

        <div class="divider"></div>

        <videoListBasic :list="topRatedMovie" :title="'评分最高'">
          <template #card="{ media }">
            <videoCardBasic class="browsePr" :media="media" :mediaType="'movie'" @click="toDetail(media, 'movie')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>
        
        <videoListBasic :list="aiqiyiUpcoming" :title="'即将到来'">
          <template #card="{ media }">
            <videoCardBasic class="browsePr" :media="media" :imageSrcPrefix="''" :mediaType="'tv'" @click="toDetail(media, 'tv')"/>
          </template>
        </videoListBasic>
        <div class="h-20"></div>
      </template>
    </scrollView>
  </div>
</template>
<style lang="scss" scoped>
.browsePr {
  padding-right: var(--browse_Pr);
  
}
.divider {
  $space: 1rem;
  height: 1px;
  background-color: rgba(172, 172, 172, 0.5);
  margin-left: $space;
  margin-right: $space;
  margin-bottom: 1rem;
}
.scrollViewArea:nth-child(1) {
  background: red;
  .borderB {
    border-bottom: none;
  }
}
</style>