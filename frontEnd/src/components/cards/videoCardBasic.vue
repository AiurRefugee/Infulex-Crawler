<script setup>
import { computed } from 'vue'
const props = defineProps(["media"])
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
const title = computed( () => props.media?.title || props.media?.name )
const time = computed( () => props.media?.release_date || props.media?.first_air_date )

</script>
<template>
  <div class="basicCard txtDarkSecondary">
    <div class="cardImage">
      <img class="w-full h-full object-cover" :src="imageSrcPrefix + media?.poster_path" />
    </div>
    <div class="info h-[4em]">
      <p 
        class="filmTitle text-lg font-bold h-[2em] leading-[2em] singleLine txtDark_Primary"
        v-if="title"
      >
        {{ title }}
      </p>
      <p 
        class="text-sm subFilmTitle singleLine h-[1.5em] leading-[1.5em] txtDark_Secondary"
        v-if="time"
      >
        {{ time }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";

.basicCard {
  width: calc(100vw / var(--bascCardiNum));
  flex-shrink: 0;
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

  .singleLine {
    // font-weight: 500;
  }
}

.placeholder {
  background-color: var(--placeholderBg);
}
</style>