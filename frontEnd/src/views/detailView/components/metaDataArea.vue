<script setup>
import { ref, computed, inject } from "vue";
const media = inject("media");
const genres = computed(() => media.value?.genres?.map((g) => g.name).join(", "));
const calTimeStr = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
}
</script>
<template>
  <div class="txtLightPrimary">
    <h1 class="text-[2em] font-bold">{{ media?.title || media?.name }}</h1>
    <div class="metalist flex h-6 gap-4 items-center">
        <span>
            <text>{{ media?.vote_average }}</text>
        </span>
        <span>
            <text>{{ media?.release_date?.split('-')?.[0] }}</text>
        </span>
        <span> 
            <text v-for="genre in genres" :key="genre">{{ genre }}</text>
        </span>  
    </div>
    <p class="overview">{{ media?.overview }}</p>
  </div>
</template>
<style scoped lang="scss">
@media (width < 500px) {
    .overview {
        display: none;
    }
}
</style>