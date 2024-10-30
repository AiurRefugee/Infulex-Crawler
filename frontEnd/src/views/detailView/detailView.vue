<script setup>
import { onMounted, ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import creditCard from "@/components/cards/creditCard.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import backdropArea from "./components/backdropArea.vue";
import optButton from "./components/optButton.vue";
import subTitle from "./components/subTitle.vue";

import { tmdbAPIPrefix, tmdbHeaders, getParams } from "@/config/tmdbConfig";

const route = useRoute();
const router = useRouter();

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", ""];

const mediaDetail = ref({});
const credits = ref(defaultArray);
const similar = ref(defaultArray);
const selectedId = ref(null)

provide("media", mediaDetail);

const searchMedia = async (title, mediaType, year, num = 1) => {
  if (num > 2) return;
  const searchUrl =
    mediaType == "movie"
      ? tmdbAPIPrefix + "/search/movie"
      : tmdbAPIPrefix + "/search/tv";
  const params = {
    query: title,
    year,
    ...getParams,
  };
  const response = await get(searchUrl, params, tmdbHeaders);
  const media = response?.results[0];
  if (!media) {
    return searchMedia(title, mediaType, "", num + 1);
  } else {
    return media?.id;
  }
};
const choose = (media) => {
  const { media_type, year } = route.query;
  selectedId.value = media.id;
  renderDetail(media.id, media_type); 
}

const getDetail = (id, media_type) => {
  if (!id || !media_type) return;
  const getDetailUrl = tmdbAPIPrefix + `/${media_type}/${id}`;
  get(getDetailUrl, getParams, tmdbHeaders).then((res) => {
    console.log(res);
    mediaDetail.value = res;
  });
};

const getCredits = (id, media_type) => {
  if (!id || !media_type) return;
  const getCreditsUrl = tmdbAPIPrefix + `/${media_type}/${id}/credits`;
  get(getCreditsUrl, getParams, tmdbHeaders).then((res) => {
    console.log(res);
    const { id, cast, crew } = res;
    credits.value = cast.slice(0, 20);
  });
};

const getSimilar = (id, media_type) => {
  if (!id || !media_type) return;
  const getSimilarUrl = tmdbAPIPrefix + `/${media_type}/${id}/similar`;
  get(getSimilarUrl, getParams, tmdbHeaders).then((res) => {
    similar.value = res.results.sort((a, b) => b.popularity - a.popularity);
    console.log(similar.value);
  });
};

const renderDetail = async (id, media_type) => {
  getDetail(id, media_type);
  getCredits(id, media_type);
};

onMounted(async () => {
  const { title } = route.params;
  const { media_type, year } = route.query;
  let id = route.query?.id;
  if (!id) {
    id = await searchMedia(title, media_type, year);
  } 
  console.log(id, media_type);
  renderDetail(id, media_type);
  getSimilar(id, media_type);
});
</script>
<template>
  <scrollView>
    <template v-slot:header>
      <scrollHeader class="fixed top-0 z-10">
        <template v-slot:left>
          <!-- <backword @click="router.go(-1)"></backword> -->
        </template>
        <template v-slot:center>
          <h1 class="font-bold text-[1.2em] txtDarkPrimary whitespace-nowrap">
            {{ mediaDetail.title || mediaDetail.name }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <div class="bgLightPrimary scroll">
        <backdropArea :media="mediaDetail" />

        <div class="h-5"></div>
        <optButton class="showOnMobilePortrait h-12"/> 
        <subTitle class="hideOverview ">介绍</subTitle> 
        <div class="overviewWrap pb-4 overflow-hidden hideOverview">
          <p class="overview px-4 txtDarkSecondary">
            {{ mediaDetail?.overview }}
          </p>
        </div> 
        <subTitle>演员和工作人员</subTitle> 
        <div class="flex pl-4 overflow-x-auto overflow-y-hidden">
          <creditCard
            v-for="person in credits"
            :key="person.id"
            :person="person"
          />
        </div>
        <div class="h-4"></div>
        <subTitle>更多相似</subTitle>  
        <div class="flex pl-4 overflow-x-auto">
          <videoCardBasic
            v-for="media in similar"
            :key="media.id"
            :media="media"
            :class="media.id == selectedId && selectedId ? 'selected' : ''"
            @click="choose(media)"
          />
        </div>
        <div class="h-32"></div>
      </div>
    </template>
  </scrollView>
</template>
<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
.showOnMobilePortrait {
  display: none;
}
@media (width < 500px) and (orientation: portrait) { 
  .showOnMobilePortrait {
    display: block;
  }
}
.overview {
  $line_height: 1em;
  font-size: $line_height * 0.9;
  max-width: 100%;
  height: $line_height * 3;
  line-height: $line_height * 1.1;
  -webkit-line-clamp: 3; /* 限制为3行 */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>