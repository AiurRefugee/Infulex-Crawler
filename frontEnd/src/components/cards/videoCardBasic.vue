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
  <div class="basicCard flex-shrink-0 scroll-m-4">
    <div class="cardImage w-full rounded-lg trans" v-if="posterPath">
      <img loading="lazy " class="w-full h-full overflow-hidden rounded-lg object-cover" :src="imageSrcPrefix + posterPath" />
    </div>
    <div class="cardImage w-full rounded-lg trans " v-else>
      <div class="w-full h-full defaultImage overflow-hidden rounded-lg center">
        <svg t="1730601813477" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="8940">
          <path
            d="M870.4 12.8H153.6A140.9024 140.9024 0 0 0 12.8 153.6v716.8A140.9024 140.9024 0 0 0 153.6 1011.2h504.2688a38.4 38.4 0 0 0 0-76.8H153.6c-35.2768 0-64-28.7232-64-64V374.1696h844.8V870.4c0 35.2768-28.7232 64-64 64h-11.4688a38.4 38.4 0 0 0 0 76.8H870.4A140.9024 140.9024 0 0 0 1011.2 870.4V153.6A140.9024 140.9024 0 0 0 870.4 12.8zM474.8288 291.2256L273.2544 89.6h301.0048l207.7184 207.7696H478.9248c-1.3824-2.0992-2.304-4.352-4.096-6.144zM89.6 153.6c0-35.2768 28.7232-64 64-64h11.0592l207.7184 207.7696H89.6V153.6z m798.9248 143.7696c-1.3824-2.048-2.2528-4.352-4.096-6.144L682.8544 89.6H870.4c35.2768 0 64 28.7232 64 64v143.7696h-45.8752z"
            fill="rgb(123, 123, 123)" p-id="8941"></path>
          <path
            d="M419.5328 441.856a70.2464 70.2464 0 0 0-70.9632-0.0512c-22.2208 12.8512-35.4816 35.84-35.4816 61.4912v297.1648c0 25.7024 13.2608 48.64 35.4816 61.4912 11.1104 6.4 23.296 9.6256 35.4304 9.6256s24.3712-3.2256 35.4816-9.6256l257.3312-148.5824a70.144 70.144 0 0 0 35.4816-61.44 70.144 70.144 0 0 0-35.4816-61.3888L419.5328 441.856z m-29.6448 348.5184v-276.9408l239.7696 138.496-239.7696 138.4448z"
            fill="rgb(123, 123, 123)" p-id="8942"></path>
        </svg>
      </div>
    </div>
    <div class="info h-[3em]">
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
$padding: 5px;
$margin: 5px;
.defaultImage {
  svg {
    $size: 50%;
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
  // width: calc(100vw / var(--basc_card_num));
  flex-shrink: 0;
  // font-size: 14px;
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