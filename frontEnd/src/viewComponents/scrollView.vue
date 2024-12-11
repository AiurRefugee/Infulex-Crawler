<script setup>
import { ref, onMounted, computed, getCurrentInstance, provide } from "vue";
import { layoutStore } from "@/stores/layout";

const emit = defineEmits(["toogle"]);
const props = defineProps({
  top: {
    default: 45
  }
});

const layout = layoutStore();

const size = computed(() => layout.size);

const scrollTop = ref(0)
const scrollTopModel = defineModel('scrollTopModel') 
const headerTitle = ref();
const divider = ref();
const scrollArea = ref();

const showTitle = ref(false);

const toogleTitle = (event) => {
  const scrollContainer = event.target;
  scrollTop.value = scrollContainer.scrollTop;
  scrollTopModel.value = scrollTop.value;
  showTitle.value = scrollContainer.scrollTop > props.top; 
  // const children = scrollContainer.children;
  // // 遍历子节点，判断是否可见
  // for (let i = 0; i < children.length; i++) {
  //   const child = children[i];
  //   const rect = child.getBoundingClientRect()
  //   if (rect.top >= scrollTop.value && rect.bottom <= scrollTop.value + scrollContainer.clientHeight) {
  //     child.classList.remove('invisible')
  //   } else {
  //     child.classList.add('invisible')
  //   }
  // }
};

provide("showTitle", showTitle);

onMounted(() => {

});
</script>
<template>
  <div class="scrollView">
    <slot name="header"></slot>
    <div
      id="scrollContainer"
      ref="scrollArea"
      class="scrollViewArea w-full h-full overflow-x-hidden overflow-y-auto"
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
  // background: var(--bg_light_primary);
  overflow-x: hidden;
  overflow-y: auto; 
}

.scrollViewArea {
  scroll-timeline: --scrollTimeline y;
}
.disableScroll .scrollViewArea{
  overflow: hidden !important;
}
</style>