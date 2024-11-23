<script setup>
import { onMounted, ref } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { computed } from "vue";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import taskOverview from "./taskOverview.vue"; 
import { useRouter } from "vue-router";
const router = useRouter()
const taskStore = useTaskStore();
const taskPools = computed(() => taskStore.taskPools);

const navToTaskDetail = (task) => {
    const { mediaType, mediaId } = task
    taskStore.getTaskDetail(mediaType, mediaId)
}

onMounted( () => {
    taskStore.getTaskList()
})
</script>
<template>
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
          <h1 class="txtDarkPrimary px-4 text-[2em] font-bold mb-2">全部任务</h1>
          <div class="px-4">
            <taskOverview
              class="cursor-pointer"
              v-for="task in taskPools"
              :key="task"
              :task="task" 
              @click="navToTaskDetail(task)"
            />
          </div>
          <div class="h-32"></div>
        </template>
      </scrollView>
</template>