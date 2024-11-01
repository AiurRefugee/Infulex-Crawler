<script setup>
import { onMounted, ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router"; 
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import creditCard from "@/components/cards/creditCard.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import backdropArea from "./components/backdropArea.vue";
import optButton from "./components/optButton.vue";
import subTitle from "./components/subTitle.vue";
import seasonsView from "./components/seasonsView.vue";
import { tmdbConifg, tmdbHeaders, tmdbAPIPrefix, tmdbImgPrefix, getParams } from '@/config/tmdbConfig.js'

import { tmdbApi } from '@/APIs/tmdbApi.js'

const route = useRoute();
const router = useRouter();

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", ""];

const mediaTitle = ref("");
const movieDetail = ref({});
const episodeDetail = ref({})
const credits = ref(defaultArray);
const similar = ref(defaultArray);
const selectedId = ref(null)
const mediaType = ref(null)
const seasonsViewRef = ref()
const seasons = ref(defaultArray)
const seasonNum = ref(1)
const episodeNum = ref(1) 
provide('seasonNum', seasonNum)
provide('episodeNum', episodeNum)


const mediaDetail = computed(() => {
  if (mediaType.value == 'movie') {
    return movieDetail.value;
  } else {
    return episodeDetail.value;
  }
}) 
provide('media', mediaDetail)

const calSeasonAndEpisodeNumber = (id, media_type) => {
  if (media_type == 'tv') {
    const cacheString = localStorage.getItem(`TV_${id}`);
    if (cacheString) {
      try {
        const cache = JSON.parse(cacheString);
        const { seasonNum, episodeNum } = cache;
        seasonNum.value = seasonNum;
        episodeNum.value = episodeNum;
      } catch (e) {
        console.log(e);
      }  
    }
  }
}

const saveSeasonAndEpisodeNumber = (id, season_number, episode_number) => {
  localStorage.setItem(`TV_${id}`, JSON.stringify({ seasonNum: season_number, episodeNum: episode_number }));
}

const searchMedia = async (title, mediaType, year, num = 1) => {
  if (num > 2) return;
  let media
  if (mediaType == 'movie') {
    const response = await tmdbApi.searchMovie(title, year);
    media = response.results[0];
  } 
  if (mediaType == 'tv') {
    const response = await tmdbApi.searchTVSeries(title, year)
    media = response.results[0];
  } 
  if (!media) {
    return searchMedia(title,mediaType, "", num + 1);
  } else {
    return media?.id;
  }
};

const choose = (media) => {
  const { media_type, year } = route.query;
  selectedId.value = media.id;
  renderMovie(media.id, media_type); 
}

const getDetail = async (id, media_type) => {
  if (!id || !media_type) return;
  if (media_type == 'tv') {
    const detail = await tmdbApi.getTVDetail(id);
    episodeDetail.value = detail;
    seasons.value = detail.seasons;
    seasonsViewRef.value.renderSeasons(id, seasonNum.value, episodeNum.value);
  } 
  if (media_type == 'movie') {
    const detail = await tmdbApi.getMoviewDetail(id);
    movieDetail.value = detail;
  } 
};

const getCredits = async (id, media_type) => {
  if (!id || !media_type) return;
  let response
  if (media_type == 'tv') {
    response = await tmdbApi.getTVSeriesCredits(id, seasonNum.value, episodeNum.value);
    
  } 
  if (media_type == 'movie') {
    const response = await tmdbApi.getMovieCredits(id); 
  }
  credits.value = response.cast;
};

const getSimilar = async (id, media_type) => {
  if (!id || !media_type) return;
  if (media_type == 'tv') {
    const response = await tmdbApi.getSimilarTVSeries(id);
    similar.value = response.results;
  } 
  if (media_type == 'movie') {
    const response = await tmdbApi.getSimilarMovies(id);
    similar.value = response.results;
  }
};

const renderMovie = async (id, media_type) => {
  getDetail(id, media_type);
  getCredits(id, media_type);
};

const changeEpisode = (season_number, episode_number) => {
  episodeNum.value = episode_number;
  seasonNum.value = season_number;
  seasonsViewRef.value.renderSeasons(route.query.id, seasonNum.value, episodeNum.value);
}

provide('changeEpisode', changeEpisode)



onMounted(async () => {
  const { title } = route.params;
  mediaTitle.value = title
  const { media_type, year } = route.query;
  mediaType.value = media_type
  
  let id = route.query?.id;
  if (!id) {
    id = await searchMedia(title, media_type, year);
  } 
  calSeasonAndEpisodeNumber(id, media_type);
  console.log(id, media_type);
  renderMovie(id, media_type);
  getSimilar(id, media_type);
});
</script>
<template>
  <scrollView>
    <template v-slot:header>
      <scrollHeader class="fixed top-0 z-10">
        <template v-slot:left>
          <!-- <backword @click="router.go(-1)"></backword> -->
        </template>
        <template v-slot:center>
          <h1 class="font-bold text-[1.2em] txtDarkPrimary whitespace-nowrap">
            {{ mediaTitle }}
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <div class="bgLightPrimary scroll">
        <backdropArea :media="mediaDetail" /> 

        <div class="h-4"></div>

        <optButton class="showOnMobilePortrait h-12"/> 

        <seasonsView v-if="mediaType == 'tv'" ref="seasonsViewRef" :seasons="seasons"/>
        
        <subTitle class="hideOverview showOnMobilePortrait">介绍</subTitle> 
        <div class="overviewWrap pb-4 overflow-hidden showOnMobilePortrait">
          <p class="overview px-4 h-[3.6em] leading-[1.2em] text-[0.9em] txtDarkSecondary">
            {{ mediaDetail?.overview }}
          </p>
        </div> 
        <subTitle>演员和工作人员</subTitle> 
        <div class="flex pl-4 overflow-x-auto overflow-y-hidden">
          <creditCard
            v-for="person in credits"
            :key="person.id"
            :person="person"
          />
        </div>
        <div class="h-4"></div>
        <subTitle>更多相似</subTitle>  
        <div class="flex pl-4 overflow-x-auto">
          <videoCardBasic
            v-for="media in similar"
            :key="media.id"
            :media="media"
            :class="media.id == selectedId && selectedId ? 'selected' : ''"
            @click="choose(media)"
          />
        </div>
        <div class="h-32"></div>
      </div>
    </template>
  </scrollView>
</template>
<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
.showOnMobilePortrait {
  display: none;
}
@media (width < 500px) and (orientation: portrait) { 
  .showOnMobilePortrait {
    display: block;
  }
}
.overview {  
  max-width: 100%;  
  -webkit-line-clamp: 3; /* 限制为3行 */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>