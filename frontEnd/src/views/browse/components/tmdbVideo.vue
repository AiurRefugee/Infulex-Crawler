<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { tmdbApi } from "@/apis/tmdbApi.js";
import basicPage from "./basicPage.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import backword from "@/components/common/backword.vue";
import { layoutStore } from "@/stores/layout";
const layout = layoutStore();
const size = computed(() => layout.size)
const showTab = computed(() => layout.showTab)
const tabIconVisible = computed(() => layout.tabIconVisible)
const props = defineProps({
  title: {
    default: "",
    required: true,
  },
  path: {
    default: "",
    required: true,
  },
  apiPath: {
    default: "",
    required: true,
  },
  tmdbList: {
    default: [],
  },
  mediaType: {
    required: true,
    default: 'movie'
  }
});

const getVideoParam = {
  language: "zh-CN",
  page: 1,
};

const tmdbVideos = ref([]);
const videosTitle = ref("");
const listView = ref(false); // 是否为列表模式
const pageView = ref(false); // 是否为页面模式
const router = useRouter();
const route = useRoute();

const getVideos = async (apiPath) => {
  console.log(apiPath);
  const api = tmdbApi[apiPath];
  const videos = await api(getVideoParam);
  tmdbVideos.value = tmdbVideos.value.concat(videos);
};

const showAll = () => { 
  // layout.setTabIconVisible(false)
  const path = props.path; 
  router.push({
    path: path,
    query: {
      title: props.title,
      apiPath: props.apiPath,
    },
  });
};

const back = () => {
  router.go(-1);
}


const toDetail = (media, mediaType) => {
  const title = media.title || media.name;
  const time = media.release_date || media.first_air_date;
  router.push({
    path: "/mediaDetail/" + title,
    query: {
      id: media?.id,
      media_type: media?.media_type || mediaType,
      year: time.split("-")[0],
    },
  });
};

onMounted(() => {
  const { apiPath, title } = route.query;
  videosTitle.value = title || props.title;
  console.log(apiPath);
  if (props.tmdbList.length > 0) {
    listView.value = true;
  } else {
    pageView.value = true;
    getVideos(apiPath);
  }
});
</script>
<template>
  <videoListBasic :list="tmdbList" :title="videosTitle" v-if="listView">
    <template v-slot:showAll>
      <button class="showAllButton" @click="showAll">查看全部</button>
    </template>
    <template #card="{ media }">
      <videoCardBasic
        class="pr-2"
        :media="media"
        :mediaType="mediaType"
        @click="toDetail(media, mediaType)"
      />
    </template>
  </videoListBasic>
  <basicPage class="showAllGrid" v-if="pageView" :title="videosTitle">
    <template #back>
      <backword 
        :title="'浏览'" 
        @click="back"
      />
    </template>
    <videoCardBasic
      class="w-full"
      :media="media"
      :mediaType="mediaType"
      @click="toDetail(media, mediaType)"
      v-for="media in tmdbVideos"
      :key="media.id"
    />
  </basicPage>
</template>
<style lang="scss" scoped>

</style>