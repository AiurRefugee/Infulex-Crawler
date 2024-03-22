<script setup>
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import { layoutStore } from "@/stores/layout";
const store = layoutStore();

// 可以在组件中的任意位置访问 `store` 变量 ✨
const genres = computed(() => store.genres);

let transHeight, leftSpace;

const props = defineProps(["cardWidth", "canShowAll", "listTitle"]);
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
      <button
        class="genreCard trans flex justify-center items-center"
        v-for="tag in genres"
        :key="tag"
      >
        <div class="genreContent" :style="{ background: `${tag.background}` }">
          <div class="buttonText">{{ tag.name }}</div>
        </div>
      </button>
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
  height: var(--genreHeight);
  margin-top: 0.5rem;
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
  height: calc(100% - 1rem);
  display: flex;
  align-items: center;
  overflow-x: auto;
}
.genreCard {
  width: calc(100% / var(--genreNum));
  flex-shrink: 0;
  height: 80%;
  // padding: var(--classMargin);
  padding-right: var(--genreSpace);
  box-shadow: none;
  background-size: cover;
  
  aspect-ratio: 2.3 / 1;
  
  background-position: center;
  background-size: cover;
  transition: $basicTrans;
}
.genreContent {
  width: 100%;
  height: 100%;
  border-radius: var(--priRadius);
  overflow: hidden; 
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to right,
    rgba(214, 55, 34, 0.7) 0,
    rgba(130, 22, 126, 0.7) 100%
  );
  // url("src/assets/imgs/ave2.jpg");
}
.buttonText {  
  font-size: var(--genreFontSize);
  color: white;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
  text-align: center;
  letter-spacing: 8px;
}
</style>