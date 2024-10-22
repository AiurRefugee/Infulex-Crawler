<script setup>
import { inject } from "vue";

const showTitle = inject("showTitle");
</script>
<template>
  <div class="scrollHeader w-full h-[45px] flex-shrink-0">
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
.showTitle {
  border-bottom: 1px solid #6c6c6cad;
}
</style>