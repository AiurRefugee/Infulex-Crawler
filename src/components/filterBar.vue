<script setup>
import { ref } from "vue";
const showFilter = ref(false);
</script>
<template>
  <div class="filterWrapper flex justify-center items-center">
    <div class="w-full h-full filterIcon" @click="showFilter = !showFilter">
      <svg
        class="w-full h-full"
        t="1707469394304"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4203"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M384 213.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334zM263.253333 213.333333a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 0 1 0-85.333334h49.92zM640 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-49.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h305.92zM384 725.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h49.92z"
          p-id="4204"
        ></path>
      </svg>
    </div>
  </div>
  <div class="mask" v-if="showFilter" @click="showFilter = false"></div>
  <div
    class="sideBar"
    :style="{
      translate: showFilter ? '0' : '-100% 0',
    }"
  ></div>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
$size: 80%;
.filterWrapper {
  width: var(--filterAreaWidth);
  height: var(--headerHeight);
  position: fixed;
  left: 0;
  top: 0;
  z-index: $zindex;
  cursor: pointer; 
}
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: $maskZindex;
  background-color: rgba(59, 59, 59, 0.762);
}
.filterIcon {
  fill: var(--primaryColor);
  color: var(--primaryColor);
  width: $size;
  height: $size;
  
}

.sideBar {
  width: var(--filterWidth);
  height: 100vh;
  background-color: var(--bg_Primary);
  position: fixed;
  z-index: calc(#{$zindex} - 1);
  left: 0;
  top: 0;
  translate: -100% 0;
  transition: $basicTrans;
  backdrop-filter: blur(5px);
  background-color: rgba(48, 48, 48, 0.561);
  @media (width < 1000px) {
    --filterWidth: 70vw;
  }
}
.filterIcon :hover {
  .sideBar {
    translate: 0 0;
  }
}
.filterIcon :hover {
  //   fill: black;
}
</style>