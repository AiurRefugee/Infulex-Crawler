<script setup>
import SearchView from "@/viewComponents/searchView.vue";
import { ref, computed, inject, onMounted, watch } from "vue";
import { layoutStore } from "@/stores/layout";
import searchRow from "./components/searchRow.vue";
import scrollView from "@/viewComponents/scrollView.vue";
import classButtonList from "@/components/common/classButtonList.vue";
import searchItem from "./components/searchItem.vue";
import ScrollHeader from "@/components/common/scrollHeader.vue";

const layout = layoutStore();

const showTab = computed(() => layout.showTab);
const genres = computed(() => layout.genres);
const size = computed(() => layout.size);

const showTitle = inject('showTitle') 

const scrollArea = ref(null);
const searchText = ref("复仇者联盟 3");
const focused = ref(false);
const searchResult = ref([]); // 搜索结果
const scrollTop = ref(0);
const titleHeight = ref(80)

const toogleStyle = () => {
  showTitle.value = scrollArea.value.scrollTop > 35;
};

watch(scrollTop, (newVal) => {
  console.log('scrollTop', newVal);
})




onMounted(() => {
  layout.setTabIconVisible(true)
});
</script>
<template>
  <scrollView class="bg-light-900" v-model:scrollTopModel="scrollTop"> 
    <template #header>
      <ScrollHeader class="h-[45px]" v-if="!focused">
        <template v-slot:center>
          <h1 class="txtDarkPrimary select-none text-xl font-bold">搜索</h1>
        </template>
      </ScrollHeader> 
    </template>
    <template #content>   
      <h1 class="pageTitle pb-2 flex items-center bottom-0 px-4 text-dark-800 trans" v-if="!focused">搜索</h1>
 
      <searchRow v-model:searchResult="searchResult" v-model:searchText="searchText" v-model:focused="focused" />
      <!-- 按类别浏览 -->
      <div class="w-full h-full px-4 trans" v-if="!focused">
        <div class="text-xl h-10 flex self-start txtDarkPrimary">
          <h1>按类别浏览</h1>
        </div>
        
        <div class="buttonGrid">
          <classButtonList class="searchGenre" />
        </div>
        <div class="h-[20vh]"></div>
      </div>

      <!-- 搜索结果 -->
      <div 
        :class="focused ? 'bg-light-900' : ''" 
        class="searchResult w-full h-full"
        v-if="focused && searchResult.length && searchText"
      >
        <ul>
          <li v-for="item in searchResult" :key="item.id">
            <searchItem :data="item" />
          </li>
        </ul>
      </div>   
    </template> 
  </scrollView>
</template>
<style lang="scss">
@import "@/style/variables.scss";

$gridNumLarge: 5;
$gridNumBase: 3;
$gridNumSmall: 2;
.wrap {
  scroll-margin-top: 40px;
}
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
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(9, var(--gridHeight));
    gap: 15px;
  }
}
.buttonGrid > * {
  width: 100% !important;
}
@keyframes hide {
  0% {
    // --backdropHeight: 50vmin;
    transform: translateY(0);
  } 
  100% {
    // --backdropHeight: 70vmin;
    transform: translateY(30vh);
  }
}
.pageTitle {
  animation-timeline: --scrollTimeline;
  animation-range: 45px;
  animation-name: hide;
  animation-timing-function: linear;
}
*::-webkit-scrollbar-thumb {
  transform: translateY(40px);
  display: none;
}
</style>