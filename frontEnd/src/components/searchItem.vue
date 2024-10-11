<script setup>
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";

import { taskStore } from "@/stores/tasks";

const tasks = taskStore();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});


const crawlKeyWord = () => {
  const {
    name,
    title,
    original_name
  } = props.data
  const keyword = name || title
  const keywordObj = {
    title: keyword, 
    original_title: original_name || keyword
  }
  tasks.createTask(keywordObj)
}

</script>
<template>
  <div class="searchItem w-full h-[20vh] flex pl-4 py-2">
    <div class="imageArea">
      <img
        :src="imageSrcPrefix + data.poster_path"
        alt="image"
        class="h-full object-cover rounded-lg flex-shrink-0"
      />
    </div>
    <div class="infoArea w-full flex flex-col border-b-[1px] border-gray-200">
      <div class="w-full h-full flex flex-col justify-between pr-2">
        <div class="flex justify-between">
            <h1 
              class="title text-[1.1em] overflow-hidden whitespace-nowrap text-ellipsis"
            >{{ data?.name || data?.title }}</h1>
            <a class="text-orange-500 whitespace-nowrap cursor-pointer" @click="crawlKeyWord">添加任务</a>
        </div>
        <p class="overview">{{ data.overview }}</p>
        <p class="w-full h-[25px] flex justify-between gap-6 opacity-50 text-[0.9em]">
          <span>{{ data?.first_air_date || data?.release_date }}</span>
          <span>{{ data.genre_ids }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.imageArea {
  height: 95%;
  aspect-ratio: 3 / 4;
}
.overview {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (width <=726px) {
    .title {
        max-width: 150px;
    }
    .overview {
        -webkit-line-clamp: 2;
    }
}
</style>