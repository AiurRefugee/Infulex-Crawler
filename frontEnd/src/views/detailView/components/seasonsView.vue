<script setup>
import subTitle from "./subTitle.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";

import { useRouter, useRoute } from "vue-router";
import { tmdbApi } from "@/APIs/tmdbApi.js";
import { ref, onMounted, inject } from "vue";
const props = defineProps({
  seasons: {
    type: Array,
    Required: true,
  },
});
const router = useRouter();
const route = useRoute();

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", ""];

const seasonNum = inject("seasonNum");
const episodeNum = inject("episodeNum");

const seasonsAll = ref(0);
const episodes = ref(defaultArray);

const getSeasonDetail = async (id, season_number) => {
  const seasonDetail = await tmdbApi.getSeasonDetail(id, season_number);
  episodes.value = seasonDetail.episodes;
};

const renderSeasons = async (id, season_number, episode_number) => {
  getSeasonDetail(id, season_number, episode_number);
};

defineExpose({
  renderSeasons,
});
</script>
<template>
  <subTitle v-if="seasons.length == 1">全 1 季</subTitle>
  <!-- <select>
        <option v-for="(season, index) in seasons" :key="season.id">第{{ index + 1 }}季</option>
    </select> -->
  <div class="pl-4 flex overflow-x-auto overflow-y-hidden">
    <videoCardBasic
      v-for="(episode, index) in episodes"
      :key="episode.id"
      class="basicCardRect episode"
      :class="!index ? 'selected' : ''"
      :media="episode"
      :mediaType="'tv'"
    />
  </div>
</template>
