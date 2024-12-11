<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { tmdbImgPrefix } from '@/config/tmdbConfig'
import loadImg from "@/components/common/loadImg.vue";
const router = useRouter() 
const props = defineProps({
  "toDetail": {
    default: false,
  },
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
  },
  "index": {
    required: false,
    default: null
  }
})

const title = computed(() => props.media?.title || props.media?.name)
const time = computed(() => props.media?.release_date || props.media?.first_air_date)
const year = computed(() => time.value?.split('-')[0])
const posterPath = computed(() => props.media?.poster_path || props.media?.backdrop_path || props.media?.still_path)

const toDetail = () => {
  if (!props.toDetail) return
  const media = props.media
  const mediaType = props.mediaType
  console.log("toDetail");   
  router.push({
    path: '/mediaDetail/' + title.value,
    query: {
      id: media?.id,
      media_type: mediaType,
      poster: posterPath.value
    },
  })
}

onMounted(() => {

})
</script>
<template>
  <div class="basicCard w-full flex-shrink-0 scroll-m-4" @click="toDetail">
    <div class="cardImage center w-full rounded-lg trans">
       <loadImg :src="imageSrcPrefix + posterPath"/>
    </div>
    <div class="info h-[3em]">
      <p class="filmTitle  font-medium singleLine text-dark-900" v-if="title">
        <span v-if="index != null">{{ index + 1 + '. ' }}</span>
        <span>{{ title }}</span>
      </p>
      <p class="subFilmTitle text-[0.8em] singleLine txtDarkSecondary" v-if="time">
        {{ time }}
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '@/style/variables.scss';
$padding: 5px;
$margin: 5px;

.defaultImage {
  $size: 60px;
  svg {
    width: $size;
    height: $size;
  }
  box-shadow: $videoCardBasicBoxShadow;
}

.selected .defaultImage {
  box-shadow: none;
}

.basicCard {
  --border_color: transparent;
  flex-shrink: 0; 
  .cardImage {

    outline: 3px var(--border_color) solid;
    border-color: var(--border_color);
    aspect-ratio: 2 / 3;
    padding: $padding;
    margin: $margin 0;
    cursor: pointer;

    img { 
      box-shadow: $videoCardBasicBoxShadow;
    }
  }
}

.info {
  padding-left: $padding;
}

.rect .cardImage {
  aspect-ratio: 16 / 9 !important;
}

.selected {
  --border_color: #f97316;
}

@media (width < 500px) or (height < 500px) {
  .basicCard {
    font-size: 12px;
  }

  .cardImage {
    aspect-ratio: 2 / 3;
  }
}

@media (prefers-color-scheme: dark) {
  .cardImage img {
    // box-shadow: 0 0 5px rgba(139, 139, 139, 0.627);
  }
}
</style>