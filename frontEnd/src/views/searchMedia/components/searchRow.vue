<script setup>
import { ref, computed, inject } from "vue";
import { layoutStore } from "@/stores/layout";
import { tmdbApi } from "@/apis/tmdbApi";

const layout = layoutStore();
const focused = defineModel("focused");

const showTitle = inject("showTitle");

const size = computed(() => layout.size);
const searchText = defineModel("searchText");
const searchResult = defineModel("searchResult");
/* 
搜索tmdb 
*/
const search = async () => {
  if (searchText.value == "") {
    searchResult.value = [];
  }
  tmdbApi.searchMulti(searchText.value).then((res) => {
    searchResult.value = res?.results;
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
          @input="search"
          @keydown.enter="search"
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