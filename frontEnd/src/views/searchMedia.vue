<script setup>
import SearchView from "@/viewComponents/searchView.vue";
import { ref, computed, onMounted } from "vue"; 
import { layoutStore } from "@/stores/layout";

import { tmdbApi } from '@/APIs/tmdbApi'

const store = layoutStore();
// 可以在组件中的任意位置访问 `store` 变量 ✨
const genres = computed(() => store.genres);

const scrollArea = ref(null)
const searchText = ref('暗夜')
const focus = ref(false)
const showTitle = ref(false)
const searchResult = ref([]) // 搜索结果

const toogleStyle = () => {
  console.log(scrollArea.value.scrollTop)
  showTitle.value = scrollArea.value.scrollTop > 80
}

/* 
搜索tmdb 
*/
const search = async () => {
  tmdbApi.searchMulti(searchText.value)
    .then( res => {
      searchResult.value = res?.results
    })
}

</script>
<template>
  <div class="w-full h-full flex flex-col">
    <!-- 顶部占位 -->
    <div class="bg-white trans center flex-shrink-0" :style="{ height: focus ? '0' : '30px' }">
      <text class="transSlow self-end" :style="{
        opacity: showTitle ? '1' : '0'
      }">搜索</text>
    </div>

    <div class="w-full h-full px-4 overflow-auto" ref="scrollArea" @scroll="toogleStyle">
      <h1 class="searchTitle" :style="{ height: focus ? '0' : '50px' }">搜索</h1>

      <div class="inputRow w-full h-[48px] py-[8px] flex sticky top-0 bg-white">
        <div class="inputArea w-full px-2 flex items-center bg-gray-300 rounded-lg ">
          <img class="searchIcon h-[15px] fill-slate-200" src="@/assets/icons/search.svg">
          <input 
            v-model="searchText" 
            class="w-full px-2 text-[1.2em] text-white" placeholder="电影，剧集"
            @focus="focus = true" 
            @change="search"
          />
        </div>
        <text :style="{
          width: focus ? '50px' : '0'
        }" class="center whitespace-nowrap text-red-600 overflow-hidden trans" @click="focus = false">取消</text>
      </div>

      <!-- 按类别浏览 -->
      <div class="w-full h-full" v-if="!focus">
        <div class="text-xl h-10 flex self-start txtDark_Primary">
          <h1>按类别浏览</h1>
        </div>
        <div class="buttonGrid w-full h-full">
          <div class="browseClassButton center h-[15vh]" :style="{ background: genre.background }"
            v-for="genre in genres" :key="genre.id">
            <text>{{ genre.name }}</text>
          </div>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div class="w-full h-full" v-if="searchResult">
        <ul>
          <li v-for="item in searchResult" :key="item.id">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";

.searchTitle {
  font-size: 2em;
  font-weight: bold;
}

$gridNumLarge: 5;
$gridNumBase: 3;
$gridNumSmall: 2;

.buttonGrid {
  display: grid;
  grid-template-columns: repeat($gridNumLarge, 1fr);
  grid-template-rows: repeat(auto-fill, 15vh);
  grid-gap: 25px;

  @media (width <=1440px) {
    grid-template-columns: repeat($gridNumBase, 1fr);
  }

  @media (width <=720px) {
    grid-template-columns: repeat($gridNumSmall, 1fr);
  }
}

// .cardsWrapper { 
//   display: grid; 
//   grid-template-columns: repeat(var(--searchGenreCardNum), 1fr);
//   grid-template-rows: ;
// }</style>