<script setup>
import { computed } from 'vue' 
const props = defineProps({
  "media": {
    Required: true
  },
  "imageSrcPrefix": {
    Required: false
  }
})

const title = computed( () => props.media?.title || props.media?.name )
const time = computed( () => props.media?.release_date || props.media?.first_air_date )

</script>
<template>
  <div class="basicCard flex-shrink-0 pr-3 cursor-pointer">
    <div class="cardImage">
      <img class="w-full h-full object-cover" :src="imageSrcPrefix + media?.poster_path" />
    </div>
    <div class="info h-[4em]">
      <p 
        class="filmTitle text-lg font-bold h-[2em] leading-[2em] singleLine txtDarkPrimary"
        v-if="title"
      >
        {{ title }}
      </p>
      <p 
        class="text-sm subFilmTitle singleLine h-[1.5em] leading-[1.5em] txtDarkSecondary"
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
  width: calc(100vw / var(--bascCardNum));  
} 
.cardImage {
  width: 100%;
  border-radius: var(--basicCardadius);
  aspect-ratio: 2 / 3;
  overflow: hidden;
}
</style>