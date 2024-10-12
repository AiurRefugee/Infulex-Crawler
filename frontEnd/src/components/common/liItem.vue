<script setup>
import { ref } from "vue";
import gsap from "gsap";
const prefixW = ref(0);
const afterfixW = ref(0);
const emits = defineEmits(["remove"]);
const props = defineProps({
  liClassName: {
    type: String,
  },
  index: {
    type: Number,
    Required: true,
  },
});
const maxW = "70%";

const remove = () => {
  emits("remove", props.index);
};

const slideStart = (event) => {
  console.log(event);
  const start = event.clientX;
  document.onpointermove = (event) => {
    const current = event.clientX;
    const diff = Math.max(start - current, 0);
    afterfixW.value = diff;
    console.log(afterfixW.value);
  };
  document.onpointerup = () => {
    document.onpointermove = null;
    // if (afterfixW.value > 20) {
    //     gsap.to(afterfixW, {
    //     value: 40,
    //     duration: 0.5,
    //     ease: "power1.inOut",
    // });
    // } else {
    //     gsap.to(afterfixW, {
    //     value: 0,
    //     duration: 0.5,
    //     ease: "power1.inOut",
    // });
    // }
  };
};
</script>
<template>
  <div class="liWrap overflow-hidden" :class="liClassName">
    <div class="w-full h-full flex">
      <div class="prefix" :style="{ width: prefixW + 'px' }"></div>

      <div
        class="content w-full overflow-hidden relative"
        :style="{
          left: -afterfixW + 'px',
        }"
        @pointerdown="slideStart"
      >
        <slot name="content"></slot>
      </div>

      <div
        class="afterfix h-full flex-shrink-0 center bg-red-500"
        :style="{ width: `min(${afterfixW}px, ${maxW})` }"
      >
        <img
          class="removeIcon"
          src="@/assets/icons/remove.svg"
          alt="remove"
          @click="remove"
        />
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
    $size: 20px;
    width: $size;
    min-width: $size;
    aspect-ratio: 1 / 1;
}
</style>