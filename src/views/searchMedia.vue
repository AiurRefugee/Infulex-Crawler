<script setup>
import SearchView from "@/viewComponents/searchView.vue";
import { ref, computed, onMounted } from "vue";
import { layoutStore } from "@/stores/layout";
import ClassButton from "@/components/ClassButton.vue";
const store = layoutStore();

// 可以在组件中的任意位置访问 `store` 变量 ✨
const genres = computed(() => store.genres);
</script>
<template>
  <SearchView>
    <div class="w-full flex flex-col items-center">
      <div class="text-xl h-10 flex self-start txtDark_Primary">
        <h1>按类别浏览</h1>
      </div>
      <div class="cardsWrapper w-full flex flex-wrap">
        <ClassButton :tag="genre" v-for="genre in genres" :key="genre.id" :genreClass="'searchClassButton'"/>
      </div>
    </div>
  </SearchView>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
*::-webkit-scrollbar {
  display: none;
}
// .cardsWrapper { 
//   display: grid; 
//   grid-template-columns: repeat(var(--searchGenreCardNum), 1fr);
//   grid-template-rows: ;
// }
</style>