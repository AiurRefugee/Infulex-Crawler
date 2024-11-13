<script setup>
import { onMounted, ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import creditCard from "@/components/cards/creditCard.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue"; 
import classButtonList from "@/components/classButtonList.vue";
import { useMediaStore } from "@/stores/media";
import { mediasApi } from "@/APIs/medias.js";
const mediaStore = useMediaStore();
const router = useRouter();

const topRatedMovies = ref([]);

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
    topRatedMovies.value = res;
  }).catch((err) => {
    console.log(err);
  })
}

onMounted(() => {
  getTopRatedMovies()
});
</script>
<template>
  <scrollView>
    <template v-slot:header>
      <scrollHeader class="fixed top-0 z-10">
        <template v-slot:center>
          <h1 class="font-bold text-[1.2em] txtDarkPrimary whitespace-nowrap">电影</h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <div class="h-[40px]"></div>
      <h1 class="px-4 text-[1.6em] font-bold mb-2 txtDarkPrimary">电影</h1>
      <videoListBasic :list="movieLibrary" :title="'最近添加'">
        <template #card="{ media }">
          <videoCardBasic
            :media="media"
            :mediaType="'movie'"
            @click="toDetail(router, media, 'movie')"
          />
        </template>
      </videoListBasic>
      <videoListBasic :list="favoriteMovies" :title="'我的收藏'">
        <template #card="{ media }">
          <videoCardBasic
            :media="media"
            :mediaType="'movie'"
            @click="toDetail(router, media, 'movie')"
          />
        </template>
      </videoListBasic>

      <classButtonList/>

      <videoListBasic :list="topRatedMovies" :title="'最受好评的电影'">
        <template #card="{ media }">
          <videoCardBasic
            :media="media"
            :mediaType="'movie'"
            @click="toDetail(router, media, 'movie')"
          />
        </template>
      </videoListBasic>
    </template>
  </scrollView>
</template>