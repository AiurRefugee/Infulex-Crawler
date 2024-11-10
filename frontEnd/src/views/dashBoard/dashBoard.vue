<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { computed } from "vue";
import { layoutStore } from "@/stores/layout";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import taskOverview from "./components/taskOverview.vue"; 
import { useRouter } from "vue-router";
const router = useRouter()
const tasks = useTaskStore();
const layout = layoutStore();
const size = computed(() => layout.size);
console.log(size.value);

const selectedTask = computed(() => tasks.selectedTask);
console.log(selectedTask.value);
const taskPools = computed(() => tasks.taskPools);

const sliding = ref(false);

function slideOpt(value) {
  console.log("slideOpt", value);
  sliding.value = value;
}
 
const navToTaskDetail = () => {
  router.push('/dashBoard/taskDetail/114')
}
</script>
<template>
  <div class="dashBoard flex h-full">
    <!-- 任务列表 -->
    <div
      class="tasks h-full overflow-x-hidden trans"
      :style="{
        width: size == 'small' && selectedTask ? '0' : '',
        translate: size == 'small' && selectedTask ? '-100%' : '0'
      }"
    >
      <scrollView>
        <template v-slot:header>
          <scrollHeader>
            <template v-slot:center>
              <h1 class="txtDarkPrimary select-none text-xl font-bold">
                全部任务
              </h1>
            </template>
          </scrollHeader>
        </template>
        <template v-slot:content>
          <div
            class="h-full px-4 overflow-x-hidden"
            :class="sliding ? 'touch-none' : ''" 
          >
            <h1 class="txtDarkPrimary text-[2em] font-bold mb-2">全部任务</h1>
            <taskOverview
              class="cursor-pointer"
              v-for="task in taskPools"
              :key="task"
              :task="task" 
              @click="navToTaskDetail(task)"
            />
            <div class="h-32"></div>
          </div>
        </template>
      </scrollView>
    </div>

    <!-- 任务详情 -->
    <div
      class="detailWrap w-full"
      :style="{
        // translate: size == 'small' && !selectedTask ? 'var(--taskW)' : '0'
      }"
    >
      <RouterView/>
    </div>
  </div>
</template>
<style scoped lang="scss">

.tasks {
  --taskW: max(26vw, 350px);
  width: var(--taskW);
  flex-shrink: 0;
  border-right: 1px solid gray;
}
@media (width < 500px) {
  .tasks {
    --taskW: 100vw;
    border-right: none;
  }
}
</style>