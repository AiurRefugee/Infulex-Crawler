<script setup>
import SearchView from "@/viewComponents/searchView.vue";
import { ref, computed, onMounted } from "vue";
import { layoutStore } from "@/stores/layout";
import searchItem from "./components/searchItem.vue";
import classButtonList from "@/components/common/classButtonList.vue";
import { tmdbApi } from "@/apis/tmdbApi";

const layout = layoutStore();
const showTab = computed(() => layout.showTab); 
// 可以在组件中的任意位置访问 `layout` 变量 ✨
const genres = computed(() => layout.genres);
const size = computed(() => layout.size);

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
  layout.setSearchFocused(false);
};

const handleFocus = () => {
  focused.value = true;
  layout.setTabIconVisible(false)
}

const handleBlur = () => {
  focused.value = false;
  layout.setTabIconVisible(true)
}

onMounted(() => {
  if (size.value == "small") {
    // layout.setTabIconVisible(false)
  }
});
</script>
<template>
  <div class="w-full h-full bg-light-800 trans">
    <!-- 顶部占位 -->
    <div 
      class=" trans center flex-shrink-0"
      :style="{height: focused ? '0' : '35px',}"
    >
      <text
        class="transSlow text-xl txtDarkPrimary"
        :style="{
          opacity: showTitle ? '1' : '0',
        }"
        >搜索</text
      >
    </div>

    <div
      :class="focused ? 'bg-light-700' : ''"
      class="w-full h-full overflow-y-auto overflow-x-hidden"
      ref="scrollArea"
      @scroll="toogleStyle"
    >
      <h1
        class="searchTitle h-[45px] px-4 text-dark-800 trans"
        :style="{
          transform: focused ? 'translateY(-100%)' : '',
          height: focused ? '0' : '',
        }"
      >
        搜索
      </h1>

      <div
        :class="showTitle || focused ? 'showBorderB' : ''"
        class="flex sticky top-0 z-[2000]"
        :style="{
          // background: tabIconVisible ? '#e9e9e9' : 'white',
        }"
      >
        <div
          class="inputRow w-full h-[60px] pl-4 py-3 flex transSlow bg-light-800"
        >
          <div
            class="inputArea bg-light-700 w-full px-2 flex items-center rounded-lg"
          >
            <img
              class="searchIcon h-[15px] fill-slate-200"
              src="@/assets/icons/search.svg"
            />
            <input
              v-model="searchText"
              class="w-full px-2 text-[1.2em] text-white"
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
            class="center whitespace-nowrap text-red-600 overflow-hidden trans cursor-pointer"
            @click="handleBlur"
            >取消</text
          >
        </div>
        <div class="w-4 bg-light-800"></div>
      </div>

      <!-- 按类别浏览 -->
      <div 
        class="w-full h-full px-4 trans" 
        v-if="!focused"
      >
        <div class="text-xl h-10 flex self-start txtDarkPrimary">
          <h1>按类别浏览</h1>
        </div>
        <div class="buttonGrid">
          <classButtonList class="searchGenre"/>
        </div>
        <div class="h-[20vh]"></div>
      </div>

      <!-- 搜索结果 -->
      <div
        :class="focused ? 'bg-light-700' : ''"
        class="searchResult w-full h-full"
        v-if="focused && searchResult.length && searchText"
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
.showBorderB {
  border-bottom: 1px solid rgba(128, 128, 128, 0.4) ;
}
.searchTitle {
  font-size: 2em;
  font-weight: bold;
}

$gridNumLarge: 5;
$gridNumBase: 3;
$gridNumSmall: 2;

.buttonGrid {
  display: grid;
  --gridHeight: max(15vh, 120px);
  grid-template-columns: repeat($gridNumLarge, 1fr);
  grid-template-rows: repeat(4, var(--gridHeight));
  // grid-template-rows: repeat(auto-fill, 15vh);
  grid-gap: 20px;
  button {
    width: 100% !important;
  }
  @media (width <=1440px) {
    grid-template-columns: repeat($gridNumBase, 1fr);
    grid-template-rows: repeat(6, var(--gridHeight));
  }

  @media (width <=720px) {
    grid-template-columns: repeat($gridNumSmall, 1fr);
    grid-template-rows: repeat(9, var(--gridHeight));
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