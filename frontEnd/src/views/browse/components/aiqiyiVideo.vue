<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { aiqiyiApi } from "@/apis/aiqiyiApi.js";
import basicPage from "./basicPage.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import backword from "@/components/common/backword.vue";
import { layoutStore } from "@/stores/layout";

const layout = layoutStore();
const tabIconVisible = computed(() => layout.tabIconVisible) 
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
      back: {
        path: route.path,
        name: '浏览'
      }
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
  <videoListBasic class="rect" :list="aiqiyiList" :title="videosTitle" v-if="listView">
    <template v-slot:showAll v-if="showButton">
      <button class="showAllButton" @click="showAll">查看全部</button>
    </template>
    <template #card="{ media }">
      <videoCardBasic
        :class="cardClassName"
        class="pr-1"
        :imageSrcPrefix="''"
        :media="media"
        :mediaType="'tv'"
        @click="toDetail(media, 'tv')"
      />
    </template>
  </videoListBasic>
  <basicPage class="rect" v-if="pageView" :title="videosTitle">
    <template #back>
      <backword  
        :title="'浏览'" 
        @click="back"
      />
    </template>
    <videoCardBasic  
      class="basicCardRectInGrid"
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