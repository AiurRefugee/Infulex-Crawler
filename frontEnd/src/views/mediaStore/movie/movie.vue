<script setup>
import { onMounted, ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue"; 
import genresList from "../components/genresList.vue"
import { layoutStore } from "@/stores/layout"; 
import { useMediaStore } from "@/stores/media";
import { mediasApi } from "@/apis/medias.js";
const mediaStore = useMediaStore();
const layout = layoutStore();
const showTab = computed(() => layout.showTab); 
const router = useRouter();
const defaultArrays = ["", "", "", "", "", "", "", "", "", ""]
const topRatedMovies = ref([""]);

const favoriteMovies = computed(() => mediaStore.favoriteMovies);
const movieLibrary = computed(() => mediaStore.movieLibrary);

const toDetail = (router, media, mediaType) => {
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

const getTopRatedMovies = async () => {
  mediasApi.getTopRatedMovies().then((res) => {
    topRatedMovies.value = res ?.length > 0 ? res : [""];
  }).catch((err) => {
    console.log(err);
  })
}

onMounted(() => {
  layout.setTabIconVisible(true)
  getTopRatedMovies()
});
</script>
<template>
  <scrollView class="bg-light-900 trans">
    <template v-slot:header>
      <scrollHeader class="h-[45px]">
        <template v-slot:center>
          <h1 class="font-bold text-[1.2em] text-dark-900 whitespace-nowrap">电影</h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <h1 class="px-4 text-[1.6em] font-bold mb-2 text-dark-900">电影</h1>
      <videoListBasic :list="movieLibrary" :title="'最近添加'">
        <template #card="{ media }">
          <videoCardBasic
            class="pr-2"
            :media="media"
            :mediaType="'movie'"
            @click="toDetail(router, media, 'movie')"
          />
        </template>
      </videoListBasic>
      <div class="h-4"></div>
      <videoListBasic :list="favoriteMovies" :title="'我的收藏'">
        <template #card="{ media }">
          <videoCardBasic
            class="pr-2"
            :media="media"
            :mediaType="'movie'"
            @click="toDetail(router, media, 'movie')"
          />
        </template>
      </videoListBasic>

      <div class="h-4"></div>
      <genresList/>
      <div class="h-4"></div>
      
      <videoListBasic :list="topRatedMovies" :title="'最受好评的电影'">
        <template #card="{ media }">
          <videoCardBasic
            class="pr-2"
            :media="media"
            :mediaType="'movie'"
            @click="toDetail(router, media, 'movie')"
          />
        </template>
      </videoListBasic>
      <div class="h-24"></div>
    </template>
  </scrollView>
</template>