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
    <div class="w-full">
      <div class="text-xl h-10 flex items-center">
        <h1>按类别浏览</h1>
      </div>
      <div class="flex w-full flex-wrap">
        <div
            class="genreCard p-3"
            v-for="genre in genres" 
            :key="genre.id"
        >
            <div class="h-full w-full bg-red-400 rounded-lg flex justify-center items-center text-3xl font-bold">
                {{ genre.name }}
            </div>
        </div>
      </div>
    </div>
  </SearchView>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
.genreCard {
    width: calc(100% / var(--searchGenreCardNum));
    aspect-ratio: 3 / 1;
    border-radius: 1.5rem;  
}
</style>