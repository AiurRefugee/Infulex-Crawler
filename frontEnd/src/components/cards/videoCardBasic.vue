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
 

</script>
<template>
  <div class="basicCard flex-shrink-0 pr-4 py-2 cursor-pointer">
    <div class="cardImage p-1 w-full rounded-lg trans">
      <img class="w-full h-full rounded-lg overflow-hidden object-cover" :src="imageSrcPrefix + media?.poster_path" />
    </div>
    <div class="info pl-1 pt-2">
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
  
  .cardImage { 
    border-width: 2px;
    border-color: var(--border_color);
    aspect-ratio: 2 / 3;
  } 
}  
.info {
  height: 4em;
}
.selected {
  --border_color: #f97316;
}
@media (width < 500px) or (height < 500px) {
    .basicCard {
      font-size: 12px;
    }
    .info {
      height: 3.5em;
    }
}
@media (prefers-color-scheme: dark) {
  .cardImage {
    // box-shadow: 0 0 5px orange !important;
  }
}
</style>