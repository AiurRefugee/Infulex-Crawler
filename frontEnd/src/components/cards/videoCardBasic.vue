<script setup>
import { computed, inject } from 'vue' 
import { useRouter } from 'vue-router'
import { tmdbImgPrefix } from '@/config/tmdbConfig' 

const router = useRouter()

const props = defineProps({ 
  "media": {
    Required: true
  },
  "mediaType": {
    required: false,
    default: 'movie'
  },
  "imageSrcPrefix": {
    Required: false,
    default: tmdbImgPrefix
  }
})

const title = computed( () => props.media?.title || props.media?.name )
const time = computed( () => props.media?.release_date || props.media?.first_air_date )
const year = computed( () => time.value?.split('-')[0] )
const posterPath = computed( () => props.media?.poster_path || props.media?.backdrop_path || props.media?.still_path )
 

</script>
<template>
  <div class="basicCard flex-shrink-0 cursor-pointer">
    <div class="cardImage p-1 w-full rounded-lg trans">
      <img class="w-full h-full rounded-lg overflow-hidden object-cover" :src="imageSrcPrefix + posterPath" />
    </div>
    <div class="info pl-1">
      <p 
        class="filmTitle text-[1.1em] font-bold singleLine txtDarkPrimary"
        v-if="title"
      >
        {{ title }}
      </p>
      <p 
        class="subFilmTitle text-[0.8em] singleLine txtDarkSecondary"
        v-if="time"
      >
        {{ time }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss"> 
@import '@/style/variables.scss';
.basicCard {
  --border_color: transparent;
  width: calc(100vw / var(--basc_card_num)); 
  padding-right: 0.5rem;
  flex-shrink: 0;
  
  .cardImage { 
    border-width: 2px;
    border-color: var(--border_color);
    aspect-ratio: 2 / 3;
  } 
}  
.info {
  height: 3em;
}
.episode .info {
  height: 1.8em;
}
.basicCardRect {
  width: calc(100vw / var(--basc_card_rect_num)) !important;
  .cardImage {
    aspect-ratio: 16 / 9 !important;
  }
} 
.selected {
  --border_color: #f97316;
}
@media (width < 500px) or (height < 500px) {
    .basicCard {
      padding-right: 0rem;
      font-size: 12px;
    } 
    .cardImage { 
      aspect-ratio: 2 / 2.6;
    }
}
@media (prefers-color-scheme: dark) {
  .cardImage {
    // box-shadow: 0 0 5px orange !important;
  }
}
</style>