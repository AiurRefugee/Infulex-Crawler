<script setup> 
import { ref, onMounted, computed, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const media = inject("media");
const mediaType = inject("mediaType");
const tvDetail = inject("tvDetail");

const mediaDetail = computed(() => {
  if (mediaType.value === "movie") {
    return media.value;
  } else {
    return tvDetail.value;
  }
})

const routeToImageWall = () => {
  router.push({
    name: "imageWall",
    query: {
      mediaId: mediaDetail.value.id,
      mediaType: mediaType.value,
      title: mediaDetail.value?.title || mediaDetail.value?.name,
    },
  });
}

onMounted(async () => {

});
</script>
<template>
  <div class="actionItem" @click="routeToImageWall">
    <text>更多照片</text>
    <svg class="icon h-[18px] aspect-square" viewBox="0 0 1024 1024">
      <path
        d="M896 160H128c-17.67 0-32 14.33-32 32v640c0 17.67 14.33 32 32 32h768c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32z m-32 64v472.01l-227.2-170.4c-16.97-12.72-40.62-12.72-57.59 0l-98.58 73.92L349.2 494.39c-16.47-13.19-39.27-14.19-56.81-2.39L160 581.02V224h704zM160 800V658.16l158.36-106.48 161.02 128.8L608 584l256 192v24H160z"
        fill="#ffffff"
        p-id="4600"
      ></path>
      <path
        d="M704 480c52.94 0 96-43.06 96-96s-43.06-96-96-96-96 43.06-96 96 43.06 96 96 96z m0-128c17.64 0 32 14.36 32 32s-14.36 32-32 32-32-14.36-32-32 14.36-32 32-32z"
        fill="#ffffff"
        p-id="4601"
      ></path>
    </svg>
  </div>
</template>