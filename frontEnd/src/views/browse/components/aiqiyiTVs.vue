<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import { aiqiyiApi } from "@/apis/aiqiyiApi.js";

import videoListBasic from "@/components/common/videoListBasic.vue";
const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
const props = defineProps({
  list: {
    default: defaultArray,
  },
});

const tvTrending = ref(defaultArray)
const listView = ref(false); // 是否为列表模式
const pageView = ref(false); // 是否为页面模式
const route = useRoute();

const getTVTrending = async () => {
    const videos = await aiqiyiApi.getVideos();
    tvTrending.value = videos?.tvTrending
}   

onMounted(() => {
  const { browseType } = route.query;
  if (browseType === "aiqiyiTVs") {
    pageView.value = true
    getTVTrending()
  } else {
    listView.value = true;
  }
});
</script>
<template>
  <videoListBasic :list="aiqiyi" :title="'电视剧热播榜'" v-if="listView">
    <template #card="{ media }">
      <videoCardBasic
        class="basicCardRect browsePr"
        :imageSrcPrefix="''"
        :media="media"
        :mediaType="'tv'"
        @click="toDetail(media, 'tv')"
      />
    </template>
  </videoListBasic>
  <scrollView>
    <template v-slot:header>
      <scrollHeader>
        <template v-slot:center>
          <h1 class="txtDarkPrimary select-none text-xl font-bold">
            电视剧热播榜
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <h1 class="px-4 text-[1.6em] font-bold mb-2 txtDarkPrimary">
        电视剧热播榜
      </h1>
      <div>
        <videoCardBasic
          class="basicCardRect browsePr"
          :imageSrcPrefix="''"
          :media="media"
          :mediaType="'tv'"
          @click="toDetail(media, 'tv')"
          v-for="media in tvTrending"
          :key="media.id"
        />
      </div>
    </template>
  </scrollView>
</template>
<style lang="scss" scoped>
</style>