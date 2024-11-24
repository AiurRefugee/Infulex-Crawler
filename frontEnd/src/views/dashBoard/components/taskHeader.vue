<script setup>
import scrollView from "@/viewComponents/scrollView.vue";
import backword from "@/components/common/backword.vue";
import scrollHeader from "@/components/common/scrollHeader.vue";
import { layoutStore } from "@/stores/layout";
import { ref, computed } from "vue";
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

const listStype = defineModel('listStype')

</script>
<template>
  <scrollHeader class="h-[50px]">
    <template v-slot:left>
      <backword :title="'全部任务'" v-if="size == 'small'" />
      <h1
        class="h-full pl-4 flex items-center txtDarkPrimary select-none text-xl font-bold whitespace-nowrap"
        v-else
      >
        <!-- <div class="status">
          <div class="h-[2vh] aspect-square loading rounded-full" src="@/assets/icons/loading.svg" v-if="task?.status === '进行中'"></div>
          <img class="h-[2vh] aspect-square" src="@/assets/icons/canceled.svg" v-if="task?.status === '已取消'"/>
          <img class="h-[2vh] aspect-square" src="@/assets/icons/error.svg" v-if="task?.status === '错误'"/> 
        </div> -->
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
      <div class="right pr-4 w-full h-full flex justify-end items-center gap-4">
        <div :class="listStype == 0 ? 'selected' : ''" class="iconWrap" @click="listStype = 0">
          <img
            class="h-[30px] aspect-square"
            src="@/assets/icons/messageList.svg"
            alt=""
          />
        </div>
        <div :class="listStype == 1 ? 'selected' : ''" class="iconWrap" @click="listStype = 1">
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
  border-radius: 8px;
  padding: 5px;
}
</style>