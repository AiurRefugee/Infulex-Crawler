<script setup>
import { onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { computed } from "vue";
import { layoutStore } from "@/stores/layout"; 
import { useRouter } from "vue-router";
import taskList from "./components/taskList.vue";
import taskDetail from "./components/taskDetail.vue";
const layout = layoutStore();
const size = computed(() => layout.size);
console.log(size.value);

const sliding = ref(false);

function slideOpt(value) {
  console.log("slideOpt", value);
  sliding.value = value;
}

onMounted( () => {
  
})
</script>
<template>
  <div class="dashBoard flex h-full">
    <!-- 任务列表 -->
    <div
      class="tasks bg-light-800 h-full overflow-x-hidden trans"
      :style="{
        width: size == 'small' && selectedTask ? '0' : '',
        translate: size == 'small' && selectedTask ? '-100%' : '0'
      }"
    >
      <taskList/>
    </div>

    <!-- 任务详情 -->
    <div
      class="detailWrap w-full"
      :style="{
        // translate: size == 'small' && !selectedTask ? 'var(--taskW)' : '0'
      }"
    >
      <taskDetail/>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/style/color.scss";
.tasks {
  // --taskW: 30vw;
  min-width: 300px;
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