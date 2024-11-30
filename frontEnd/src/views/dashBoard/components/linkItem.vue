<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "@/stores/tasks";
import msgGrid from "./msgGrid.vue";
const tasks = useTaskStore();
const props = defineProps({
  linkMsg: {
    type: Object,
    default: {}
  },
}); 
</script>
<template>
   <a  
      :class="linkMsg?.status == 'failed' ? 'failed' : 'normal'"
      class="linkItem rounded-lg min-h-24 text-dark-700 opacity-80 overflow-hidden text-ellipsis" 
      :href="linkMsg?.link" target="_blank"
    >{{ linkMsg?.link }}</a>
</template>
<style scoped lang="scss">
@import "@/style/variables.scss"; 
.linkItem {
  $padding: 5px;
  $margin: 3px;
  word-break: break-all;
  overflow-wrap: anywhere;
  padding: $padding 2 * $padding;
  margin: $margin;
  // background-color: $item_hover_color;
}
.normal {
  color: #56b725;
  background-color: rgb(240 249 235 / 50%);
}
.normal:hover {
  background-color: hsl(from $item_normal_color h s l/  0.1);
}
.failed {
  color: hsl(350.36deg 88.74% 45.54%);
  background-color: rgba(232, 210, 210, 0.5);
}
@media (prefers-color-scheme: dark) {
  .normal {
    color: #67c23a;
    background-color: rgb(92 101 87 / 50%);
  }
  .normal:hover {
    background-color: hsl(from $item_normal_color h s l/  0.1);
  }
  .failed {
    color: hsl(350.36deg 55.16% 53.68%);
    background-color: rgb(86 75 75 / 50%);
  }
}
</style>