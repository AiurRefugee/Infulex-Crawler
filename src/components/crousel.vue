<script setup>
import { onMounted } from "vue";
const props = defineProps(["medias", "title"]);
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
onMounted(() => {});
</script>
<template>
  <div id="crouselWrapper" class="w-full">
    <h1 class="pl-4">About</h1>
    <div class="w-ful pl-6 crouselWrapper flex overflow-x-auto">
      <div v-for="media in medias" :key="media.id" class="crouselCard">
        <img
          class="w-full h-full object-cover"
          :src="imageSrcPrefix + media.poster_path"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.crouselWrapper {
  --cardW: calc(100% / var(--crouselCardNum));
  --cardH: calc(var(--cardW) / var(--crouselAspectRatio));
  //   height: var(--cardH);
//   padding-left: 1rem;
  .crouselCard {
    width: var(--cardW);
    border-radius: 1rem;
    aspect-ratio: var(--crouselAspectRatio);
    flex-shrink: 0;
    margin-right: 1rem;
    overflow: hidden;
    img {
      border-radius: 1rem;
    }
  }
}
</style>