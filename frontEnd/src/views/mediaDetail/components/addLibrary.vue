<script setup>
import { ref, onMounted, computed, watch, inject } from "vue";
import useFavoriteToggle from "../composables/library";

const media = inject("media");
const mediaType = inject("mediaType");
const tvDetail = inject("tvDetail");

const { mediaDetail, inLibrary, toggleLibrary } = useFavoriteToggle(
  media,
  mediaType,
  tvDetail
);
</script>
<template>
  <div class="actionItem" @click="toggleLibrary">
    <text class="text-red-500" v-if="inLibrary">从资料库移除</text>
    <text v-else>添加到资料库</text>
    <svg class="icon h-[15px] aspect-square" viewBox="0 0 1024 1024">
      <path
        d="M170.666667 469.333333h682.666666v85.333334H170.666667z"
        fill="red"
        p-id="23745"
        v-if="inLibrary"
      ></path>
      <path
        d="M874.666667 576a64 64 0 0 0 0-128h-298.666667v-298.666667a64 64 0 0 0-128 0v298.666667h-298.666667a64 64 0 0 0 0 128h298.666667v298.666667a64 64 0 0 0 128 0v-298.666667h298.666667z"
        fill="var(--bg_dark_primary)"
        p-id="4255"
        v-else
      ></path>
    </svg> 
  </div>
</template>