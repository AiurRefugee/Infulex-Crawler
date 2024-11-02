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


import { tmdbApi } from '@/APIs/tmdbApi.js'

const route = useRoute();
const router = useRouter();

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", ""];

const mediaId = ref(null) 
const similar = ref(defaultArray);
const selectedId = ref(null)
const mediaType = ref(null)
const seasonsViewRef = ref()
const seasons = ref(defaultArray)
const episodes = ref(defaultArray)
const seasonNum = ref(1)
const episodeNum = ref(1)
const backdropUrl = ref("")
const mediaDetail = ref({})
const generes = ref([])
const mediaTitle = ref("")
const guestStars = ref(defaultArray)
const cast = ref([])
const crew = ref(defaultArray)

const direcotors = computed(() => {
  return crew.value.filter(crewMember => crewMember.job === "Director")
})

const writers = computed(() => {
  return crew.value.filter(crewMember => crewMember.job === "Writer")
}) 

 
const credits = computed( () => {
  const creditArray = [...cast.value, ...guestStars.value, ...direcotors.value, ...writers.value]
  if (creditArray.length) {
    console.log(creditArray.map(credit => credit.name))
    return creditArray
  } else {
    return defaultArray
  } 
})

provide('seasonNum', seasonNum)
provide('episodeNum', episodeNum)
provide('mediaType', mediaType)
provide('backdropUrl', backdropUrl)
provide('media', mediaDetail)
provide('generes', generes)

const clearCredits = () => {
  cast.value = []
  crew.value = defaultArray
  guestStars.value = defaultArray
} 

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
    return searchMedia(title, mediaType, "", num + 1);
  } else {
    return media?.id;
  }
};

const choose = (media) => {
  const { media_type, year } = route.query;
  selectedId.value = media.id;
  render(media.id, media_type);
}

const getMovieDetail = async (id) => {
  clearCredits()
  const detail = await tmdbApi.getMoviewDetail(id);
  if (detail) {
    mediaDetail.value = detail;
    backdropUrl.value = tmdbApi.tmdbImgPrefix + (detail?.backdrop_path || detail?.poster_url)
    generes.value = detail?.genres
    mediaTitle.value = detail?.name || detail?.title
  }
}

const getTVDetail = async (id) => {
  const detail = await tmdbApi.getTVDetail(id);
  if (detail) {
    // mediaDetail.value = detail;
    seasons.value = detail?.seasons;
    backdropUrl.value = tmdbApi.tmdbImgPrefix + detail?.backdrop_path
    generes.value = detail?.genres
    mediaTitle.value = detail?.name
  }
  seasonsViewRef.value.renderSeasons(id, seasons.value, seasonNum.value, episodeNum.value);
}

const getSeasonDetail = async (id, season_number) => {
  const seasonDetail = await tmdbApi.getSeasonDetail(id, season_number);
  seasons.value = seasonDetail?.seasons;
  episodes.value = seasonDetail?.episodes;
  
};

const selectSeason = (id, season_number) => { 
  seasonNum.value = season_number
  episodeNum.value = 1
  getSeasonDetail(id, season_number)
}
provide('selectSeason', selectSeason)


const selectEpisode = async (newEpisodeNum) => { 
  clearCredits()
  console.log('selectEpisode', newEpisodeNum)
  episodeNum.value = newEpisodeNum
  const episodeInfo = episodes.value[newEpisodeNum - 1] 
  mediaDetail.value = episodeInfo
  guestStars.value = episodeInfo?.guest_stars
  crew.value = episodeInfo?.crew;

}
provide('selectEpisode', selectEpisode)

const getMovieCredits = async (id) => {
  const response = await tmdbApi.getMovieCredits(id);
  cast.value = response?.cast; 
  crew.value = response?.crew;
};
 

const getSimilar = async (id, media_type) => {
  if (!id || !media_type) return;
  if (media_type == 'tv') {
    const response = await tmdbApi.getSimilarTVSeries(id);
    similar.value = response?.results;
  }
  if (media_type == 'movie') {
    const response = await tmdbApi.getSimilarMovies(id);
    similar.value = response?.results;
  }
};

const render = async (id, media_type) => { 
  if (media_type == 'tv') {
    getTVDetail(id)
    await getSeasonDetail(id, seasonNum.value)
    selectEpisode(episodeNum.value)
    
  }
  if (media_type == 'movie') {
    getMovieDetail(id)
    getMovieCredits(id);
  }
};

const changeEpisode = (season_number, episode_number) => {
  episodeNum.value = episode_number;
  seasonNum.value = season_number;
  seasonsViewRef.value.renderSeasons(route.query.id, seasonNum.value, episodeNum.value);
}

provide('changeEpisode', changeEpisode)



onMounted(async () => {
  const { title } = route.params;

  const { media_type, year } = route.query;
  mediaType.value = media_type

  let id = route.query?.id;
  if (!id) {
    id = await searchMedia(title, media_type, year);
  }
  mediaId.value = id
  calSeasonAndEpisodeNumber(id, media_type);
  console.log(id, media_type);
  render(id, media_type);
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

        <optButton class="showOnMobilePortrait h-14 pt-4" />

        <seasonsView v-if="mediaType == 'tv'" ref="seasonsViewRef" :seasons="seasons" />

        <subTitle class="hideOverview showOnMobilePortrait pt-2">介绍</subTitle>

        <div class="overviewWrap overflow-hidden showOnMobilePortrait">
          <p class="overview px-4 h-[3.6em] leading-[1.2em] text-[0.9em] txtDarkSecondary">
            {{ mediaDetail?.overview }}
          </p>
        </div>

        <subTitle class="py-2">演员和工作人员</subTitle>
        <div class="flex pl-4 overflow-x-auto overflow-y-hidden">
          <creditCard v-for="person in credits" :key="person.name" :person="person" />
        </div>

        <subTitle class="" v-if="similar.length">更多相似</subTitle>
        <div class="flex pl-4 overflow-x-auto" v-if="similar.length">
          <videoCardBasic v-for="media in similar" :key="media.id" :media="media"
            :class="media.id == selectedId && selectedId ? 'selected' : ''" @click="choose(media)" />
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
  -webkit-line-clamp: 3;
  /* 限制为3行 */
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>