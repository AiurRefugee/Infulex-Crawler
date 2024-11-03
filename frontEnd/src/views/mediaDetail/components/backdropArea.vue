<script setup>
import { ref, computed } from "vue";
import metaDataArea from "./metaDataArea.vue";
import optButton from "./optButton.vue";
import { tmdbImgPrefix } from "@/config/tmdbConfig";
import { inject } from "vue";
const props = defineProps({
  media: {
    type: Object,
    Required: true,
  },
});
const backdropUrl = inject('backdropUrl')
</script>
<template>
  <div class="backdropWrap flex center gap-2 pb-2">

    <div class="w-full h-full relative overflow-hidden">
      <img class="backdropImage" :src="backdropUrl" />

      <div class="w-full flex bgMask">
        <optButton class="w-[400px] h-10 showOpt hideOnMobileLandscape" />
        <metaDataArea class="w-full pl-4 pb-3" />
      </div>
    </div>

    <div class="mobileView w-full h-full flex flex-col justify-between">
      <div class="overviewArea flex flex-col">
        <h1 class="creditTitle px-4 pt-2 pb-1 font-bold txtDarkPrimary">介绍</h1> 
        <p class="px-4 text-sm txtDarkSecondary overflow-hidden text-ellipsis">
          {{ media?.overview }}
        </p> 
      </div>
      <optButton class="h-10"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
.backdropWrap {
  height: 70vmin;
} 
.backdropImage {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  object-fit: cover;
}
.bgMask {
  position: absolute;
  bottom: 0;
  background-image: linear-gradient(
    to bottom,
    transparent,
    rgba(65, 65, 65, 0.5) 60%
  );
}
.mobileView {
  display: none;
}
// 手机竖屏
@media (width < 500px) and (orientation: portrait) {
  .showOpt {
    display: none;
  }
  .backdropWrap {
    width: 100%;
    height: 47vh;
    
  }
}
// 手机横屏
@media (height < 500px) and (orientation: landscape) {
  .mobileView {
    display: flex !important;
  }
  .backdropWrap {
    height: 60vh;
    overflow: hidden; 
    padding-left: 0.75rem;
  }
  .backdropWrap>div {
    $radius: 0.75rem;
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
  }
  .hideOnMobileLandscape {
    display: none;
  }
}
</style>