<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import backword from "@/components/common/backword.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { useTaskStore } from "@/stores/tasks";
import { layoutStore } from "@/stores/layout";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const tasks = useTaskStore();
const layout = layoutStore();

const size = computed(() => layout.size);
const showBack = computed(() => {
  const { path } = route;
  console.log(path);
  return path.includes('taskDetail') || size.value == 'small'
});
const props = defineProps({
  task: {
    type: Object,
    Required: true,
  },
});

const listStype = defineModel('listStype')

const switchListStype = (type) => {
  tasks.switchListStype(type);
}

</script>
<template>
  <scrollHeader class="h-[50px]">
    <template v-slot:left>
      <backword :title="'全部任务'" v-if="size == 'small'" />
      <h1
        class="h-full pl-4 flex items-center txtDarkPrimary select-none text-xl font-bold whitespace-nowrap"
        v-else
      >
        <backword :title="'全部任务'" v-if="showBack" @click="router.go(-1)" />
        <text v-else>{{ task?.title }}</text>
        <!-- <div class="opt ml-8 text-bold text-sm text-red-500 cursor-pointer" v-if="task?.status === '进行中'">取消任务</div> -->
      </h1>
    </template>
    <template v-slot:center>
      <h1
        class="txtDarkPrimary select-none text-xl font-bold"
        v-if="size == 'small'"
      >
        {{ task?.title }}
      </h1>
    </template>
    <template v-slot:right>
      <div class="right pr-4 w-full h-full flex justify-end items-center gap-4">
        <div :class="listStype == 0 ? 'bg-light-500' : ''" class="iconWrap" @click="switchListStype(0)">
          <img
            class="h-[30px] aspect-square"
            src="@/assets/icons/messageList.svg"
            alt=""
          />
        </div>
        <div :class="listStype == 1 ? 'bg-light-500' : ''" class="iconWrap" @click="switchListStype(1)">
          <img
            class="h-[30px] aspect-square"
            src="@/assets/icons/fileList.svg"
            alt=""
          />
        </div>
        
        <!-- <text class="cancel text-bold text-lg text-red-500 ">
          取消任务
        </text> -->
      </div>
    </template>
  </scrollHeader>
</template>
<style scoped lang="scss">
.right>* {
  cursor: pointer;
}
.status {
  margin-right: 0.5rem;
}
.loading {
  $size: 40%;
  background: radial-gradient(circle at center, #09d012 $size, #8ef996 $size, transparent 100%);
}
@media (width >= 1080px) {
  .navWrap {
    display: none;
  }
}
.selected {
  background-color: rgba(128, 128, 128, 0.21);
}
.iconWrap {
  border-radius: 6px;
  padding: 2px;
}
</style>