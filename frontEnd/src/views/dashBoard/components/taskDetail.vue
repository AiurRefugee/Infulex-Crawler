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

onMounted(() => {
  const { mediaType, mediaId } = route.params;
  if (mediaType && mediaId) {
    taskStore.getTaskDetail(mediaType, mediaId);
  }

  if (showBack.value) {
    layout.setTabIconVisible(false);
  }
});
</script>
<template>
  <scrollView>
    <template #header>
      <scrollHeader class="h-[50px]">
        <template v-slot:left>
          <div class="h-full flex items-center pl-4">
            <backword :title="'全部任务'" v-if="showBack" @click="router.go(-1)" />
            <text class="text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis" v-else>{{
              selectedTask?.title }}</text>
          </div>
        </template>
        <template v-slot:center>
          <h1 v-if="showBack"
            class="text-dark-900 select-none text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
            {{ selectedTask?.title }}
          </h1>
        </template>
        <template v-slot:right>
          <div class="right pr-4 w-full h-full flex justify-end items-center gap-4">
            <div :class="listStype == 0 ? 'bg-light-500' : ''" class="iconWrap" @click="switchListStype(0)">
              <img class="h-[30px] aspect-square" src="@/assets/icons/messageList.svg" alt="" />
            </div>
            <div :class="listStype == 1 ? 'bg-light-500' : ''" class="iconWrap" @click="switchListStype(1)">
              <img class="h-[30px] aspect-square" src="@/assets/icons/fileList.svg" alt="" />
            </div>

            <!-- <text class="cancel text-bold text-lg text-red-500 ">
          取消任务
        </text> -->
          </div>
        </template>
      </scrollHeader>
    </template>
    <template #content>
      <msgListView :style="{ display: listStype == 0 ? '' : 'none' }" />
      <FileListView :style="{ display: listStype == 1 ? '' : 'none' }" />
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