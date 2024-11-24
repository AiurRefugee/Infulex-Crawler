<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import backword from "@/components/common/backword.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { layoutStore } from "@/stores/layout";
import { computed } from "vue";
const layout = layoutStore();

const size = computed(() => {
  return layout.size;
});
const props = defineProps({
  task: {
    type: Object,
    Required: true,
  },
});
</script>
<template>
  <scrollHeader>
    <template v-slot:left>
      <backword :title="'全部任务'" v-if="size == 'small'" />
      <h1
        class="h-full pl-4 flex items-center txtDarkPrimary select-none text-xl font-bold whitespace-nowrap"
        v-else
      >
        <div class="status">
          <div class="h-[2vh] aspect-square loading rounded-full" src="@/assets/icons/loading.svg" v-if="task?.status === '进行中'"></div>
          <img class="h-[2vh] aspect-square" src="@/assets/icons/canceled.svg" v-if="task?.status === '已取消'"/>
          <img class="h-[2vh] aspect-square" src="@/assets/icons/error.svg" v-if="task?.status === '错误'"/> 
        </div>
        <text>{{ task?.title }}</text>
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
      <div class="right pr-4 h-full flex justify-end items-center gap-6 pr-2">
        <img
          class="h-[30px] aspect-square"
          src="@/assets/icons/messageList.svg"
          alt=""
        />
        <img
          class="h-[30px] aspect-square"
          src="@/assets/icons/fileList.svg"
          alt=""
        />
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
</style>