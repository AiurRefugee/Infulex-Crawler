<script setup>
import { ref, computed } from "vue";
import metaDataArea from "./metaDataArea.vue";
import { tmdbImgPrefix } from "@/config/tmdbConfig";
const props = defineProps({
  media: {
    type: Object,
    Required: true,
    default: () => ({}),
  },
});
const backdropUrl = computed(() => {
  return tmdbImgPrefix + props.media?.backdrop_path;
});
</script>
<template>
  <div
    class="backdropWrap h-[80vh] p-4 flex flex-col backgroundImage"
    :style="{ backgroundImage: `url(${backdropUrl})` }"
  >
    <div class="h-full"></div>
    <metaDataArea/>
  </div>
</template>
<style scoped lang="scss">
.backgroundImage {
  background-size: cover;
}
@media (width < 500px) {
    .backdropWrap {
        width: 100vw;
        height: unset;
        aspect-ratio: 16/9;
    }
}
</style>