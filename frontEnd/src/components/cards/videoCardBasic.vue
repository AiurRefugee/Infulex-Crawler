<script setup>
import { computed, inject } from 'vue' 
const aspectRatio = inject("aspectRatio") || '2 / 3'
const props = defineProps({ 
  "media": {
    Required: true
  },
  "imageSrcPrefix": {
    Required: false,
    default: ''
  }
})

const title = computed( () => props.media?.title || props.media?.name )
const time = computed( () => props.media?.release_date || props.media?.first_air_date )

</script>
<template>
  <div class="basicCard flex-shrink-0 pr-3 cursor-pointer">
    <div class="cardImage w-full rounded-md overflow-hidden">
      <img class="w-full h-full object-cover" :src="imageSrcPrefix + media?.poster_path" />
    </div>
    <div class="info h-16 pt-2">
      <p 
        class="filmTitle text-[1.1em] font-bold singleLine txtDarkPrimary"
        v-if="title"
      >
        {{ title }}
      </p>
      <p 
        class="subFilmTitle singleLine txtDarkSecondary"
        v-if="time"
      >
        {{ time }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss"> 
.basicCard {
  width: calc(100vw / var(--bascCardNum)); 
  .cardImage {
    aspect-ratio: 2 / 3;
  } 
}  
</style>