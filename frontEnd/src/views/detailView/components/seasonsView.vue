<script setup>
import subTitle from "./subTitle.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";

import { useRouter, useRoute } from "vue-router";
import { tmdbApi } from "@/APIs/tmdbApi.js";
import { ref, onMounted, inject } from "vue";


const router = useRouter();
const route = useRoute();

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", ""];
const seasons = ref(defaultArray)

const selectSeason = inject('selectSeason')
const selectEpisode = inject('selectEpisode')
const seasonNum = inject("seasonNum");
const episodeNum = inject("episodeNum"); 
const episodes = ref(defaultArray);

const getSeasonDetail = async (id, season_number) => {
  const seasonDetail = await tmdbApi.getSeasonDetail(id, season_number);
  episodes.value = seasonDetail.episodes;
};

const renderSeasons = async (id, seasonsData, season_number, episode_number) => {
  seasons.value = seasonsData
  getSeasonDetail(id, season_number, episode_number);
};
 

defineExpose({
  renderSeasons,
});
</script>
<template>
  <subTitle class="">全 {{ seasons.length }} 季</subTitle>
  <!-- <select>
        <option v-for="(season, index) in seasons" :key="season.id">第{{ index + 1 }}季</option>
    </select> -->
  <div class="pl-4 flex overflow-x-auto overflow-y-hidden">
    <videoCardBasic
      v-for="(episode, index) in episodes"
      class="basicCardRect episode"
      :key="episode.id"
      :index="index"
      :class="episodeNum == index + 1 ? 'selected' : ''"
      :media="episode"
      :mediaType="'tv'"
      @click="selectEpisode(index + 1)"
    />
  </div>
</template>
