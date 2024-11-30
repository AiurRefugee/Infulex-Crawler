<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import taskHeader from "./taskHeader.vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/tasks";
import { layoutStore } from "@/stores/layout";
import { ref, computed, onMounted } from "vue";
import msgListView from "./msgListView.vue";
import FileListView from "./fileListView.vue";
const taskStore = useTaskStore();
const route = useRoute();
const selectedTask = computed(() => taskStore.selectedTask);
const layout = layoutStore();
const listStype = computed(() => taskStore.listStype);

const size = computed(() => layout.size);

onMounted(() => {
  const { mediaType, mediaId } = route.params;
  if (mediaType && mediaId) {
    taskStore.getTaskDetail(mediaType, mediaId);
  }

  if (window.innerWidth < 628) {
    layout.setTabIconVisible(false);
  }
});
</script>
<template>
  <div class="w-full h-full bg-light-700 trans">
    <taskHeader :task="selectedTask" v-model:listStype="listStype" />
    <msgListView :style="{ display: listStype == 0 ? '' : 'none' }" />
    <FileListView :style="{ display: listStype == 1 ? '' : 'none' }" />
  </div>
</template>
<style scoped lang="scss">
@media (width >= 1080px) {
  .navWrap {
    display: none;
  }
}
</style>