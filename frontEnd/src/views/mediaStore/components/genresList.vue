<script setup>
import classButtonList from "@/components/common/classButtonList.vue";
</script>
<template>
  <div ref="listWrap" class="genreWrapper">
    <div class="genreTitle w-full px-4 flex txtDarkSecondary">
      <h1 class="text-xl font-bold py-2">影片类型</h1>
    </div>
    <div ref="list" class="genreList w-full flex pl-4 gap-4 overflow-auto hideScroll">
      <classButtonList />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
::-webkit-scrollbar {
  display: none;
}
.genreWrapper {
  margin-bottom: 1.5rem;
  @media (width < 500px) {
    margin-bottom: 1rem;
  }
}
.genreList {
  height: min(15vh, 120px);
}
</style>