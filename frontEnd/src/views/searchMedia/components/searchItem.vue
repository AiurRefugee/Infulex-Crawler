<script setup>
import { useRouter, useRoute } from "vue-router";
import { useTaskStore } from "@/stores/tasks";
import { genres } from '@/config/genre'
import { ref } from "vue";
const imageSrcPrefix = "https://image.tmdb.org/t/p/original";
const route = useRoute();
const router = useRouter();
const tasks = useTaskStore();
const loading = ref(true)
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
        :class="loading ? 'hidden' : ''"
        :src="imageSrcPrefix + data.poster_path"
        alt="image"
        class="imageArea h-full mr-4 object-cover rounded-lg"
        @load="loading = false"
      />
      <div class="imageArea h-full center mr-4 object-cover rounded-lg" v-if="loading">
        <svg viewBox="0 0 1024 1024" class="w-2/3 aspect-square">
          <path
            d="M870.4 12.8H153.6A140.9024 140.9024 0 0 0 12.8 153.6v716.8A140.9024 140.9024 0 0 0 153.6 1011.2h504.2688a38.4 38.4 0 0 0 0-76.8H153.6c-35.2768 0-64-28.7232-64-64V374.1696h844.8V870.4c0 35.2768-28.7232 64-64 64h-11.4688a38.4 38.4 0 0 0 0 76.8H870.4A140.9024 140.9024 0 0 0 1011.2 870.4V153.6A140.9024 140.9024 0 0 0 870.4 12.8zM474.8288 291.2256L273.2544 89.6h301.0048l207.7184 207.7696H478.9248c-1.3824-2.0992-2.304-4.352-4.096-6.144zM89.6 153.6c0-35.2768 28.7232-64 64-64h11.0592l207.7184 207.7696H89.6V153.6z m798.9248 143.7696c-1.3824-2.048-2.2528-4.352-4.096-6.144L682.8544 89.6H870.4c35.2768 0 64 28.7232 64 64v143.7696h-45.8752z"
            fill="rgb(123, 123, 123)" p-id="8941"></path>
          <path
            d="M419.5328 441.856a70.2464 70.2464 0 0 0-70.9632-0.0512c-22.2208 12.8512-35.4816 35.84-35.4816 61.4912v297.1648c0 25.7024 13.2608 48.64 35.4816 61.4912 11.1104 6.4 23.296 9.6256 35.4304 9.6256s24.3712-3.2256 35.4816-9.6256l257.3312-148.5824a70.144 70.144 0 0 0 35.4816-61.44 70.144 70.144 0 0 0-35.4816-61.3888L419.5328 441.856z m-29.6448 348.5184v-276.9408l239.7696 138.496-239.7696 138.4448z"
            fill="rgb(123, 123, 123)" p-id="8942"></path>
        </svg>
      </div>
      
    <div
      class="w-full h-full hasDivider relative"
    >
      <div class="flex h-[2.2em] justify-between items-center gap-4 overflow-hidden">
        <h1
          class="title text-[1.3em] overflow-hidden whitespace-nowrap text-ellipsis txtDarkPrimary"
        >
          {{ data?.name || data?.title }}
        </h1>
        <a
          id="addTaskBtn"
          class=" text-orange-500 whitespace-nowrap cursor-pointer"
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