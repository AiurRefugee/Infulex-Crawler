<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { aiqiyiApi } from "@/apis/aiqiyiApi.js";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import backword from "@/components/common/backword.vue";
import { layoutStore } from "@/stores/layout";

const layout = layoutStore();
const tabIconVisible = computed(() => layout.tabIconVisible);
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

const aiqiyiVideos = ref(defaultArray);
const videosTitle = ref(""); 
const router = useRouter();
const route = useRoute();

const { title } = route.params;
const { videoPath } = route.query;
const pageTitle = ref(title)

const getVideos = async (videoPath) => {
  const videos = await aiqiyiApi.getVideos();
  aiqiyiVideos.value = videos?.[videoPath];
};

const showAll = () => {
  const path = '/browseAiqiyi/' + props.videoPath
  router.push({
    path: path,
    query: {
      title: props.title,
      videoPath: props.videoPath,
    },
  });
};

const back = () => {
  router.go(-1);
};

onMounted(() => {
  
  getVideos(videoPath);
});
</script>
<template>
   
  <scrollView class="bg-light-900 rect">
    <template v-slot:header>
      <scrollHeader :show="true" class="h-[45px]">
        <template #left>
          <backword :title="'浏览'" @click="back" />
        </template>
        <template #center>
          <h1 class="text-dark-900 select-none text-xl font-bold">
            {{ pageTitle }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template #content>
      <div class="gridArea">
        <videoCardBasic 
          :imageSrcPrefix="''"
          :media="media"
          :mediaType="'tv'"
          :toDetail="true"
          v-for="media in aiqiyiVideos"
          :key="media.id"
        />
      </div>
      <div class="h-20"></div>
    </template>
  </scrollView>
</template>
<style lang="scss" scoped>
</style>