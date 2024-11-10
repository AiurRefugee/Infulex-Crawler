<script setup>
import { inject, onMounted, ref } from "vue";

const scrollTop = inject("scrollTop");
const props = defineProps({
  actions: {
    type: Array,
    Required: true,
  },
});
const listRef = ref()
const showMore = ref(false); 
const showScrollMask = ref(false)
let scrollStart = false
let scrollTopOrigin = null
let scrollTimeout = null

const inBox = (event) => {
  event.stopPropagation();
  event.preventDefault();
  const boundibgBox = listRef.value.getBoundingClientRect();
  if (
    event.clientX < boundibgBox.left ||
    event.clientX > boundibgBox.right ||
    event.clientY < boundibgBox.top ||
    event.clientY > boundibgBox.bottom
  ) {
    return false
  } else {
    return true
  }
}

const handleScroll = (event) => {
  const scrollContainer = document.getElementById("scrollContainer");
  const scollHandler = document.getElementById("scrollHandler");

  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  scrollTimeout = setTimeout(() => {
    showScrollMask.value = false
  }, 50)
  // 滚动开始
  if (!scrollStart) {
    scrollStart = true 
    scrollTopOrigin = scrollContainer.scrollTop;
  }
  scrollContainer.scrollTop = scrollTopOrigin + scollHandler.scrollTop;
  showMore.value = false
  console.log(event,scrollTopOrigin, scollHandler.scrollTop)
}

const toogleMoreActions = () => {
  showMore.value = !showMore.value;  
  if (showMore.value) {
    showScrollMask.value = true
  }
};

const close = (event) => {
  showMore.value = false
  showScrollMask.value = false
}

onMounted(() => {
  const scrollContainer = document.getElementById("scrollContainer");
  // scrollContainer.addEventListener("scroll", () => {
  //   showMore.value = false;
  // });
  console.log(props.actions);
});
</script>
<template>
  <div
    class="more-actions w-full h-[45px] flex items-center relative pr-6 overflow-visible aspect-square rounded-full"
  >
    <div class="w-full"></div>
    <svg
      class="icon h-[30px] aspect-square cursor-pointer"
      viewBox="0 0 1024 1024"
      @click="toogleMoreActions"
    >
      <path
        d="M213.333333 512a85.333333 85.333333 0 1 1-85.333333-85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333z m298.666667-85.333333a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 0a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z"
        :fill="
          scrollTop < 40 ? 'gray' : 'var(--bg_dark_primary)'
        "
        p-id="6422"
      ></path>
    </svg>

    <div
      id="scrollHandler"
      class="w-[100vw] h-[100vh] fixed left-0 top-0 z-[100] overflow-auto"
      v-if="showScrollMask"
      @scroll="handleScroll"
    >
      <div class="w-[100vw] h-[200vh]" @pointerup="close"></div>
    </div>

    <div
      ref="listRef"
      class="listWrap w-[200px] absolute right-4 top-[42px] rounded-lg bgLightSecondary overflow-hidden trans origin-top-right"
      :class="showMore ? ' scale-100 opacity-100' : 'scale-0 opacity-0'"
    >
      <div
        class="classWrap"
        :class="groupIndex ? 'mt-2' : ''"
        v-for="(group, groupIndex) in actions"
        :key="groupIndex"
      >
        <div
          class="txtDarkPrimary bgLightPrimary"
          v-for="(action, index) in group"
          :key="index"
        >
          <div
            class="divider w-full h-[1px] bgDarkBasic opacity-20"
            v-if="index"
          ></div>
          <slot :name="action.title"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>