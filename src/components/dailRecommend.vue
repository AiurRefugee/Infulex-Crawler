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
  <div class="dailWrapper">
    <h2 class="h-12 pl-4 flex items-center">{{ title }}</h2>
    <div class="dailCardWrapper flex w-full overflow-x-auto overflow-y-hidden pl-6">
      <div class="dailCard" v-for="media in medias" :key="media">
        <div
          class="cardImg relative"
          :style="{
            'background-image': `url(${imageSrcPrefix + media.backdrop_path})`,
          }"
        >
          <!-- <img
            class="w-full h-full object-cover absolute left-0 top-0 z-0"
            :src="imageSrcPrefix + media.backdrop_path"
          /> -->
          <!-- <p class=" absolute z-10 bottom-4 h-8">{{ media.overview }}</p> -->
          <img
            class="absolute z-10 w-1/2 h-1/3"
            src="/src/assets/icons/play-circle.svg"
          />
          <!-- <img
          class="w-full h-full object-cover"
          :src="imageSrcPrefix + media.poster_path"
          v-else
        /> -->
        </div>
        <div class="info">
          <p class="filmTitle">{{ media.title || media.name || "--" }}</p>
          <p class="subFilmTitle text-sm">
            {{ media.release_date || media.first_air_date || "--" }}
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="w-full h-0.5 bg-zinc-700"></div> -->
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.dailWrapper {
  color: var(--txtColor_Primary);
  position: relative;
  z-index: 0;
  background: var(--bg_Primary);
}
.dailCardWrapper { 
  color: var(--txtColor_Primary);
  background: var(--bg_Primary);
  position: relative;
  z-index: 0;
  background: var(--bg_Primary);
}
.dailCard {
  cursor: pointer;
  width: calc(100% / var(--dailNum));

  // height: 100%;
  flex-shrink: 0;
  padding-right: 1rem;
  .cardImg {
    // height: calc(100% - var(--infoHeight));
    width: 100%;
    background-position: center;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.1);
    background-blend-mode: overlay;
    aspect-ratio: 16 / 9;
    border-radius: 0.8rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info {
    // height: var(--infoHeight);
  }
}
</style>