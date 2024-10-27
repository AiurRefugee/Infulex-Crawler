<script setup>
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import { layoutStore } from "@/stores/layout"; 
const store = layoutStore();

// 可以在组件中的任意位置访问 `store` 变量 ✨
const genres = computed(() => store.genres);

let transHeight, leftSpace;

const showAll = ref(false);
const listWrap = ref(null);
const list = ref(null);

onMounted(async () => {});
</script>
<template>
  <div ref="listWrap" class="genreWrapper">
    <div class="genreTitle w-full px-4 flex txtDarkSecondary">
      <h1 class="text-xl font-bold py-2">影片类型</h1> 
    </div>  
    <div ref="list" class="w-full flex pl-4 gap-3 overflow-auto">
      <div class="browseClassButton browseButtonSize rounded-lg center" v-for="tag in genres" :key="tag">
        <text>{{ tag?.name }}</text>
      </div> 
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss"; 
//浏览页class button
.browseButtonSize {
    width: calc(100% / var(--genreNum));
    aspect-ratio: 10/5;
}
.browseClassButton { 
  flex-shrink: 0;
  color: white;
  font-size: 2em;
  // letter-spacing: 1em;
  text-align: center;
  font-weight: bold;
  letter-spacing: 10px;
  font-size: var(--genreFontSize);
  background: linear-gradient(to right, rgba(214, 55, 34, 0.7) 0, rgba(130, 22, 126, 0.7) 100%);
}

</style>