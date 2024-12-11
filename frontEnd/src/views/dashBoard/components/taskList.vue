<script setup>
import { onMounted, ref, provide } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { computed } from "vue";
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import taskOverview from "./taskOverview.vue";
import moreActions from "@/views/mediaDetail/components/moreActions.vue";
import { useRouter } from "vue-router";
import { layoutStore } from "@/stores/layout";
const layout = layoutStore();
const router = useRouter();
const taskStore = useTaskStore();
const taskPools = computed(() => taskStore.taskPools);
const choosed = ref(-1);
const sliding = ref(false);
const slidingIndex = ref(-1);
const afterfixW = ref(0);
const isTouch = window.matchMedia("(pointer: coarse)").matches;
console.log(isTouch);
let slidingTimeout = null;

const navToTaskDetail = (task, index) => {
  choosed.value = index;
  const { mediaType, mediaId } = task;
  taskStore.getTaskDetail(mediaType, mediaId);
  if (window.innerWidth < 628 || window.innerHeight < 628) {
    router.push("/taskDetail/" + mediaType + "/" + mediaId);
  }
};

const startSlide = (event, index) => {
  if (layout.size != 'small') {
    return;
  }
  const startX = event.clientX;
  const startY = event.clientY;
  document.onpointermove = (e) => {
    if (!slidingTimeout) {
      slidingTimeout = setTimeout(() => {
        const x = startX - e.clientX;
        const y = startY - e.clientY;
        console.log(event, startX, startY, x, y);
        if (Math.abs(x) > Math.abs(y)) {
          console.log("滑动方向为左右", index);
          sliding.value = true;
          slidingIndex.value = index;
        }
      }, 20);
    }
    if (sliding.value && startX - e.clientX > 0) {
      afterfixW.value = startX - e.clientX;
    }
  };
  document.onpointerup = () => {
    sliding.value = false;
    slidingTimeout = null;
    document.onpointermove = null;
  };
};

onMounted(() => {
  taskStore.getTaskList();
});
</script>
<template>
  <scrollView class="hideScroll" :class="sliding ? 'disableScroll' : ''">
    <template v-slot:header>
      <scrollHeader class="h-[45px]">
        <template v-slot:center>
          <h1 class="text-dark-900 select-none text-xl font-bold">全部任务</h1>
        </template>
      </scrollHeader>
    </template>
    <template v-slot:content>
      <h1 class="text-dark-900 px-4 text-[1.6em] font-bold mb-2">全部任务</h1>
      <taskOverview
        :class="choosed == index ? 'bg-light-600' : 'bg-light-800'"
        class="cursor-pointer mx-4"
        v-for="(task, index) in taskPools"
        :key="task"
        :task="task"
        :index="index"
        :slidingIndex="slidingIndex"
        :afterfixW="afterfixW"
        @pointerdown="startSlide($event, index)"
        @click="navToTaskDetail(task, index)"
      >
      </taskOverview>
      <div class="h-32"></div>
    </template>
  </scrollView>
</template>
<style scoped lang="scss">
</style>