<script setup>
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import { layoutStore } from "@/stores/layout";
import ClassButton from '@/components/ClassButton.vue'
const store = layoutStore();

// 可以在组件中的任意位置访问 `store` 变量 ✨
const genres = computed(() => store.genres);

let transHeight, leftSpace;

const props = defineProps(["canShowAll", "listTitle"]);
const listTitle = ref("评分最高");
const showAll = ref(false);
const listWrap = ref(null);
const list = ref(null);

function toAll() {
  const duration = 0.3;
  showAll.value = !showAll.value;
  screenTop = document.documentElement.scrollTop;
  const originalElement = listWrap.value;
  leftSpace = list.value.style.paddingLeft;

  if (showAll.value) {
    list.value.style.paddingLeft = 0;
    transHeight = listWrap.value.getBoundingClientRect().y - 40;
    Array.from(document.getElementsByClassName("classButton")).forEach(
      (item) => {
        item.style.width = "95dvw";
        item.style.height = "20dvh";
      }
    );
    originalElement.style.background = "var(--bg_Primary)";
    originalElement.style.height = "100dvh";
    list.value.style.flexDirection = "column";
    list.value.style.height = "calc(100dvh - 80px)";
    list.value.style.paddingBottom = "50px";
    gsap.to(originalElement, {
      translate: `0 -${transHeight}px`,
      duration: duration,
      ease: "power1.out",
      onComplete: () => {
        originalElement.style.translate = "none";
        originalElement.style.position = "fixed";
      },
    });
  } else {
    list.value.style.paddingLeft = "";
    Array.from(document.getElementsByClassName("classButton")).forEach(
      (item) => {
        item.style.width = "var(--classButtonWidth)";
        item.style.height = "";
      }
    );
    list.value.style.scrollTop = 0;
    originalElement.style.translate = `0 -${transHeight}px`;
    originalElement.style.position = "";
    originalElement.style.background = "";
    list.value.style.flexDirection = "";
    list.value.style.height = "";
    list.value.style.paddingBottom = "";

    gsap.to(originalElement, {
      translate: "0 0",
      duration: duration,
      ease: "power1.out",
      onComplete: () => {
        originalElement.style.height = "";
        list.value.style.flexWrap = "nowrap";
      },
    });
  }
}

onMounted(async () => {});
</script>
<template>
  <div ref="listWrap" class="genreWrapper">
    <div class="genreTitle pl-4">
      <div class="">影片类型</div>
      <div class="showAllButton" @click="toAll">
        {{ showAll ? "收起" : "查看全部" }}
      </div>
    </div>
    <div ref="list" class="listcontentWrapper pl-5">
      <ClassButton v-for="tag in genres" :key="tag" :genreNumVar="'var(--genreNum)'" :content="tag"/> 
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
.trans {
  transition: $basicTrans;
}
.genreWrapper {
  width: 100%;  
  position: relative;
  z-index: 0;
  background: var(--bg_Primary);
}
.genreTitle {
  color: var(--txtColor_Primary);
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.listcontentWrapper {
  width: 100%; 
  display: flex;
  align-items: center;
  overflow-x: auto;
}

</style>