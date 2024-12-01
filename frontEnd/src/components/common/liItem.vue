<script setup>
import { ref } from "vue";
import space from "./space.vue";


const overW = ref(false);
const spaceW = ref(null);

const props = defineProps({
  liClassName: {
    type: String,
  },
  index: {
    type: Number,
    Required: true,
  },
  afterfixW: {
    type: Number,
    default: 0,
  }
}); 
 
</script>
<template>
  <div class="liWrap overflow-hidden" :class="liClassName">
    <div class="w-full h-full flex">
      <div class="prefix" :style="{ width: prefixW + 'px' }"></div>

      <div
        class="content w-full overflow-hidden flex-shrink-0 relative"
        :style="{
          left: `-${afterfixW}px`,
        }"
        @pointerdown="slideStart"
      >
        <slot name="content"></slot>
      </div>

      <div
        class="afterfix h-full flex-shrink-0 flex items-center bg-red-500 overflow-hidden"
        :style="{
          width: `${afterfixW}px`,
          translate: `-${afterfixW}px`,
        }"
      >
        <space :width="spaceW" />
        <img
          class="removeIcon transSlow"
          src="@/assets/icons/remove.svg"
          alt="remove"
          @click="remove"
        />
        <space :width="spaceW" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
* {
  user-select: none;
}
.removeIcon {
  fill: red;
}
.removeIcon {
  $size: 30px;
  width: $size;
  min-width: $size;
  aspect-ratio: 1 / 1;
}
.afterfix {
  transition: justify-content 0.3s ease;
}
.afterfix:hover {
  justify-content: flex-start;
}
</style>