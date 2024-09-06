<script setup>
const props = defineProps(["media"])
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";

</script>
<template>
    <button class="basicCard">
        <div class="cardImage">
          <img
            class="w-full h-full object-cover"
            :src="imageSrcPrefix + media.poster_path"
          />
        </div>
        <div class="info">
          <p class="filmTitle singleLine txtDark_Primary">{{ media.title || media.name || "--" }}</p>
          <p class="text-sm subFilmTitle singleLine txtDark_Secondary">{{ media.release_date || media.first_air_date || "--" }}</p>
        </div>
      </button>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
.basicCard {
  
  width: calc(100% / var(--bascCardiNum));
  aspect-ratio: 3/4;
  flex-shrink: 0;
  // margin: 0 0.6rem;
  margin-left: 0;
  padding-right: 0.8rem;
  flex-shrink: 0;
  cursor: pointer;
  
  .cardImage {
    width: 100%;
    // height: calc(100% - var(--basicCardInfoHeight));
    flex-shrink: 0;
    border-radius: var(--basicCardadius);
    aspect-ratio: 3 / 4; 
    overflow: hidden;
  }
  .info {
    height: var(--basicCardInfoHeight);
  }
}
</style>