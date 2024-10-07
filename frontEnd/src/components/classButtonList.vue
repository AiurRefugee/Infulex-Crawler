<script setup>
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import { layoutStore } from "@/stores/layout";
import ClassButton from '@/components/ClassButton.vue'
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
    <div class="genreTitle w-full flex pl-4" v-if="showTitle">
      <div class="txtDark_Primary">影片类型</div>
      <div class="showAllButton" @click="toAll">
        {{ showAll ? "收起" : "查看全部" }}
      </div>
    </div>  
    <div ref="list" class="w-full flex gap-6 overflow-auto pl-5">
      <div class="browseClassButton browseButtonW center" v-for="tag in genres" :key="tag">
        <text>{{ tag?.name }}</text>
      </div> 
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss"; 
//浏览页class button

</style>