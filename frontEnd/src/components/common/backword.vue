<script setup>
import { layoutStore } from "@/stores/layout";
const layout = layoutStore();
const props = defineProps({
  title: {
    type: String,
    default: "Back",
  },
});
</script>
<template>
  <div 
    :class="layout.tabIconVisible && !layout.showTab ? 'pl-[50px]' : ''"
    class="backword h-full flex items-center cursor-pointer trans"
  >
        <img class="h-[25px] aspect-square" src="@/assets/icons/back.svg"/>
        <p class="text-[1.1em] text-lg whitespace-nowrap">{{ title }}</p>
      </div>
</template>
<style scoped lang="scss">
.backword {
  color: rgb(233 145 73);
}
</style>