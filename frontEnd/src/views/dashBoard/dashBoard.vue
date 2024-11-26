<script setup>
import { onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { computed } from "vue";
import { layoutStore } from "@/stores/layout";
import { useRouter } from "vue-router";
import taskList from "./components/taskList.vue";
import taskDetail from "./components/taskDetail.vue";
const layout = layoutStore();
const showTab = computed(() => layout.showTab);
const size = computed(() => layout.size);
console.log(size.value);

const sliding = ref(false);

function slideOpt(value) {
  console.log("slideOpt", value);
  sliding.value = value;
}

onMounted(() => {});
</script>
<template>
  <!-- 任务列表 -->
  <div
    class="tasks bg-light-800 w-full h-full overflow-x-hidden trans"
    :style="{
      width: size == 'small' && selectedTask ? '0' : '',
      translate: size == 'small' && selectedTask ? '-100%' : '0',
    }"
  >
    <taskList />
  </div>

  <!-- 任务详情 -->
  <div
    class="detailWrap w-full bg-light-700 trans"
  >
    <taskDetail />
  </div>
</template>
<style scoped lang="scss">
@import "@/style/color.scss";
.navW {
  width: calc(100% - var(--taskW) - var(--tab_width));
}

.tasks {
  width: var(--taskW);
  min-width: var(--taskW);
  flex-shrink: 0;
  // border-right: 1px solid rgba(128, 128, 128, 0.508);
}
@media (width < 500px) {
  .tasks {
    --taskW: 100vw;
    border-right: none;
  }
}
</style>