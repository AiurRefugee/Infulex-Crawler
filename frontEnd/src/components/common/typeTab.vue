<script setup>
const mediaType = defineModel("mediaType");
const select = (type) => {
    console.log('select', mediaType.value)
    mediaType.value = type;
}
</script>
<template>
  <div class="flex min-w-48 bg-light-400 center relative text-white rounded-[8px] overflow-hidden cursor-pointer"> 
      <div class="selected absolute trans z-0" :class="mediaType == 'movie' ? 'selectLeft' : 'selectRight'"></div>
      <text class="w-1/2 center absolute left-0 z-10" @click="select('movie')">电影</text>
      <text class="w-1/2 center absolute right-0 z-10" @click="select('tv')">剧集</text>
  </div>
</template>
<style scoped lang="scss">
$space: 3px;
.selected {
  width: calc(50% - $space * 2);
  height: calc(100% - $space * 2);
  border-radius: 6px;
  background-color: #ed7b2f;
}
.selectLeft {
  left: $space;
} 
.selectRight {
  transform: translate(50%, 0);
}
</style>