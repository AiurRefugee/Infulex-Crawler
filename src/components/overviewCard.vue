<script setup>
import { ref, computed } from "vue";
const props = defineProps(["media"]);
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
</script>
<template> 
  <div class="overviewCard" v-if="media">
    <div class="poster">
      <img
        class="w-full h-full object-cover"
        :src="imageSrcPrefix + media.poster_path"
        alt=""
      />
    </div>
    <div class="overview">
      <div class="overflow-hidden indent-6 limitRow text-sm">
        {{ media.overview }}
      </div>

      <p class="text-sm">{{ media.genre_ids }}</p>
      <p class="text-sm">{{ media.release_date || media.first_air_date }}</p>
    </div>
    <div class="operation">
      <button>Detail</button>
    </div>
  </div>
  <div class="overviewCard" v-else>{{ media }}</div>
</template>
<style scoped lang="scss">
.overviewCard {
  --overviewCardNum: 3.1;
  width: calc(100% / var(--overviewCardNum));
  height: 30%;
  display: flex;
  flex-shrink: 0;
  margin: 0.2rem;
  @media (width < 600px) {
    --overviewCardNum: 1.1;
  }
  .poster {
    aspect-ratio: 3 / 4;
    height: 100%;
    margin-right: 1rem;
  }
  .overview {
    width: 80%;
    height: 100%;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .limitRow {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; /* 确保white-space不是nowrap */
  }
  .operation {
    height: 100%;
    display: flex;
    width: 100px;
    justify-content: center;
    align-items: center;
  }
}
</style>