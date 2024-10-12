<script setup>
import liItem from "@/components/common/liItem.vue";
const imgPrefix = "https://image.tmdb.org/t/p/original";
const props = defineProps({
  task: Object,
  required: true,
});
</script>
<template>
  <liItem :liClassName = '"h-[10vh]"'>
    <template v-slot:content>
      <div class="taskOverview h-[10vh]">
        <div class="w-full h-full flex">
          <!-- poster -->
          <div class="poster h-full aspect-square">
            <img
              :src="imgPrefix + task.poster_path"
              alt="poster"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
          <!-- overview -->
          <div class="overview ml-4 flex flex-col justify-between">
            <div class="title">
              <h1 class="text-xl font-bold">{{ task.title }}</h1>
            </div>
            <div class="description">
              <p>{{ task.msgs }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </liItem>
</template>
<style scoped lang="scss">

</style>