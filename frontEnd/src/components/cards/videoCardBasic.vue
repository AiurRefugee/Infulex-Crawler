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


</script>
<template>
  <div class="basicCard py-1 pr-2 flex-shrink-0 scroll-m-4">
    <div class="cardImage p-[3px] w-full rounded-lg trans" v-if="posterPath">
      <img class="w-full h-full overflow-hidden rounded-lg object-cover" :src="imageSrcPrefix + posterPath" />
    </div>
    <div class="cardImage p-[3px] w-full rounded-lg trans " v-else>
      <div class="w-full h-full defaultImage overflow-hidden rounded-lg center">
        <img src="@/assets/icons/imgAlt.svg" />
      </div>
    </div>
    <div class="info h-[4em] pt-1">
      <p class="filmTitle  font-medium singleLine txtDarkPrimary" v-if="title">
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

.defaultImage {
  svg {
    $size: 50%;
    width: $size;
    height: $size;
  }
  box-shadow: $videoCardBasicBoxShadow;
  
}
.cardImage {
  cursor: pointer;
}
.selected .defaultImage {
  box-shadow: none;
}

.basicCard {
  --border_color: transparent;
  width: calc(100% / var(--basc_card_num));
  flex-shrink: 0;
  font-size: 14px;
  .cardImage {
    outline: 3px var(--border_color) solid;
    border-color: var(--border_color);
    aspect-ratio: 2 / 3;

    // background-color: #141414;
    img {
      box-shadow: $videoCardBasicBoxShadow;
    }
  }
}

.episode .info {
  height: 1.8em;
}

.basicCardRect {
  width: calc(100% / var(--basc_card_rect_num)) !important;
  // scroll-snap-align: start;
  // scroll-margin-left: 1rem;
  .cardImage {
    aspect-ratio: 16 / 9 !important;
  }
}
.basicCardRectInGrid {
  width: 100%; 
  .cardImage {
    aspect-ratio: 16 / 9 !important;
    }
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