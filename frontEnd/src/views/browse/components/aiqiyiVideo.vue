<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { aiqiyiApi } from "@/apis/aiqiyiApi.js";
import basicPage from "./basicPage.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";

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
  "",
  "",
  "",
  "",
];
const props = defineProps({
  showButton: {
    default: true
  },
  title: {
    default: "",
    required: true
  },
  path: {
    default: "",
    required: true
  },
  videoPath: {
    default: "",
    required: true
  },
  aiqiyiList: {
    default: [],
  },
});

const aiqiyiVideos = ref(defaultArray);
const videosTitle = ref("")
const listView = ref(false); // 是否为列表模式
const pageView = ref(false); // 是否为页面模式
const router = useRouter();
const route = useRoute();


const getVideos = async (videoPath) => {
  const videos = await aiqiyiApi.getVideos();
  aiqiyiVideos.value = videos?.[videoPath];
};

const showAll = () => {
  const path = props.path 
  router.push({ 
    path: path,
    query: {
      title: props.title,
      videoPath: props.videoPath
    }
  });
};

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
  const { videoPath, title } = route.query;
  videosTitle.value = title || props.title;
  if (props.aiqiyiList.length > 0) {
    listView.value = true;
  } else {
    pageView.value = true;
    getVideos(videoPath);
  }
});
</script>
<template>
  <videoListBasic :list="aiqiyiList" :title="videosTitle" v-if="listView">
    <template v-slot:showAll v-if="showButton">
      <button class="showAllButton" @click="showAll">查看全部</button>
    </template>
    <template #card="{ media }">
      <videoCardBasic
        :class="cardClassName"
        class="basicCardRect browsePr"
        :imageSrcPrefix="''"
        :media="media"
        :mediaType="'tv'"
        @click="toDetail(media, 'tv')"
      />
    </template>
  </videoListBasic>
  <basicPage class="showAllGridRect" v-if="pageView" :title="videosTitle">
    <videoCardBasic  
      class="basicCardRectInGrid browsePr"
      :imageSrcPrefix="''"
      :media="media"
      :mediaType="'tv'"
      @click="toDetail(media, 'tv')"
      v-for="media in aiqiyiVideos"
      :key="media.id"
    />
  </basicPage>
</template>
<style lang="scss" scoped>
</style>