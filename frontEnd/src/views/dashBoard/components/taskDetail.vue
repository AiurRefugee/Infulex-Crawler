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
import fileList from '@/assets/icons/fileList.svg'
import messageListSvg from '@/assets/icons/messageList.svg'
import refreshSvg from '@/assets/icons/refresh.svg'

const taskStore = useTaskStore();
const route = useRoute();
const router = useRouter();
const selectedTask = computed(() => taskStore.selectedTask);
const layout = layoutStore();
const pageMode = ref(false);
const showOpt = ref(false);
const opt = ref();
const icon = ref()

const listStype = computed(() => taskStore.listStype);
const size = computed(() => layout.size);
const showBack = computed(() => {
  const { path } = route;
  console.log(path);
  return path.includes("taskDetail") || size.value == "small";
});

const switchListStype = (type) => {
  taskStore.switchListStype(type);
};

const back = () => {
  if (layout.size == "small") {
    router.go(-1);
  } else {
    taskStore.clearSelectedTask();
  }
};

const handleOpt = async (event) => {
  showOpt.value = !showOpt.value;
  
};

const deleteTask = () => {
  taskStore.deleteTask(selectedTask.value.mediaType, selectedTask.value.mediaId);
  showOpt.value = false;
}

const retryTask = () => {
  taskStore.retryTask(selectedTask.value.mediaType, selectedTask.value.mediaId);
  showOpt.value = false;
}

onMounted(() => {
  const { mediaType, mediaId } = route.params;
  document.onclick = (event) => {
    // 检测区域是否在弹窗内
    if (showOpt.value && !icon.value.contains(event.target) && !opt.value.contains(event.target)) {
      event.preventDefault();
      console.log("点击了弹窗外");
      showOpt.value = false;
    } 
  };

  if (mediaType && mediaId) {
    taskStore.getTaskDetail(mediaType, mediaId);
    pageMode.value = true;
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
          <div class="h-full flex items-center pl-[2%]">
            <backword
              :pl="pageMode"
              :title="layout.size == 'small' ? '全部任务' : 'Back'"
              @click="back"
            />
          </div>
        </template>
        <template #center>
          <h1
            class="text-dark-900 whitespace-nowrap overflow-hidden te select-none text-xl font-bold"
          >
            {{ selectedTask?.title }}
          </h1>
        </template>
        <template v-slot:right>
          <div
            class="right px-1 w-full h-full md:pr-2 flex justify-end gap-[5px] items-center"
          >
            <div
              :class="listStype == 0 ? 'bg-light-600' : ''"
              class="iconWrap"
              @click="switchListStype(0)"
            >
              <img
                class="h-[30px] aspect-square"
                :src="messageListSvg"
                alt=""
              />
            </div>
            <div
              :class="listStype == 1 ? 'bg-light-600' : ''"
              class="iconWrap"
              @click="switchListStype(1)"
            >
              <img
                class="h-[30px] aspect-square"
                :src="fileList"
                alt=""
              />
            </div>

            <!-- <text class="cancel text-bold text-lg text-red-500 ">
          取消任务
        </text> -->

            <div class="relative center h-full">
              <svg
                class="icon w-[30px] aspect-square cursor-pointer"
                viewBox="0 0 1024 1024"
                @click="handleOpt"
                ref="icon"
              >
                <path
                  d="M213.333333 512a85.333333 85.333333 0 1 1-85.333333-85.333333 85.333333 85.333333 0 0 1 85.333333 85.333333z m298.666667-85.333333a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z m384 0a85.333333 85.333333 0 1 0 85.333333 85.333333 85.333333 85.333333 0 0 0-85.333333-85.333333z"
                  fill="#5C5C66"
                  p-id="6422"
                ></path>
              </svg>
            </div>
            <div
              class="p-1 bg-zinc-300 dark:bg-zinc-700 absolute top-[40px] right-0 z-20 rounded-lg text-[0.9em] trans text-dark-300"
              :class="!showOpt ? 'w-0' : 'w-24'"
              ref="opt"
              v-if="showOpt"
            >
              <div class="p-1 center" @click="deleteTask">
                <img
                  class="h-[1.2em] pr-2"
                  src="/icons/remove.svg"
                  alt="remove"
                />
                <p>删除</p>
              </div>
              <div class="h-[1px] bg-dark-800 opacity-20"></div>
              <div class="p-1 center" @click="retryTask">
                <img
                  class="h-[1.2em] pr-2"
                  :src="refreshSvg"
                  alt="remove"
                />
                <p>重试</p>
              </div>
            </div>
          </div>
        </template>
      </scrollHeader>
    </template>
    <template #content>
      <msgListView
        :style="{ display: listStype == 0 ? '' : 'none' }"
        v-if="selectedTask"
      />
      <FileListView
        :style="{ display: listStype == 1 ? '' : 'none' }"
        v-if="selectedTask"
      />
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
  flex-shrink: 0;
  cursor: pointer;
}
</style>