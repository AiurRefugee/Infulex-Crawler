<script setup>
import { onMounted, ref, computed, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get, post } from "@/APIS/axiosWrapper.js";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import creditCard from "@/components/cards/creditCard.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import backdropArea from "./components/backdropArea.vue";

import { tmdbAPIPrefix, tmdbHeaders, getParams } from "@/config/tmdbConfig";
const route = useRoute();
console.log(route.query);

const mediaDetail = ref({});
const credits = ref([]);
const similar = ref([])

provide('media', mediaDetail)

const getDetail = (id, media_type) => {
  const getDetailUrl = tmdbAPIPrefix + `/${media_type}/${id}`;
  get(getDetailUrl, getParams, tmdbHeaders).then((res) => {
    console.log(res);
    mediaDetail.value = res
  });
};

const getCredits = (id, media_type) => {
  const getCreditsUrl = tmdbAPIPrefix + `/${media_type}/${id}/credits`;
  get(getCreditsUrl, getParams, tmdbHeaders).then((res) => {
    console.log(res);
    const { id, cast, crew } = res;


    credits.value = cast.slice(0, 20)
  });
};

const getSimilar = (id, media_type) => {
  const getSimilarUrl = tmdbAPIPrefix + `/${media_type}/${id}/similar`;
  get(getSimilarUrl, getParams, tmdbHeaders).then((res) => {
   
    similar.value = res.results.sort((a, b) => b.popularity - a.popularity);
    console.log(similar.value);
  });
}

onMounted(() => {
  const { title, id, media_type } = route.query;
  getDetail(id, media_type);
  getCredits(id, media_type);
  getSimilar(id, media_type);
});
</script>
<template>
  <scrollView>
    <template v-slot:header>
      <scrollHeader>
        <template v-slot:left>
          <backword :title="'浏览'"></backword>
        </template>
        <template v-slot:center>
          <h1 class="font-bold text-[1.2em] txtDarkPrimary">{{ mediaDetail.title || mediaDetail.name }}</h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      
      <backdropArea :media="mediaDetail" />

      <div class="h-2"></div>

      <h1 class="creditTitle px-4 text-[1.2em] font-bold py-2">介绍</h1>
      <div class="overviewWrap overflow-hidden">
        <p class="overview px-4">{{ mediaDetail?.overview }}</p>
      </div>

      <div class="h-2"></div>
      <h1 class="creditTitle px-4 text-[1.2em] font-bold py-2">演员和工作人员</h1>
      <div class="flex pl-6 overflow-x-auto overflow-y-hidden">
        <creditCard
          v-for="person in credits"
          :key="person.id"
          :person="person"
        />
      </div>
      <div class="h-2"></div>
      <h1 class="creditTitle px-4 text-[1.2em] font-bold py-2">更多相似</h1>
      <div class="flex pl-6 overflow-x-auto">
        <videoCardBasic
          v-for="media in similar"
          :key="media.id"
          :media="media"
        />
      </div>
    </template>
  </scrollView>
</template>
<style scoped lang="scss">
::-webkit-scrollbar {
    display: none;
}
.overview { 
    max-width: 100%;
    height: 4.5em;
    -webkit-line-clamp: 3; /* 限制为3行 */
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>