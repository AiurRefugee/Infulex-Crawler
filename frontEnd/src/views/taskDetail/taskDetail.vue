<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import taskHeader from "./components/taskHeader.vue";
import msgListView from "./components/msgListView.vue";
import { useTaskStore } from "@/stores/tasks";
import { layoutStore } from "@/stores/layout";
import { computed, onMounted } from "vue";
const tasks = useTaskStore();
const selectedTask = computed(() => tasks.selectedTask);
const layout = layoutStore();

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