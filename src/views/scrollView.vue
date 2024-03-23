<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
import { layoutStore } from "@/stores/layout";


const emit = defineEmits(["toogle"]);
const props = defineProps(['title', 'calScrollFunc']);

const layout = layoutStore();
const size = computed(() => layout.size); 
const title = computed(() => props.title)
const headerTitle = ref()
const divider = ref()
const scrollView = ref()
function toogle() {
  emit("toogle");
}
 
onMounted(() => { 
})
</script>
<template>
  <div
    class="scrollView"
    ref="scrollView"
    :style="{  
    }"
    @scroll="calScrollFunc(scrollView, $event)"
  >
    <slot name="header"></slot>
    <slot name="content"></slot>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/variables.scss";
$paddingSize: 2%;
.test {
  width: 90%;
  height: 20vh;
  background: gray;
  margin: 2%;
}
.scrollView {
  width: 100%;
  height: 100%;
  //   padding: 0 $tabLeftSpace;
  // transform: translate(0, 0);
  overflow-x: hidden;
  overflow-y: auto;
  // transform: translateX(0);
  // padding-top: $headerHeight;
  
   
}
</style>