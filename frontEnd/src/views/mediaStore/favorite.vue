<script setup>
import scrollHeader from "@/components/common/scrollHeader.vue";
import scrollView from "@/viewComponents/scrollView.vue";
import typeTab from "@/components/common/typeTab.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import genresList from "./components/genresList.vue";
import { ref, watch, onMounted } from "vue";
import { mediasApi } from "@/apis/medias.js";
const mediaType = ref("movie");
const recentList = ref([""]);
const topList = ref([""]);
const popularList = ref([""]);

const getRecentList = () => {
    const queryParam = {
        sortBy: {
            _id: -1
        }
    }
  mediasApi.getFavoriteList(mediaType.value, queryParam).then((res) => {
    recentList.value = res;
  });
}

const getTopList = () => {
    const queryParam = {
        sortBy: {
            vote_average: -1
        }
    }
  mediasApi.getFavoriteList(mediaType.value, queryParam).then((res) => {
    topList.value = res;
  });
}

const getPopularList = () => {
    const queryParam = {
        sortBy: {
            popularity: -1
        }
    }
  mediasApi.getFavoriteList(mediaType.value, queryParam).then((res) => {
    popularList.value = res;
  });
}

const render = () => {
    getRecentList()
    getTopList()
    getPopularList()
}

watch(mediaType, render)

onMounted(() => {
    render()
})
</script>
<template>
  <scrollView class="bg-light-900">
    <template #header>
      <scrollHeader class="h-[45px]" :show="true">
        <template #center>
          <h1 class="text-dark-900 select-none text-xl font-bold">我的收藏</h1>
        </template>
        <template #right>
          <div class="w-full h-full flex justify-end items-center px-4">
            <typeTab class="h-[35px]" v-model:mediaType="mediaType" />
          </div>
        </template>
      </scrollHeader>
    </template>
    <template #content>
      <videoListBasic :title="'最近添加'" :list="recentList">
        <template #showAll>
            <button class="showAllButton">查看全部</button>
        </template>
        <template #card="{ media }">
          <videoCardBasic class="pr-2" :media="media" :mediaType="mediaType" :toDetail="true"/>
        </template>
      </videoListBasic>

      <div class="divider"></div>

      <videoListBasic :title="'最受欢迎'" :mediaType="mediaType" :list="popularList">
        <template #showAll>
            <button class="showAllButton">查看全部</button>
        </template>
        <template #card="{ media }">
          <videoCardBasic class="pr-2" :media="media" :toDetail="true"/>
        </template>
      </videoListBasic>

      <div class="divider"></div>

      <genresList/>

      <div class="divider"></div>

      <videoListBasic :title="'评分最高'" :list="topList">
        <template #showAll>
            <button class="showAllButton">查看全部</button>
        </template>
        <template #card="{ media }">
          <videoCardBasic class="pr-2" :media="media" :mediaType="mediaType" :toDetail="true"/>
        </template>
      </videoListBasic>
    </template>
  </scrollView>
</template>