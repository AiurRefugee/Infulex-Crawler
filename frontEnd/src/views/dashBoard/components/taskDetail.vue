<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import backword from "@/components/common/backword.vue";
import { useTaskStore } from "@/stores/tasks";
import { layoutStore } from "@/stores/layout";
import { ref, computed, onMounted } from "vue";
import msgListView from "./msgListView.vue";
import FileListView from "./fileListView.vue";
import { useRoute, useRouter } from "vue-router";
const taskStore = useTaskStore();
const route = useRoute();
const router = useRouter()
const selectedTask = computed(() => taskStore.selectedTask);
const layout = layoutStore();
const pageMode = ref(false)

const listStype = computed(() => taskStore.listStype);
const size = computed(() => layout.size);
const showBack = computed(() => {
  const { path } = route;
  console.log(path);
  return path.includes('taskDetail') || size.value == 'small'
});

const switchListStype = (type) => {
  taskStore.switchListStype(type);
}

const back = () => {
  if (layout.size == 'small') {
    router.go(-1)
  } else {
    taskStore.clearSelectedTask()
  }
}

onMounted(() => {
  const { mediaType, mediaId } = route.params;
  if (mediaType && mediaId) {
    taskStore.getTaskDetail(mediaType, mediaId);
    pageMode.value = true
  }

  if (showBack.value) {
    layout.setTabIconVisible(false);
  }
});
</script>
<template>
  <scrollView class="bg-light-800">
    <template #header v-if="selectedTask">
      <scrollHeader :show="true" class="h-[50px]">
        <template v-slot:left>
          <div class="h-full flex items-center pl-[2%]" >
            <backword :pl="pageMode" :title="layout.size == 'small' ? '全部任务' : 'Back'" @click="back" />
          </div>
        </template> 
        <template #center>
          <h1 class="text-dark-900 whitespace-nowrap overflow-hidden te select-none text-xl font-bold">{{ selectedTask?.title }}</h1>
        </template>
        <template v-slot:right>
          <div class="right pr-4 w-full h-full flex justify-end items-center gap-4">
            <div :class="listStype == 0 ? 'bg-light-600' : ''" class="iconWrap" @click="switchListStype(0)">
              <img class="h-[30px] aspect-square" src="/icons/messageList.svg" alt="" />
            </div>
            <div :class="listStype == 1 ? 'bg-light-600' : ''" class="iconWrap" @click="switchListStype(1)">
              <img class="h-[30px] aspect-square" src="/icons/fileList.svg" alt="" />
            </div>

            <!-- <text class="cancel text-bold text-lg text-red-500 ">
          取消任务
        </text> -->
          </div>
        </template>
      </scrollHeader>
    </template>
    <template #content>
      <msgListView :style="{ display: listStype == 0 ? '' : 'none' }" v-if="selectedTask"/>
      <FileListView :style="{ display: listStype == 1 ? '' : 'none' }" v-if="selectedTask"/>
    </template>
  </scrollView>
</template>
<style scoped lang="scss">
@media (width >=1080px) {
  .navWrap {
    display: none;
  }
}

.iconWrap {
  border-radius: 6px;
  padding: 2px;
  cursor: pointer;
}
</style>