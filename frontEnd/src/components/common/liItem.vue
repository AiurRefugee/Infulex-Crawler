<script setup>
import { ref } from "vue";
import space from './space.vue'
import gsap from "gsap";
const prefixW = ref(0);
const afterfixW = ref(0);
const liWrap = ref(null);
const overW = ref(false);
const spaceW = ref(null)

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
const maxWidthRate = 0.7;

const remove = () => {
  emits("remove", props.index);
};

const slideStart = (event) => {
  console.log(event);
  const start = event.clientX;
  document.onpointermove = (event) => {
    const current = event.clientX;
    const diff = Math.max(start - current, 0);
    const maxW = liWrap.value.clientWidth * maxWidthRate;
    afterfixW.value = Math.min(diff, maxW);
    spaceW.value = afterfixW.value / maxW > 0.5 ? 0 : null
    console.log(liWrap.value.clientWidth);
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
  <div class="liWrap overflow-hidden" :class="liClassName" ref="liWrap">
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
        class="afterfix h-full px-[10px] flex-shrink-0 flex items-center relative items-center bg-red-500 overflow-hidden"
        :style="{
          width: `${afterfixW}px`,
          translate: `-${afterfixW}px`,
        }"
      > 
        <space :width="spaceW"/>
        <img
          class="removeIcon transSlow"
          src="@/assets/icons/remove.svg"
          alt="remove"
          @click="remove"
        /> 
        <space :width="spaceW"/>
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
.afterfix {
  transition: justify-content 0.3s ease;
}
.afterfix:hover {
  justify-content: flex-start;
}
</style>