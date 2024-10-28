<script setup>
import { inject, watch } from "vue";
import gsap from "gsap";
const lightMask = '#e1e1e1'
const lightNormal = "#f5f5f5"

const showTitle = inject("showTitle");
watch(showTitle, (newVal, oldVal) => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  let meta;
  // 黑暗模式
  if (prefersDarkMode) {
    meta = document.getElementById("darkThemeColor");
    // 显示遮罩层
    if (newVal) {
      meta.setAttribute("content", "#e7e7e7");
    } else {
      meta.setAttribute("content", "#121212");
    }
  } else {
    meta = document.getElementById("lightThemeColor");
    if (newVal) {
      meta.setAttribute("content", lightMask);
    } else {
      meta.setAttribute("content", lightNormal);
    }
  }
});
</script>
<template>
  <div 
    class="scrollHeader w-full h-[45px] flex-shrink-0 trans"
    :class="showTitle ? 'showBorderB scrollHeaderBg' : ''"
  >
    <div class="headerLeft w-full">
      <slot name="left"></slot>
    </div>
    <div
      class="headerCenter w-full center trans"
      :style="{ opacity: showTitle ? 1 : 0 }"
    >
      <slot name="center"></slot>
    </div>
    <div class="right w-full h-full">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.scrollHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  justify-items: center;
}
.showBorderB {
  border-bottom: 1px solid #c1c1c1ad;
}
.scrollHeaderBg {
  --bg: v-bind(lightMask);
  background: var(--bg);
  @media (prefers-color-scheme: dark) {
    --bg: #e7e7e7;
  }
}
</style>