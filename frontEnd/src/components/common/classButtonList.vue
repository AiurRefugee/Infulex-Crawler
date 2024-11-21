<script setup>
import { ref, computed, onMounted } from "vue";
import { useMediaStore } from "@/stores/media";
const mediaStore = useMediaStore();

const genres = computed(() => mediaStore.genres);

onMounted(async () => {});
</script>
<template>
  <button
    class="browseClassButton browseButtonSize rounded-lg center"
    :style="{ backgroundImage: tag.backgroundImage }"
    v-for="tag in genres"
    :key="tag"
  >
    <text>{{ tag?.name }}</text>
  </button>
</template>
<style lang="scss" scoped>
//浏览页class button
.browseButtonSize {
  width: calc(100vw / var(--genreNum));
  height: 100%;
  @media (width <= 500px) {
    height: '';
    aspect-ratio: 1;
  }
}
.searchButton .browseButtonSize {
  width: 100%;
  height: 100%;
}
.browseClassButton {
  flex-shrink: 0;
  color: white;
  font-size: 2em;
  // letter-spacing: 1em;
  text-align: center;
  font-weight: bold;
  background-size: cover;
  letter-spacing: 10px;
}
</style>