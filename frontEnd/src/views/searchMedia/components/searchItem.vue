<script setup>
import { useRouter, useRoute } from "vue-router";
import { useTaskStore } from "@/stores/tasks";

const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
const route = useRoute();
const router = useRouter();
const tasks = useTaskStore();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const createTask = () => {
  const media = props.data;
  const mediaType = media.media_type;
  const posterPath = media.poster_path;
  tasks.createTask(media, mediaType, posterPath);
};

const toDetail = () => {
  console.log("toDetail");
  const media = props.data;
  const mediaType = props.data.media_type; 
  const title = media.title || media.name
  const time = media.release_date || media.first_air_date
  router.push({
    path: '/mediaDetail/' + title,
    query: {
      id: media?.id,
      media_type: media?.media_type,
    },
  })
}

const handleClick = (event) => {
  const target = event.target;
  if (target.id === "addTaskBtn") {
    
  } else {
    toDetail()
  }
}
</script>
<template>
  <div class="searchItem w-full h-[12em] flex px-4 py-2 mb-2" @click="handleClick">
      <img
        :src="imageSrcPrefix + data.poster_path"
        alt="image"
        class="imageArea h-full mr-4 object-cover rounded-lg"
      />

    <div
      class="w-full h-full pr-2 hasDivider"
    >
      <div class="flex h-[3em] justify-between items-center gap-4 overflow-hidden">
        <h1
          class="title text-[1.5em] overflow-hidden whitespace-nowrap text-ellipsis txtDarkPrimary"
        >
          {{ data?.name || data?.title }}
        </h1>
        <a
          id="addTaskBtn"
          class=" text-orange-500 text-[1.2em] whitespace-nowrap cursor-pointer"
          @click="createTask"
          >添加任务</a
        >
      </div>

      <p class="overview h-[6em] txtDarkSecondary">{{ data.overview }}</p>

      <p
        class="w-full h-[1em] flex justify-between gap-6 opacity-60 txtDarkSecondary"
      >
        <span>{{ data?.first_air_date || data?.release_date }}</span>
        <span>{{ data.genre_ids }}</span>
      </p>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '@/style/variables.scss';
.imageArea {
  height: 100%;
  aspect-ratio: 2 / 3;
  box-shadow: $videoCardBasicBoxShadow;
}
.overview {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-height: 1.5em;
  /* height: 6em; */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hasDivider {
  border-bottom: 1px solid var(--dividerBg);
}
@media (width <= 500px) or (height <= 500px) {
  .searchItem {
    font-size: 12px;
  }
  .title {
    max-width: 180px;
  }
  .overview {
    margin: 0.5em 0;
    height: 4.5em;
    -webkit-line-clamp: 3;
  }
}
</style>