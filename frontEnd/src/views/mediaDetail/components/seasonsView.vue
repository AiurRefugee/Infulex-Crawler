<script setup>
import subTitle from "./subTitle.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";

import { useRouter, useRoute } from "vue-router";
import { tmdbApi } from "@/apis/tmdbApi.js";
import { ref, onMounted, inject, nextTick } from "vue";


const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", ""];
const seasons = ref(defaultArray)
const episodes = ref(defaultArray);
const mediaId = ref("")

const media = defineModel('media')
const episodeNum = defineModel('episodeNum')
const seasonNum = defineModel('seasonNum') 
const crew = defineModel('crew')
const guestStars = defineModel('guestStars')

const selectEpisode = async (num) => {
  episodeNum.value = num;
  seasonNum.value = 1;
  media.value = episodes.value[num - 1];
  await nextTick();
  crew.value = media.value?.crew || defaultArray;
  guestStars.value = media.value?.guest_stars || defaultArray; 
}

const selectSeason = (num) => {
  seasonNum.value = num;
  getSeasonDetail(media.value.id, num);
}

const getSeasonDetail = async (id, season_number) => {
  const seasonDetail = await tmdbApi.getSeasonDetail(id, season_number);
  episodes.value = seasonDetail.episodes;
};

const render = async (id, seasonsArray) => { 
  mediaId.value = id;
  seasons.value = seasonsArray
  await getSeasonDetail(id, seasonNum.value);
  selectEpisode(episodeNum.value);
};
 

defineExpose({
  render,
});
</script>
<template>
  <subTitle class="pt-2">全 {{ seasons.length }} 季</subTitle>
  <!-- <select>
        <option v-for="(season, index) in seasons" :key="season.id">第{{ index + 1 }}季</option>
    </select> -->
  <div class="rect pl-4 mb-4 flex overflow-x-auto overflow-y-hidden">
    <videoCardBasic
      v-for="(episode, index) in episodes"
      class="seasonW pr-2 episode"
      :key="episode.id"
      :index="index"
      :class="episodeNum == index + 1 ? 'selected' : ''"
      :media="episode"
      :mediaType="'tv'"
      @click="selectEpisode(index + 1)"
    />
  </div>
</template>
<style lang="scss" scoped>
.seasonW {
  width: calc(100vw / var(--season_card_num));
}
</style>
