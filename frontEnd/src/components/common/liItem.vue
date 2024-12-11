<script setup>
import { inject, ref } from "vue";
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
}); 
const sliding = inject('sliding')

const afterfixW = ref(0);

const remove = () => {
  overW.value = false;
  emit("remove", props.index);
};
</script>
<template>
  <div
    :class="liClassName"
    class="liWrap flex w-full overflow-hidden"
  >
    <div class="prefix" :style="{ width: prefixW + 'px' }"></div>

    <div 
      :class="sliding ? 'pointer-events-none' : ''"
      class="content w-full overflow-hidden flex-shrink-0 relative user-select-none"
      :style="{
        left: `-${afterfixW}px`,
      }" 
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
        src="/icons/remove.svg"
        alt="remove"
        @click="remove"
      />
      <space :width="spaceW" />
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