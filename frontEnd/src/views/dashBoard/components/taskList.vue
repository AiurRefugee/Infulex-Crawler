<script setup>
import { onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { computed } from "vue";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import taskOverview from "./taskOverview.vue";
import { useRouter } from "vue-router";
import { layoutStore } from "@/stores/layout";
const layout = layoutStore();
const router = useRouter()
const taskStore = useTaskStore();
const taskPools = computed(() => taskStore.taskPools);
const choosed = ref(-1)

const navToTaskDetail = (task, index) => {
  choosed.value = index
  const { mediaType, mediaId } = task
  taskStore.getTaskDetail(mediaType, mediaId)
  if (window.innerWidth < 628 || window.innerHeight < 628) {
    router.push('/taskDetail/' + mediaType + '/' + mediaId)
  }
}

onMounted(() => {
  taskStore.getTaskList()
})
</script>
<template>
  <scrollView>
    <template v-slot:header>
      <scrollHeader class="h-[45px]">
        <template v-slot:center>
          <h1 class="text-dark-900 select-none text-xl font-bold">
            全部任务
          </h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <h1 class="text-dark-900 px-4 text-[1.6em] font-bold mb-2">全部任务</h1>
      <div class="px-4">
        <taskOverview 
          :class="choosed == index ? 'bg-light-600' : 'bg-light-800'"
          class="cursor-pointer" 
          v-for="(task, index) in taskPools" 
          :key="task" 
          :task="task" 
          @click="navToTaskDetail(task, index)" 
        />
      </div>
      <div class="h-32"></div>
    </template>
  </scrollView>
</template>
<style scoped lang="scss">
</style>