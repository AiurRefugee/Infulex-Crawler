<script setup>
import { onMounted } from "vue";
const props = defineProps(["medias", "title"]);
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
onMounted(() => {});
</script>
<template>
  <h1 class="pl-4 relative top-0 z-10 text-2xl">浏览</h1>
  <div id="crouselWrapper" class="crouselWrapper w-full">
    <div class="w-ful flex overflow-x-auto">
      <div v-for="media in medias" :key="media.id" class="crouselCard">
        <img
          class="w-full h-full object-cover"
          :src="imageSrcPrefix + media.backdrop_path"
        />
        <div class="media flex flex-col p-4 pl-6 w-1/3 h-2/3 justify-around absolute bottom-0 overflow-hidden">
          <h1>{{ media.title }}</h1>
          <p>{{ media.overview }}</p>
          <p>{{ media.genre_ids }}</p>
          <p>{{ media.release_date }}</p>
          
        </div>
      </div>
      <div class="crouselPointerWrapper flex justify-center items-center">
        <div class="crouselPointer"></div>
      </div>
    </div>
  </div>
  <div id="scrollTitle" class="spacePlace"></div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
$height: 70vh;
.crouselWrapper {
  --cardW: calc(100% / var(--crouselCardNum));
  --cardH: calc(var(--cardW) / var(--crouselAspectRatio));
  color: var(--txtColor_Primary);
  position: fixed;
  overflow: hidden;
  z-index: -1;
  top: 0; 
  //   height: var(--cardH);
  .crouselPointerWrapper {
    width: 100%;
    height: 1.5rem; 
    position: absolute;
    bottom: 0;
    .crouselPointer {
      width: 20%;
      height: 1rem;
      // background: white;
    }
  }
  .crouselCard {
    color: white;
    width: var(--cardW);
    // border-radius: 1rem;
    overflow: hidden;
    aspect-ratio: var(--crouselAspectRatio);
    flex-shrink: 0;
    // margin-right: 1rem;
    position: relative;
    overflow: hidden;
    img {
      // border-radius: 1rem;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      // height: $height;
      z-index: 0;
    }
    .media {
       
      text-shadow: 0px 0px 10px black;

      h1 {
        font-size: 2rem;
        font-weight: 700;
      }
      h1,
      p {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }
}
.spacePlace {
  width: 100vw;
  position: relative;
  top: -4rem;
  aspect-ratio: 21 / 8;
}
</style>