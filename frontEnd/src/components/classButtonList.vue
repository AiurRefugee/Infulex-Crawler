<script setup>
import { ref, computed, onMounted } from "vue";
import { useMediaStore } from "@/stores/media";
const mediaStore = useMediaStore();

const genres = computed(() => mediaStore.genres); 


onMounted(async () => {
  getGenres()
});
</script>
<template>
  <div ref="listWrap" class="genreWrapper">
    <div class="genreTitle w-full px-4 flex txtDarkSecondary">
      <h1 class="text-xl font-bold py-2">影片类型</h1>
    </div>
    <div ref="list" class="w-full flex pl-4 gap-3 overflow-auto hideScroll">
      <div
        class="browseClassButton browseButtonSize rounded-lg center"
        :style="{ backgroundImage: tag.background }"
        v-for="tag in genres"
        :key="tag"
      >
        <text>{{ tag?.name }}</text>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
::-webkit-scrollbar {
  display: none;
}
.genreWrapper {
  margin-bottom: 1.5rem;
  @media (width < 500px) {
    margin-bottom: 1rem;
  }
}
//浏览页class button
.browseButtonSize {
  width: calc(100% / var(--genreNum));
  height: 130px;
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