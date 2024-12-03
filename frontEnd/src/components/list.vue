<script setup>
import { ref, computed } from "vue";
const props = defineProps([
  "cardWidth",
  "cardWidth",
  "canShowAll",
  "listTitle",
  "flexWrap",
  "array",
]);
import { useRouter } from "vue-router";
import gsap from "gsap";
const router = useRouter();

const colNum = 9;
const showAll = ref(false);
const listWrap = ref();
const list = ref();

let transHeight;

const filtered = computed(() => {
  if (showAll.value) {
    return props.array;
  } else {
    return props.array.slice(0, 30);
  }
})

function toAll() {
  const duration = 0.3;
  list.value.style.scrollTop = 0
  showAll.value = !showAll.value;
  screenTop = document.documentElement.scrollTop;
  const originalElement = listWrap.value; 
  if (showAll.value) {
    transHeight = listWrap.value.getBoundingClientRect().y - 40;
    
    originalElement.style.background = "var(--bg_Primary)";
    originalElement.style.height = "100dvh";
    list.value.style.flexWrap = "wrap";
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
    
    originalElement.style.translate = `0 -${transHeight}px`
    originalElement.style.position = "";
    originalElement.style.background = ""; 
    list.value.style.flexWrap = "nowrap"; 
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
</script>
<template>
  <div ref="listWrap" class="listWrapper">
    <div class="listHead flex justify-between items-center">
      <div class="listTitle">{{ listTitle || "--" }}</div>
      <button class="showAllButton" v-if="canShowAll" @click="toAll">
        {{ showAll ? "收起" : "查看全部" }}
      </button>
    </div>
    <div ref="list" class="list flex justify-stretch items-start">
      <slot :item="item" v-for="item in filtered" :key="item"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
::-webkit-scrollbar {
  display: none;
}
.filmName {
  max-width: 10vw;
}
.year {
  max-width: 10vw;
}
</style>