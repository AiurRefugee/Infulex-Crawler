<script setup>
import { useRouter, useRoute } from "vue-router";
import { useTaskStore } from "@/stores/tasks";
import { genres } from '@/config/genre'

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

const mapGenre = (genreIds) => {
  const ids = genreIds.filter((id) => genres[id + '']?.name)
  return ids.map(id => genres[id + '']?.name).join(', ')
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
      class="w-full h-full hasDivider relative"
    >
      <div class="flex h-[2.2em] justify-between items-center gap-4 overflow-hidden">
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
        class="w-full flex absolute bottom-2 justify-between gap-6 opacity-60 txtDarkSecondary"
      >
        <span>{{ data?.first_air_date || data?.release_date }}</span>
        <span>{{ mapGenre(data.genre_ids) }}</span>
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
  -webkit-line-clamp: 4;
  /* height: 6em; */ 
  font-size: 1em;
  line-height: 1.5em;
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
    // -webkit-line-clamp: 3;
  }
}
</style>