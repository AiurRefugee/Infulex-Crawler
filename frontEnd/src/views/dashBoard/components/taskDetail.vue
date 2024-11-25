<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import taskHeader from "./taskHeader.vue";
import { useTaskStore } from "@/stores/tasks";
import { layoutStore } from "@/stores/layout";
import { ref, computed, onMounted } from "vue";
import msgListView from "./msgListView.vue";
import FileListView from "./fileListView.vue";
const tasks = useTaskStore();
const selectedTask = computed(() => tasks.selectedTask);
const layout = layoutStore();
const listStype = computed(() => tasks.listStype);

const size = computed(() => {
  return layout.size;
});

onMounted( () => {
  if (size.value == 'small') {
    layout.setTabIconVisible(false)
  }
})

</script>
<template> 
    <taskHeader :task="selectedTask" v-model:listStype="listStype"/>
    <msgListView :style="{ display: listStype == 0 ? '' : 'none'}"/>
    <FileListView :style="{ display: listStype == 1 ? '' : 'none'}"/> 
</template>
<style scoped lang="scss">
@media (width >= 1080px) {
  .navWrap {
    display: none;
  }
}
</style>