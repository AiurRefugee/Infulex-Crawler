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

const toDetail = () => {
  router.push({
    path: '/detailView/' + title.value,
    query: {
      id: props.media?.id,
      media_type: props.media?.media_type || props.mediaType,
      year: year.value
    },
  })
}

</script>
<template>
  <div class="basicCard flex-shrink-0 pr-4 py-2 cursor-pointer" @click="toDetail">
    <div class="cardImage w-full rounded-lg overflow-hidden">
      <img class="w-full h-full object-cover" :src="imageSrcPrefix + media?.poster_path" />
    </div>
    <div class="info pt-2">
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
  width: calc(100vw / var(--basc_card_num)); 
  
  .cardImage {
    box-shadow: 0 0 5px #4d4d4d;
    aspect-ratio: 2 / 3;
  } 
}  
.info {
  height: 4em;
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
    box-shadow: 0 0 5px #4d4d4d !important;
  }
}
</style>