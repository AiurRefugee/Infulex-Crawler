<script setup>
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import { useFilmStore } from "@/stores/films";
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useFilmStore();
const tags = computed(() => store.tags);

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
  leftSpace = list.value.style.paddingLeft
  
  if (showAll.value) {
    list.value.style.paddingLeft = 0
    transHeight = listWrap.value.getBoundingClientRect().y - 40;
    Array.from(document.getElementsByClassName("classButton")).forEach((item) => {
      item.style.width = "95dvw";
      item.style.height = '20dvh'
    });
    originalElement.style.background = "var(--bg_Primary)";
    originalElement.style.height = "100dvh";
    list.value.style.flexDirection = "column";
    list.value.style.height = "calc(100dvh - 80px)";
    list.value.style.paddingBottom = '50px'
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
    list.value.style.paddingLeft = ''
    Array.from(document.getElementsByClassName("classButton")).forEach((item) => {
      item.style.width = "var(--classButtonWidth)";
      item.style.height = ''
    });
    list.value.style.scrollTop = 0
    originalElement.style.translate = `0 -${transHeight}px`
    originalElement.style.position = "";
    originalElement.style.background = ""; 
    list.value.style.flexDirection = ""; 
    list.value.style.height = "";
    list.value.style.paddingBottom = ''
    
    gsap.to(originalElement, {
      translate: '0 0',
      duration: duration,
      ease: "power1.out",
      onComplete: () => {  
        originalElement.style.height = ""; 
        list.value.style.flexWrap = "nowrap"; 
      },
    });
  }
}

onMounted( async () => { 
})
</script>
<template>
  <div ref="listWrap" class="listWrapper">
    <div class="listHead flex justify-between items-center">
      <div class="listTitle">影片类型</div>
      <div class="showAllButton" @click="toAll">
        {{ showAll ? "收起" : "查看全部" }}
      </div>
    </div>
    <div ref="list" class="list flex flex-nowrap justify-start items-center">
      <div
        class="classButton trans flex justify-center items-center"
        :style="{ backgroundImage: `${tag.backgroundColor}, url(${ '/filmImages/w900' + tag.backgroundUrl})`}"
        v-for="tag in tags"
        :key="tag"
      >
        <text class="buttonText">{{ tag.name }}</text>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
.trans {
  transition: $basicTrans;
}
.classButton {
  width: var(--classButtonWidth);
  flex-shrink: 0;
  padding: 2%;
  margin: var(--classMargin); 
  box-shadow: none;
  background-size: cover;
  border-radius: var(--priRadius);
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 2.3 / 1;
  background: linear-gradient(
      to right,
      rgba(214, 55, 34, 0.7) 0,
      rgba(130, 22, 126, 0.7) 100%
    ),
    url("src/assets/imgs/ave2.jpg");
  background-position: center;
  background-size: cover;
  transition: $basicTrans;
}
.buttonText {
  font-size: var(--classButtonTextSize);
  color: white;
  font-weight: bold;
  word-break: break-all;
  text-align: center;
  letter-spacing: 8px;
}
</style>