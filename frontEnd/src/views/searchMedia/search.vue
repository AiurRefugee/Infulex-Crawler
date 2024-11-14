<script setup>
import SearchView from "@/viewComponents/searchView.vue";
import { ref, computed, onMounted } from "vue";
import { layoutStore } from "@/stores/layout";
import searchItem from "./components/searchItem.vue";
import classButtonList from "@/components/common/classButtonList.vue";
import { tmdbApi } from "@/APIs/tmdbApi";

const store = layoutStore();
// 可以在组件中的任意位置访问 `store` 变量 ✨
const genres = computed(() => store.genres);
const size = computed(() => store.size);

const scrollArea = ref(null);
const searchText = ref("复仇者联盟 3");
const showTitle = ref(false);
const focused = ref(false);
const searchResult = ref([]); // 搜索结果

const toogleStyle = () => {
  showTitle.value = scrollArea.value.scrollTop > 35;
};

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

// 取消
const cancel = () => {
  searchText.value = "";
  store.setSearchFocused(false);
};

onMounted(() => {
  if (size.value == "small") {
    // store.setTabIconVisible(false)
  }
});
</script>
<template>
  <div class="w-full h-full flex flex-col flex-shrink-0">
    <!-- 顶部占位 -->
    <div class="bgLightPrimary trans center flex-shrink-0 h-[35px]">
      <text
        class="transSlow text-xl txtDarkPrimary"
        :style="{
          opacity: showTitle || focused ? '1' : '0',
        }"
        >搜索</text
      >
    </div>

    <div
      class="w-full h-full overflow-y-auto overflow-x-hidden bgLightPrimary"
      ref="scrollArea"
      @scroll="toogleStyle"
    >
      <h1
        class="searchTitle h-[45px] px-4 txtDarkPrimary trans"
        :style="{
          height: focused ? '0' : '',
        }"
      >
        搜索
      </h1>

      <div
        class="flex sticky top-0 z-[2000]"
        :style="{
          borderBottom: showTitle ? '1px solid #ccc' : 'none',
          // background: tabIconVisible ? '#e9e9e9' : 'white',
        }"
      >
        <div
          class="inputRow w-full h-[60px] pl-4 pt-[5px] pb-[15px] flex bgLightPrimary transSlow"
        >
          <div
            class="inputArea w-full px-2 flex items-center bg-gray-500 rounded-lg"
          >
            <img
              class="searchIcon h-[15px] fill-slate-200"
              src="@/assets/icons/search.svg"
            />
            <input
              v-model="searchText"
              class="w-full px-2 text-[1.2em] text-white"
              placeholder="电影，剧集"
              @focus="focused = true"
              @input="search"
              @keydown.enter="search"
            />
          </div>
          <text
            :style="{
              width: focused ? '50px' : '0',
            }"
            class="center whitespace-nowrap text-red-600 overflow-hidden trans cursor-pointer"
            @click="focused = false"
            >取消</text
          >
        </div>
        <div class="w-4"></div>
      </div>

      <!-- 按类别浏览 -->
      <div class="w-full h-full px-4" v-if="!focused">
        <div class="text-xl h-10 flex self-start txtDarkPrimary">
          <h1>按类别浏览</h1>
        </div>
        <div class="buttonGrid w-full h-full">
          <classButtonList class="searchGenre"/>
        </div>
        <div class="h-[20vh]"></div>
      </div>

      <!-- 搜索结果 -->
      <div
        class="searchResult w-full h-full"
        v-if="searchResult.length && searchText"
      >
        <ul>
          <li v-for="item in searchResult" :key="item.id">
            <searchItem :data="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
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
  // grid-template-rows: repeat(auto-fill, 15vh);
  grid-gap: 20px;
  button {
    width: 100% !important;
  }
  @media (width <=1440px) {
    grid-template-columns: repeat($gridNumBase, 1fr);
  }

  @media (width <=720px) {
    grid-template-columns: repeat($gridNumSmall, 1fr);
    gap: 15px;
  }
} 
.inputRow {
  // width: calc(100% - 1rem);
}
// .cardsWrapper {
//   display: grid;
//   grid-template-columns: repeat(var(--search_genre_card_num), 1fr);
//   grid-template-rows: ;
// }
</style>