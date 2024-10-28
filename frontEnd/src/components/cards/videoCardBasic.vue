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

const toDetail = () => {
  router.push({
    path: '/detailView',
    query: {
      title: props.media?.title || props.media?.name,
      id: props.media?.id,
      media_type: props.media?.media_type || props.mediaType
    }
  })
}

</script>
<template>
  <div class="basicCard flex-shrink-0 pr-5 cursor-pointer" @click="toDetail">
    <div class="cardImage w-full rounded-lg overflow-hidden">
      <img class="w-full h-full object-cover" :src="imageSrcPrefix + media?.poster_path" />
    </div>
    <div class="info h-[4em] pt-2">
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
.basicCard {
  width: calc(100vw / var(--bascCardNum)); 
  .cardImage {
    aspect-ratio: 2 / 3;
  } 
  @media (width < 500px) or (height < 500px) {
    font-size: 12px;
  }
}  
</style>