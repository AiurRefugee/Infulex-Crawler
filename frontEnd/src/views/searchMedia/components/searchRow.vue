<script setup>
import { ref, computed, inject, watch, nextTick } from "vue";
import { layoutStore } from "@/stores/layout";
import { tmdbApi } from "@/apis/tmdbApi";

const layout = layoutStore();
const focused = defineModel("focused");

const scrollTop = inject("scrollTop");

const size = computed(() => layout.size);
const searchText = defineModel("searchText");
const searchResult = defineModel("searchResult");

const queryParam = {
  page: 0,
  language: 'zh-CN'
}
const windowHeight = window.innerHeight

let maxHeight = windowHeight, total_pages = 1, canSearch = true

const calHeight = () => {
    maxHeight = document.getElementsByClassName('searchResult')[0].scrollHeight
    console.log(maxHeight)
}

/* 
搜索tmdb 
*/
const search = async (clear = true) => {
  console.log("search", searchText.value, clear); 
  if (!canSearch || queryParam.page >= total_pages || !searchText.value) {
    return;
  }
  canSearch = false
  queryParam.page += 1;
  tmdbApi.searchMulti(searchText.value, queryParam).then((res) => {
    total_pages = res.total_pages;
    if (clear) {
      searchResult.value = res.results
      canSearch = true
    } else {
      searchResult.value = searchResult.value.concat(res.results);
      setTimeout( () => { 
        canSearch = true 
      }, 1000)
    } 
    setTimeout(calHeight, 500)
  });
};

const handleFocus = () => {
  focused.value = true;
  if (layout.size == "small") {
    layout.setTabIconVisible(false);
  }
  if (layout.showTab == false) {
    layout.setTabIconVisible(false);
  }
  searchResult.value = [];
};

const handleBlur = () => {
  focused.value = false;
  searchResult.value = [];
  if (layout.size == "small") {
    setTimeout(() => layout.setTabIconVisible(true), 200);
  }
  if (layout.showTab == false) {
    layout.setTabIconVisible(true);
  }
};

watch(searchText, async (newVal, oldVal) => {
  console.log("searchText", newVal, oldVal);
  searchResult.value = [];
  queryParam.page = 0;
  total_pages = 1
  search() 
})

watch(scrollTop, async (newVal) => { 
    await nextTick()
    if (newVal + windowHeight > maxHeight - windowHeight / 3) {
        search(false)
    }
})
</script>
<template>
  <div
    :class="[
      // showTitle || focused ? 'showBorderB' : 'hideBorderB',
      focused ? 'bg-light-700 pt-2' : 'bg-light-900',
    ]"
    class="flex top-0 z-[100]"
  >
    <div class="inputRow w-full pl-4 flex transSlow">
      <div
        class="inputArea bg-light-500 w-full px-2 flex items-center rounded-lg"
      >
        <img
          class="searchIcon h-[15px] fill-slate-200"
          src="@/assets/icons/search.svg"
        />
        <input
          v-model="searchText"
          class="w-full px-2 h-[1.6em] text-[1.2em] text-white"
          placeholder="电影，剧集"
          @focus="handleFocus" 
        />
      </div>
      <text
        :style="{
          width: focused ? '50px' : '0',
        }"
        class="center mx-2 whitespace-nowrap text-red-600 overflow-hidden trans cursor-pointer"
        @click="handleBlur"
        >取消</text
      >
    </div>
  </div>
</template>
<style>
.hideBorderB {
  border-bottom: 1px solid transparent;
}
</style>