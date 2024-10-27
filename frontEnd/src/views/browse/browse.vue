<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js"; 
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import classButtonList from '@/components/classButtonList.vue'
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import videoCardBasicRect from "@/components/cards/videoCardBasicRect.vue";

import { layoutStore } from "@/stores/layout"; 
import videoListBasic from "./components/videoListBasic.vue";
// 可以在组件中的任意位置访问 `store` 变量 ✨

import { tmdbHeaders, tmdbAPIPrefix, getParams, tmdbImgPrefix } from '@/config/tmdbConfig'
import { aiqiyiUrlPrefix, aiqiyiVideoListUrl, aiqiyiMapMedia } from '@/config/aiqiyiConfig'  

const store = layoutStore();
const genres = computed(() => store.genres);
const defaultArray = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ]

const router = useRouter();
const route = useRoute(); 

const nowPlaying = ref(defaultArray) // 正在热映
const popular = ref(defaultArray)
const topRated = ref(defaultArray)
const upcoming = ref(defaultArray)
const aiqiyi = ref(defaultArray)

const nowPlayingUrl = '/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}'
const popularUrl = '/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc'
const topRatedUrl = '/discover/movie?include_adult=false&include_video=false&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200'
const upcomingUrl = '/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}'

 
onMounted(async () => {
  get(tmdbAPIPrefix + nowPlayingUrl, getParams, tmdbHeaders).then( res => nowPlaying.value = res.results)
  get(tmdbAPIPrefix + popularUrl, getParams, tmdbHeaders).then( res => popular.value = res.results)
  get(tmdbAPIPrefix + topRatedUrl, getParams, tmdbHeaders).then( res => topRated.value = res.results)
  get(tmdbAPIPrefix + upcomingUrl, getParams, tmdbHeaders).then( res => upcoming.value = res.results)

  get(aiqiyiUrlPrefix + aiqiyiVideoListUrl).then(res => {
    const aiqiyiRebo = res?.items[3]?.video?.[0]?.data
    aiqiyi.value = aiqiyiRebo.map(aiqiyiMapMedia)  
  })
})
</script>
<template>
  <div class="browseWrapper w-full h-full">
    <scrollView>
      <template v-slot:header>
          <scrollHeader>
            <template v-slot:center>
              <h1 class="txtDarkPrimary select-none text-xl font-bold">
                浏览
              </h1>
            </template>
          </scrollHeader>
        </template>
        <template v-slot:content>
          <div class="w-full h-full">
            <h1 class="px-4 text-[2em] font-bold mb-2 txtDarkPrimary">浏览</h1>
            <videoListBasic :card="videoCardBasicRect" :list="aiqiyi" :title="'电视剧热播榜'"/>
            <videoListBasic :card="videoCardBasic" :imageSrcPrefix="tmdbImgPrefix" :list="nowPlaying" :title="'正在热映'"/>
            <videoListBasic :card="videoCardBasic" :imageSrcPrefix="tmdbImgPrefix" :list="popular" :title="'最受欢迎'"/>
            <classButtonList />
            <videoListBasic :card="videoCardBasic" :imageSrcPrefix="tmdbImgPrefix" :list="topRated" :title="'评分最高'"/>
            <videoListBasic :card="videoCardBasic" :imageSrcPrefix="tmdbImgPrefix" :list="upcoming" :title="'即将到来'"/>
          </div>
        </template>
    </scrollView>
  </div>
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