<script setup>
import scrollHeader from "@/components/common/scrollHeader.vue";
import scrollView from "@/viewComponents/scrollView.vue";
import typeTab from "@/components/common/typeTab.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import genresList from "./components/genresList.vue";
import { ref, watch, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { mediasApi } from "@/apis/medias.js";
import { layoutStore } from "@/stores/layout";
import { useMediaStore } from "@/stores/media";

const layout = layoutStore();
const mediaStore = useMediaStore();
const router = useRouter();
const mediaType = ref("movie");
const recentList = ref([""]);
const topList = ref([""]);
const popularList = ref([""]);

const genres = computed(() => mediaStore.genres);

const showAll = (title, sortBy) => {
  router.push({
    path: "/favorite/" + mediaType.value,
    query: {
      title,
      sortBy,
    },
  });
};

const getRecentList = () => {
  const queryParam = {
    sortBy: {
      _id: -1,
    },
  };
  mediasApi.getFavoriteList(mediaType.value, queryParam).then((res) => {
    recentList.value = res.data;
  });
};

const getTopList = () => {
  const queryParam = {
    sortBy: {
      vote_average: -1,
    },
  };
  mediasApi.getFavoriteList(mediaType.value, queryParam).then((res) => {
    topList.value = res.data;
  });
};

const getPopularList = () => {
  const queryParam = {
    sortBy: {
      popularity: -1,
    },
  };
  mediasApi.getFavoriteList(mediaType.value, queryParam).then((res) => {
    popularList.value = res.data;
  });
};

const render = () => {
  getRecentList();
  getTopList();
  getPopularList();
};

watch(mediaType, render);

onMounted(() => {
  layout.setTabIconVisible(true);
  render();
});
</script>
<template>
  <scrollView class="bg-light-900">
    <template #header>
      <scrollHeader class="h-[45px]" :show="true">
        <template #center>
          <h1 class="text-dark-900 select-none text-xl font-bold">我的收藏</h1>
        </template>
        <template #right>
          <div
            class="w-full h-full flex justify-end items-center px-4"
            v-if="layout.size != 'small'"
          >
            <typeTab class="h-[35px]" v-model:mediaType="mediaType" />
          </div>
        </template>
      </scrollHeader>
      <div class="w-full center items-center px-4 mb-2">
        <typeTab
          class="w-full h-[35px]"
          v-model:mediaType="mediaType"
          v-if="layout.size == 'small'"
        />
      </div>
    </template>
    <template #content>
      <videoListBasic :title="'最近添加'" :list="recentList">
        <template #showAll>
          <button class="showAllButton" @click="showAll('最近添加', '_id')">
            查看全部
          </button>
        </template>
        <template #card="{ media }">
          <videoCardBasic
            class="pr-[1%]"
            :media="media"
            :mediaType="mediaType"
            :toDetail="true"
          />
        </template>
      </videoListBasic>

      <div class="divider"></div>

      <videoListBasic
        :title="'最受欢迎'"
        :mediaType="mediaType"
        :list="popularList"
      >
        <template #showAll>
          <button
            class="showAllButton"
            @click="showAll('最受欢迎', 'popularity')"
          >
            查看全部
          </button>
        </template>
        <template #card="{ media }">
          <videoCardBasic class="pr-[1%]" :media="media" :toDetail="true" />
        </template>
      </videoListBasic>

      <div class="divider"></div>

      <genresList>
        <button
          class="browseClassButton browseButtonSize rounded-lg center"
          :style="{ backgroundImage: tag.background }"
          v-for="tag in genres"
          :key="tag"
        >
          <text>{{ tag?.name }}</text>
        </button>
      </genresList>

      <div class="divider"></div>

      <videoListBasic :title="'评分最高'" :list="topList">
        <template #showAll>
          <button
            class="showAllButton"
            @click="showAll('评分最高', 'vote_average')"
          >
            查看全部
          </button>
        </template>
        <template #card="{ media }">
          <videoCardBasic
            class="pr-[1%]"
            :media="media"
            :mediaType="mediaType"
            :toDetail="true"
          />
        </template>
      </videoListBasic>
    </template>
  </scrollView>
</template>