<script setup>
import { inject } from 'vue';

const props = defineProps({
  files: {
    type: Array,
    required: true,
    default: () => [],
  },
  handleClick: {
    type: Function,
    default: (e) => { console.log(e) },
  }
}); 

const clickFile = (file) =>{ 
  props?.handleClick(file) 
}
</script>
<template>
  <div class="filesArea w-full text-dark-800">
    <div v-for="file in files" :key="file" @click="clickFile(file)">
      <div class="center">
        <img src="@/assets/icons/fileIcon.svg" alt="file" v-if="file?.type == 'folder'" />
        <img src="@/assets/icons/play.svg" alt="video" v-if="file?.type == 'file'" />
      </div>
      <div class="w-4/5 center m-auto">
        <p class="title my-1 text-center overflow-hidden text-ellipsis px-2">{{ file?.name }}</p>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
img {
  width: 100px;
  aspect-ratio: 1;
  cursor: pointer;
}

.title {
  $line-height: 1.2em;
  line-height: $line-height;
  height: $line-height * 2;
  -webkit-line-clamp: 2;
}

.filesArea {
  display: grid;
  gap: 10px 0;
  // flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: space-around;
}
</style>