<script setup>
import classButtonList from "@/components/common/classButtonList.vue";
</script>
<template>
  <div ref="listWrap" class="genreWrapper">
    <div class="genreTitle w-full px-4 mb-2 flex txtDarkSecondary">
      <h1 class="listTitle text-xl font-bold">影片类型</h1>
    </div>
    <div ref="list" class="genreList w-full flex pl-4 overflow-auto hideScroll">
      <classButtonList />
    </div>
  </div>
</template>
<style lang="scss">
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
  height: max(12vh, 150px);
}
.genreList > * {
  width: calc(100vw / var(--genreNum));
  margin-right: 1rem;
}
</style>