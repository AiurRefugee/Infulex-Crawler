<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import taskHeader from "./components/taskHeader.vue";
import msgListView from "./components/msgListView.vue";
import { taskStore } from "@/stores/tasks";
import { layoutStore } from "@/stores/layout";
import { computed } from "vue";
const tasks = taskStore();
const selectedTask = computed(() => tasks.selectedTask);
const layout = layoutStore();

const size = computed(() => {
  return layout.size;
});


</script>
<template>
  <div class="taskDetail w-full h-full">
    <taskHeader :task="selectedTask" />
    <msgListView :task="selectedTask" />
  </div>
</template>
<style scoped lang="scss">
@media (width >= 1080px) {
  .navWrap {
    display: none;
  }
}
</style>