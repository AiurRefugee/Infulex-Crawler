<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import gsap from "gsap";

import { useFilmStore } from "@/stores/films.ts";
import { layoutStore } from "@/stores/layout";
const layout = layoutStore();
const size = computed(() => layout.size);
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";

const filmStore = useFilmStore();

const router = useRouter();
const props = defineProps(["movies"]);

function toDetail() {
  router.push("/detail/" + props.item.film._id);
  filmStore.filmDetail = props.item;
  localStorage.setItem("filmDetail", JSON.stringify(props.item));
  document.documentElement.style.setProperty("--headerOpacity", 0);
}

function getFilmPosterUrl(url) {
  const filmPosterBaseUrl = "/filmPosters/";
  return filmPosterBaseUrl + url + ".jpeg";
}
</script>
<template>
  <div class="">
    <h2 class="h-8 pl-4 flex items-center">每日推荐</h2>
    <div class="dailRecWrapper pl-6">
      <div class="dailCard" v-for="movie in movies" :key="movie">
        <div class="cardImg relative">
          <img
            class="w-full h-full object-cover absolute left-0 top-0 z-0"
            :src="imageSrcPrefix + movie.backdrop_path"
          />
          <!-- <img class="absolute z-10 w-1/2 h-2/3" src="/src/assets/icons/play-circle.svg"> -->
          <!-- <img
          class="w-full h-full object-cover"
          :src="imageSrcPrefix + movie.poster_path"
          v-else
        /> -->
        </div>
        <div class="info">
          <p class="filmTitle">{{ movie.title || "--" }}</p>
          <p class="text-sm">{{ movie.release_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.dailRecWrapper {
  --dailHeight: max(30vh, 150px);
  --dailNum: 3.1;
  --infoHeight: 3rem;
  --dailRadius: 8px;
  width: 100%;
  display: flex;
  height: var(--dailHeight); 
  overflow-x: auto;
  overflow-y: hidden;
  .dailCard {
    cursor: pointer;
    width: calc(100% / var(--dailNum));
    height: 100%;
    flex-shrink: 0;
    padding-right: 1rem;
    .cardImg {
      height: calc(100% - var(--infoHeight));
      border-radius: var(--dailRadius);
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .info {
      height: var(--infoHeight);
    }
  }
  @media (width <=628px) {
    --dailNum: 1.1;
    // --dailHeight: 60vh;
    --dailRadius: 18px;
  }
  @media (width >=600px) and (width < 1300px) {
    --dailNum: 2.1;
    --dailHeight: 40vh;
  }
}
</style>