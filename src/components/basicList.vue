<script setup>
import { useRouter } from "vue-router";
import gsap from "gsap";

import { useFilmStore } from "@/stores/films.ts";

const imageSrcPrefix = "https://image.tmdb.org/t/p/original";

const filmStore = useFilmStore();

const router = useRouter();
const props = defineProps(["medias", "title"]);

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
  <div class="basicWrapper flex flex-col justify-around">
    <h2 class="h-16 pl-4 flex items-center">{{ title }}</h2>
    <div class="flex overflow-x-auto overflow-y-hidden pl-6">
      <div class="basicCard" v-for="media in medias" :key="media">
        <div class="cardImage">
          <img
            class="w-full h-full object-cover"
            :src="imageSrcPrefix + media.poster_path"
          />
        </div>
        <div class="info">
          <p class="filmTitle singleLine">{{ media.title || media.name || "--" }}</p>
          <p class="text-sm subFilmTitle singleLine">{{ media.release_date || media.first_air_date || "--" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.basicWrapper {
  color: var(--txtColor_Primary);
  width: 100%;
  overflow: hidden;
  // margin-bottom: 0.5rem;
  // height: var(--basicCardHeight);
  @media (width >=600px) and (width < $breakpointNormal) {
    --height: 25vh;
  }
}
.basicCard {
  
  width: calc(100% / var(--bascCardiNum));
  aspect-ratio: 3/4;
  // margin: 0 0.6rem;
  margin-left: 0;
  padding-right: 0.8rem;
  flex-shrink: 0;
  cursor: pointer;
 
  @media (width >=628px) and (width < 1300px) {
    --bascCardiNum: 6.1;
  }
  .cardImage {
    width: 100%;
    // height: calc(100% - var(--basicCardInfoHeight));
    flex-shrink: 0;
    border-radius: var(--basicCardadius);
    aspect-ratio: 2 / 3; 
    overflow: hidden;
  }
  .info {
    height: var(--basicCardInfoHeight);
  }
}


</style>