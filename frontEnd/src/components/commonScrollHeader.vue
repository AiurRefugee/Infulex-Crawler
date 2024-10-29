<script setup>
import { ref, computed } from "vue";
const props = defineProps(["title", "showTabFlag", "showDivider", 'bgColor']);
import { layoutStore } from "@/stores/layout";
const store = layoutStore();
</script>
<template>
  <header class="stickyHeader" :style="{
    backgroundColor: bgColor,
  }">
    <div class="upperGrid">
      <div class="tabIcon" @click="store.toogleTab">
        <button :style="{}" v-if="showTabFlag">
          <svg
            t="1707469394304"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4203"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              fill="#f59305fa"
              d="M384 213.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334zM263.253333 213.333333a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 0 1 0-85.333334h49.92zM640 469.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-49.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h305.92zM384 725.333333a42.666667 42.666667 0 1 0 0 85.333334 42.666667 42.666667 0 0 0 0-85.333334z m-120.746667 0a128.042667 128.042667 0 0 1 241.493334 0H810.666667a42.666667 42.666667 0 1 1 0 85.333334h-305.92a128.042667 128.042667 0 0 1-241.493334 0H213.333333a42.666667 42.666667 0 1 1 0-85.333334h49.92z"
              p-id="4204"
            ></path>
          </svg>
        </button>
      </div>

      <h1 ref="headerTitle" class="title">{{ title }}</h1>
    </div>
    <div ref="divider" class="divider" v-if="showDivider"></div>
  </header>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss";
$tabIconSize: 2rem;
.stickyHeader {
  // -webkit-backdrop-filter: blur(20px);
  // backdrop-filter: blur(20px);
  width: 100%;
  height: $headerHeight;
  top: 0;
  z-index: 999;
  transition: $transBase;
  position: fixed;
  background: var(--bg_light_primary);
  // transition: all 0.2s ease-in-out;
  // padding: 0 $tabLeftSpace;
  .upperGrid {
    width: 100%;
    height: 98%;
    display: grid;
    z-index: 999;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 100%;
    align-items: center;
    justify-items: center;
    .tabIcon {
      width: $tabIconSize;
      aspect-ratio: 1 / 1;
      justify-self: left;
      margin-left: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 90%;
        aspect-ratio: 1 / 1;
      }
    }
    .title {
      overflow: hidden;
      white-space: nowrap;
      color: var(--text_dark_primary);
      // color: var(--bg_Primary);
      opacity: 0;
    }
  }
}
</style>