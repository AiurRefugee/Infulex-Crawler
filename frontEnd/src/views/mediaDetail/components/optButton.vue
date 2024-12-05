<script setup>
import { ref, onMounted, computed, nextTick, inject } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { tmdbImgPrefix } from "@/config/tmdbConfig";
import { mediasApi } from "@/apis/medias";
const media = inject("media");
const mediaType = inject("mediaType");
const tvDetail = inject("tvDetail");
const backdropUrl = inject("backdropUrl");
const isFavorite = inject("isFavorite");
const taskStore = useTaskStore();
const detail = computed(() =>
  mediaType.value === "movie" ? media.value : tvDetail.value
);

const toggleFavorite = () => {
  if (isFavorite.value) {
    mediasApi.removeFavorite(detail.value.id, mediaType.value).then((res) => {
      isFavorite.value = false;
    });
  } else {
    mediasApi.addToFavorite(detail.value, mediaType.value).then((res) => {
      isFavorite.value = true;
    });
  }
};

const createTask = () => {
  const title = detail.value?.title || detail.value?.name; 
  taskStore.createTask(mediaType.value,  detail.value.id, title, backdropUrl.value);
};

onMounted(async () => {
  // await nextTick()
  // findFavorite()
});
</script>
<template>
  <div class="px-4">
    <!-- <addFavorite ref="addFavoriteRef" @setIsFavorite="setIsFavorite" /> -->
    <div class="h-full flex gap-3 flex-shrink-0">
      <button
        class="w-full playOpt h-full text-[1.1em] tracking-wider bg-orange-500 text-white rounded-[10px]"
        @click="createTask"
      >
        添加任务
      </button>
      <button
        class="h-full aspect-square favorite center rounded-[10px]"
        @click="toggleFavorite"
      >
        <svg class="icon w-1/2" viewBox="0 0 1024 1024">
          <path
            class="fastTrans"
            d="M554.8 99.6l104.9 212.5c7 14.1 20.4 23.9 36 26.1l234.6 34.1c39.2 5.7 54.8 53.8 26.5 81.5L787 619.2a47.57 47.57 0 0 0-13.7 42.3l40.1 233.6c6.7 39-34.3 68.8-69.3 50.4L534.2 835.2c-13.9-7.3-30.5-7.3-44.5 0L280 945.5c-35 18.4-76-11.3-69.3-50.4l40.1-233.6c2.7-15.5-2.5-31.3-13.7-42.3L67.3 453.8c-28.4-27.6-12.7-75.8 26.5-81.5l234.6-34.1c15.6-2.3 29-12 36-26.1L469.2 99.6c17.5-35.5 68.1-35.5 85.6 0z"
            p-id="5485"
            :fill="isFavorite ? 'rgb(249 115 22)' : 'white'"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.playOpt {
  box-shadow: 0 0 5px 0px #444444b8;
}

.favorite {
  //   border: 2px solid orange;
  background: rgba(188, 188, 188, 0.455);
}

.taskBtn {
  background: rgb(192, 192, 192);
}
</style>