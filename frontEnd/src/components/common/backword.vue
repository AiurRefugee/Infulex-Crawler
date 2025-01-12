<script setup>
import { layoutStore } from "@/stores/layout";
import backSvg from "@/assets/icons/back.svg"
const layout = layoutStore();
const props = defineProps({
  pl: {
    type: Boolean,
    default: true
  },
  textClassName: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div  
    :class="[
      layout.tabIconVisible && !layout.showTab && pl ? 'pl-[50px]' : '',
      textClassName ? textClassName : 'backword'
    ]"
    class="w-20 h-full flex items-center cursor-pointer trans"
  >
        <img class="h-[25px] aspect-square" :src="backSvg"/>
        <p class="text-[1.1em] text-lg whitespace-nowrap">{{ title }}</p>
      </div>
</template>
<style scoped lang="scss"> 
.backword {
  color: rgb(233 145 73);
}
</style>