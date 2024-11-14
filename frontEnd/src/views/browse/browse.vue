<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";

import { layoutStore } from "@/stores/layout";
import videoListBasic from "@/components/common/videoListBasic.vue";
// 可以在组件中的任意位置访问 `store` 变量 ✨

import {
  tmdbHeaders,
  tmdbAPIPrefix,
  getParams, 
} from "@/config/tmdbConfig";
import {
  aiqiyiUrlPrefix,
  aiqiyiVideoListUrl,
  aiqiyiMapMedia,
} from "@/config/aiqiyiConfig";

const router = useRouter();
const store = layoutStore(); 
const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ];

// const router = useRouter();
// const route = useRoute();

const nowPlaying = ref(defaultArray); // 正在热映
const popularMovies = ref(defaultArray);
const topRated = ref(defaultArray);
const upcoming = ref(defaultArray);
const aiqiyi = ref(defaultArray);
const popularTV = ref(defaultArray);
const aiqiyiUpcoming = ref(defaultArray);
const aiqiyiWangju = ref(defaultArray);

const nowPlayingUrl =
  "/discover/movie?include_video=false&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}";
const popularMoviesUrl = "/trending/movie/week";
const topRatedUrl =
  "/discover/movie?include_adult=false&include_video=false&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200";
const upcomingUrl =
  "/discover/movie?include_video=false&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}";
const popularTVUrl = "/trending/tv/week";

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
  get(tmdbAPIPrefix + nowPlayingUrl, getParams, tmdbHeaders).then(
    (res) => (nowPlaying.value = res.results)
  );
  get(tmdbAPIPrefix + popularMoviesUrl, getParams, tmdbHeaders).then(
    (res) => (popularMovies.value = res.results)
  );
  get(tmdbAPIPrefix + topRatedUrl, getParams, tmdbHeaders).then(
    (res) => (topRated.value = res.results)
  );

  get(tmdbAPIPrefix + popularTVUrl, getParams, tmdbHeaders).then(
    (res) => (popularTV.value = res.results)
  );
  get(aiqiyiUrlPrefix + aiqiyiVideoListUrl).then((res) => {
    aiqiyi.value = aiqiyiMapMedia(res?.items[3]?.video?.[0]?.data);
    aiqiyiUpcoming.value = aiqiyiMapMedia(
      res?.items[1]?.video?.[0]?.data,
      true
    );
    aiqiyiWangju.value = aiqiyiMapMedia(res?.items[0]?.video?.[0]?.data);
  });
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
        <videoListBasic :list="aiqiyi" :title="'电视剧热播榜'">
          <template #card="{ media }">
            <videoCardBasic class="basicCardRect" :imageSrcPrefix="''" :media="media" :mediaType="'tv'" @click="toDetail(media, 'tv')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>
        <!-- <videoListBasic :card="videoCardBasicRect" :list="aiqiyi" :title="'电视剧热播榜'"/>  -->
        <videoListBasic :list="nowPlaying" :title="'正在热映'">
          <template #card="{ media }">
            <videoCardBasic class="pr-4" :media="media" :mediaType="'movie'" @click="toDetail(media, 'movie')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>
        <videoListBasic :list="popularMovies" :title="'热门电影'">
          <template #card="{ media }">
            <videoCardBasic class="pr-4" :media="media" :mediaType="'movie'" @click="toDetail(media, 'movie')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>

        <videoListBasic :list="popularTV" :title="'热门剧集'">
          <template #card="{ media }">
            <videoCardBasic class="pr-4" :media="media" :mediaType="'tv'" @click="toDetail(media, 'tv')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>

        <videoListBasic :list="aiqiyiWangju" :title="'网剧热播榜'">
          <template #card="{ media }">
            <videoCardBasic class="basicCardRect" :imageSrcPrefix="''" :media="media" :mediaType="'tv'" @click="toDetail(media, 'tv')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>

        <videoListBasic :list="topRated" :title="'评分最高'">
          <template #card="{ media }">
            <videoCardBasic class="pr-4" :media="media" :mediaType="'movie'" @click="toDetail(media, 'movie')"/>
          </template>
        </videoListBasic>
        <div class="divider"></div>
        
        <videoListBasic :list="aiqiyiUpcoming" :title="'即将到来'">
          <template #card="{ media }">
            <videoCardBasic class="pr-4" :media="media" :imageSrcPrefix="''" :mediaType="'tv'" @click="toDetail(media, 'tv')"/>
          </template>
        </videoListBasic>
        <div class="h-20"></div>
      </template>
    </scrollView>
  </div>
</template>
<style lang="scss">
.divider {
  $space: 1rem;
  height: 1px;
  background-color: rgb(83 83 83 / 50%);
  margin-left: $space;
  margin-right: $space;
  margin-bottom: 0.6rem;
}
.scrollViewArea:nth-child(1) {
  background: red;
  .borderB {
    border-bottom: none;
  }
}
</style>