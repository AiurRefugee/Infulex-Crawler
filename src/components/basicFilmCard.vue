<script setup>
import { useRouter } from "vue-router";
import gsap from "gsap";

import { useFilmStore } from "@/stores/films.ts"

const filmStore = useFilmStore()

const router = useRouter();
const props = defineProps({
    item: Object,
    showAll: Boolean
})

function toDetail() {
  router.push("/detail/" + props.item.film._id);
  filmStore.filmDetail = props.item
  localStorage.setItem('filmDetail', JSON.stringify(props.item))
  document.documentElement.style.setProperty("--headerOpacity", 0);

}

function getFilmPosterUrl(url) {
  const filmPosterBaseUrl = '/filmPosters/'
  return filmPosterBaseUrl + url + '.jpeg'
}

</script>
<template>
  <div :class="['listItem', showAll ? 'showAll' : '']">
    <div class="listItemContent" @click="toDetail">
      <img class="w-full h-full object-cover" :src="getFilmPosterUrl(item.film.title)" />
    </div>
    <div class="primText">{{ item.film.title }}</div>
    <div class="year">{{ item.film.release_date }}</div>
  </div>
</template>