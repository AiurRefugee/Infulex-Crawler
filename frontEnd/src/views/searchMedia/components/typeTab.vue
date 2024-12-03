<script setup>
const mediaType = defineModel("mediaType");
const select = (type) => {
    console.log('select', mediaType.value)
    mediaType.value = type;
}
</script>
<template>
  <div class="flex min-w-32 bg-light-100 center relative text-white rounded-[5px] overflow-hidden"> 
      <div class="selected absolute trans z-0" :class="mediaType == 'movie' ? 'left' : 'right'"></div>
      <text class="w-1/2 center absolute left-0 z-10" @click="select('movie')">电影</text>
      <text class="w-1/2 center absolute right-0 z-10" @click="select('tv')">剧集</text>
  </div>
</template>
<style scoped lang="scss">
$space: 3px;
.selected {
  width: calc(50% - $space * 2);
  height: calc(100% - $space * 2);
  border-radius: 5px;
  background-color: #ed7b2f;
}
.left {
  left: $space;
} 
.right {
  transform: translate(50%, 0);
}
</style>