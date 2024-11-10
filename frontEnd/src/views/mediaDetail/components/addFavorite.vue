<script setup>
import { ref, onMounted, computed, watch, inject } from "vue";
import useFavoriteToggle from "../composables/favorite";

const media = inject("media");
const mediaType = inject("mediaType");
const tvDetail = inject("tvDetail");

const { mediaDetail, isFavorite, toggleFavorite } = useFavoriteToggle(
  media,
  mediaType,
  tvDetail
);


onMounted(async () => {}); 
</script>
<template>
  <div class="actionItem" @click="toggleFavorite">
    <text class="text-red-500" v-if="isFavorite">取消收藏</text>
    <text v-else>添加收藏</text>
    <svg class="icon h-[15px] aspect-square" viewBox="0 0 1024 1024">
      <path
        class="fastTrans"
        d="M554.8 99.6l104.9 212.5c7 14.1 20.4 23.9 36 26.1l234.6 34.1c39.2 5.7 54.8 53.8 26.5 81.5L787 619.2a47.57 47.57 0 0 0-13.7 42.3l40.1 233.6c6.7 39-34.3 68.8-69.3 50.4L534.2 835.2c-13.9-7.3-30.5-7.3-44.5 0L280 945.5c-35 18.4-76-11.3-69.3-50.4l40.1-233.6c2.7-15.5-2.5-31.3-13.7-42.3L67.3 453.8c-28.4-27.6-12.7-75.8 26.5-81.5l234.6-34.1c15.6-2.3 29-12 36-26.1L469.2 99.6c17.5-35.5 68.1-35.5 85.6 0z"
        p-id="5485"
        stroke="black"
        stroke-width="80"
        :fill="isFavorite ? 'red' : 'white'"
      ></path>
    </svg>
  </div>
</template>