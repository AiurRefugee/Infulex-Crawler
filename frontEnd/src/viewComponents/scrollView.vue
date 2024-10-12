<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
import { layoutStore } from "@/stores/layout";


const emit = defineEmits(["toogle"]);
const props = defineProps(['calScrollFunc', 'top']);

const layout = layoutStore();
const size = computed(() => layout.size);  
const headerTitle = ref()
const divider = ref()
const scrollArea = ref()

const showTitle = ref(false)

const toogleTitle = (event) => {
  showTitle.value = scrollArea.value.scrollTop > 30 
}

onMounted(() => { 
})
</script>
<template>
  <div
    class="scrollView"
    
    
  >
    <div class="scrollHeader h-[40px] flex-shrink-0">
      <div class="headerLeft">
        <slot name="headerLeft"></slot>
      </div>
      <div class="headerCenter center trans" :style="{ opacity: showTitle ? 1 : 0}">
        <slot name="headerCenter"></slot>
      </div>
      <div class="headerRight">
        <slot name="headerRight"></slot>
      </div>
    </div>
    <div 
      ref="scrollArea"
      class="w-full h-full overflow-x-hidden overflow-y-auto"
      @scroll="toogleTitle"
    >
      <slot name="content"></slot>
    </div>
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
  display: flex;
  flex-direction: column;
  //   padding: 0 $tabLeftSpace;
  // transform: translate(0, 0);
  background: var(--bgLight_Primary);
  overflow-x: hidden;
  overflow-y: auto;
  // transform: translateX(0);
  // padding-top: $headerHeight; 
}
.scrollHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  justify-items: center;
}
</style>