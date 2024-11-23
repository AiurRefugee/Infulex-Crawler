<script setup>
const props = defineProps({
  files: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>
<template>
  <p v-for="file in files" :key="file">
    <div class="center">
        <img src="@/assets/icons/fileIcon.svg" alt="file" v-if="file?.type == 'folder'"/>
        <img src="@/assets/icons/play.svg" alt="video" v-if="file?.type == 'file'"/>
    </div>
    <p class="title my-1 text-center overflow-hidden text-ellipsis px-2">{{ file?.name }}</p>
  </p>
</template>
<style lang="scss" scoped>
img {
    width: 100px;
    aspect-ratio: 1;
    cursor: pointer;
}
.title {
  line-height: 1em;
  height: 2em;
  -webkit-line-clamp: 2;
}
</style>