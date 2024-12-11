<script setup>
import { onMounted, ref, computed, inject, provide, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import moreActions from "./components/moreActions.vue";
import creditCard from "@/components/cards/creditCard.vue";
import videoCardBasic from "@/components/cards/videoCardBasic.vue";
import videoListBasic from "@/components/common/videoListBasic.vue";
import share from "./components/share.vue";
import moreImages from "./components/moreImages.vue";
import toSeries from "./components/toSeries.vue";
import backdropArea from "./components/backdropArea.vue";
import optButton from "./components/optButton.vue";
import subTitle from "./components/subTitle.vue";
import seasonsView from "./components/seasonsView.vue";
import { useTaskStore } from "@/stores/tasks";
import { layoutStore } from "@/stores/layout";
import { tmdbApi } from "@/apis/tmdbApi.js";
import { mediasApi } from "@/apis/medias.js";
import { taskApi } from "@/apis/tasks.js";
const route = useRoute();
const router = useRouter();
const layout = layoutStore();
const tasks = useTaskStore();

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", ""];

const isFavorite = ref(null);
const backdropAreaRef = ref(null);
const optButtonRef = ref(null);
const mediaId = ref(null);
const inTaskList = ref(null);
const selectedId = ref(null);
const mediaType = ref(null);
const seasonsViewRef = ref(null);
const similar = ref(defaultArray);
const seasons = ref(defaultArray);
const episodes = ref(defaultArray);
const seasonNum = ref(1);
const episodeNum = ref(1);
const backdropUrl = ref("");
const poster = ref("");
const mediaTitle = ref("");
const mediaDetail = ref({});
const TVDetail = ref({});
const generes = ref([]);
const guestStars = ref([]);
const cast = ref([]);
const crew = ref([]);

const actions = [
  [
    {
      title: "toSeries",
    },
  ],
  [
    {
      title: "moreImages",
    },
  ],
  [
    {
      title: "share",
    },
  ],
];
const direcotors = computed(() => {
  return crew.value.filter((crewMember) => crewMember.job === "Director");
});

const writers = computed(() => {
  return crew.value.filter((crewMember) => crewMember.job === "Writer");
});

const credits = computed(() => {
  const creditArray = [
    ...cast.value,
    ...guestStars.value,
    ...direcotors.value,
    ...writers.value,
  ];
  if (creditArray.length) {
    return creditArray;
  } else {
    return [];
  }
});

provide("poster", poster);
provide("isFavorite", isFavorite);
provide("tvDetail", TVDetail);
provide("seasonNum", seasonNum);
provide("episodeNum", episodeNum);
provide("mediaType", mediaType);
provide("backdropUrl", backdropUrl);
provide("media", mediaDetail);
provide("generes", generes);
provide("inTaskList", inTaskList);

const scrollTopModel = ref(0);
const clearCredits = () => {
  cast.value = [];
  crew.value = [];
  guestStars.value = [];
};

const findTask = async (mediaType, mediaId) => {
  taskApi.getTaskDetail(mediaType, mediaId).then((res) => {
    inTaskList.value = res ? res : false;
  });
};

const findFavorite = async (mediaId, mediaType) => {
  mediasApi.findFavorite(mediaId, mediaType).then((res) => {
    console.log(res);
    isFavorite.value = res?.data != null;
  });
};

const calSeasonAndEpisodeNumber = (id, media_type) => {
  if (media_type == "tv") {
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
};

const saveSeasonAndEpisodeNumber = (id, season_number, episode_number) => {
  localStorage.setItem(
    `TV_${id}`,
    JSON.stringify({ seasonNum: season_number, episodeNum: episode_number })
  );
};

const searchMedia = async (title, mediaType, year, num = 1) => {
  if (num > 2) return;
  let media;
  if (mediaType == "movie") {
    const response = await tmdbApi.searchMovie(title, year);
    media = response.results[0];
  }
  if (mediaType == "tv") {
    const response = await tmdbApi.searchTVSeries(title, year);
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
};

const getMovieDetail = async (id) => {
  clearCredits();
  const detail = await tmdbApi.getMoviewDetail(id);
  if (detail) {
    mediaDetail.value = detail;
    backdropUrl.value =
      tmdbApi.tmdbImgPrefix + (detail?.backdrop_path || detail?.poster_url);
    generes.value = detail?.genres;
    mediaTitle.value = detail?.name || detail?.title;
  }
};

const getTVDetail = async (id) => {
  const detail = await tmdbApi.getTVDetail(id);
  if (detail) {
    TVDetail.value = detail;
    seasons.value = detail?.seasons;
    backdropUrl.value = tmdbApi.tmdbImgPrefix + detail?.backdrop_path;
    generes.value = detail?.genres;
    mediaTitle.value = detail?.name;
  }
};

const getMovieCredits = async (id) => {
  const response = await tmdbApi.getMovieCredits(id);
  cast.value = response?.cast;
  crew.value = response?.crew;
};

const getSimilar = async (id, media_type) => {
  if (!id || !media_type) return;
  if (media_type == "tv") {
    const response = await tmdbApi.getSimilarTVSeries(id);
    similar.value = response?.results;
  }
  if (media_type == "movie") {
    const response = await tmdbApi.getSimilarMovies(id);
    similar.value = response?.results;
  }
};

const render = async (id, media_type) => {
  if (media_type == "tv") {
    await getTVDetail(id);
    seasonsViewRef.value.render(id, seasons.value);
  }
  if (media_type == "movie") {
    await getMovieDetail(id);
    getMovieCredits(id);
  }
  findFavorite(id, mediaType.value);
};

const addTask = () => {
  if (mediaType.value == "movie") {
    tasks.createTask(mediaDetail.value, "movie");
  }
  if (mediaType.value == "tv") {
    tasks.createTask(TVDetail.value, "tv");
  }
};

const addToFavorite = async () => {
  if (mediaType.value == "movie") {
    const addToFavorite = await mediasApi.addToFavorite(
      mediaDetail.value,
      "movie"
    );
  } else {
    const addToFavorite = await mediasApi.addToFavorite(TVDetail.value, "tv");
  }
};
provide("addToFavorite", addToFavorite);

onMounted(async () => {
  poster.value = tmdbApi.tmdbImgPrefix + route.query.poster;
  if (layout.showTab == false) {
    layout.setTabIconVisible(false);
  }
  const { title } = route.params;

  const { media_type, year } = route.query;
  mediaType.value = media_type;
  await nextTick();
  let id = route.query?.id;
  if (!id) {
    id = await searchMedia(title, media_type, year);
  }
  mediaId.value = id;
  findFavorite(mediaId.value, mediaType.value);
  findTask(mediaType.value, mediaId.value);
  calSeasonAndEpisodeNumber(id, media_type);
  console.log(id, media_type);
  render(id, media_type);
  getSimilar(id, media_type);
});
</script>
<template>
  <scrollView v-model:scrollTopModel="scrollTopModel" class="bg-light-800">
    <template v-slot:header>
      <scrollHeader
        class="fixed top-0 z-10"
        :class="scrollTopModel > 45 ? 'bg-light-800' : ''"
      >
        <template #left>
          <backword @click="router.go(-1)" />
        </template>
        <template v-slot:center>
          <h1 class="font-bold text-[1.2em] text-dark-900 whitespace-nowrap">
            {{ mediaTitle }} {{ scrollTop }}
          </h1>
        </template>
        <template v-slot:right>
          <moreActions :actions="actions">
            <!-- <template #addToFavorite><addFavorite /></template> -->
            <template #share><share /></template>
            <template #toSeries><toSeries /></template>
            <template #moreImages><moreImages /></template>
          </moreActions>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <div class="scroll">
        <backdropArea ref="backdropAreaRef" />

        <optButton class="showOnMobilePortrait h-12 pt-2" ref="optButtonRef" />

        <subTitle class="hideOverview showOnMobilePortrait pt-2">介绍</subTitle>

        <p
          class="overviewWrap overview mt-2 h-[3.6em] px-4 leading-[1.2em] text-[0.9em] txtDarkSecondary"
        >
          {{ mediaDetail?.overview }}
        </p>

        <seasonsView
          v-if="mediaType == 'tv'"
          ref="seasonsViewRef"
          v-model:media="mediaDetail"
          v-model:episodeNum="episodeNum"
          v-model:seasonNum="seasonNum"
          v-model:crew="crew"
          v-model:guestStars="guestStars"
        />

        <subTitle class="py-2">演员和工作人员</subTitle>
        <div class="flex pl-4 overflow-x-auto overflow-y-hidden">
          <creditCard
            v-for="person in credits"
            :key="person.name"
            :person="person"
          />
        </div>

        <videoListBasic :list="aiqiyiWangju" :title="'更多相似'">
          <template #card="{ media }">
            <videoCardBasic
              class="basicW pr-2"
              v-for="media in similar"
              :key="media.id"
              :media="media"
              :class="media.id == selectedId && selectedId ? 'selected' : ''"
              @click="choose(media)"
            />
          </template>
        </videoListBasic>
        <div class="h-32"></div>
      </div>
    </template>
  </scrollView>
</template>
<style lang="scss">
::-webkit-scrollbar {
  display: none;
}
.showOnMobilePortrait,
.overviewWrap {
  display: none;
}

@media (width < 500px) and (orientation: portrait) {
  .showOnMobilePortrait {
    display: block;
  }
  .overviewWrap {
    display: flex;
  }
}
.overview {
  max-width: 100%;
  -webkit-line-clamp: 3;
  /* 限制为3行 */
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>