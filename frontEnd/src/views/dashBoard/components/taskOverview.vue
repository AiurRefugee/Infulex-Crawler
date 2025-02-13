<script setup>
import { ref, computed, onMounted } from "vue";
import loadImg from "@/components/common/loadImg.vue";
 
import loadingSvg from '@/assets/icons/loading.svg'
import finishedSvg from '@/assets/icons/finished.svg'
import errorSvg from '@/assets/icons/error.svg'
import refreshSvg from '@/assets/icons/refresh.svg'

const optW = computed(() => {
  if (props.slidingIndex == props.index) {
    return props.afterfixW;
  } else {
    return 0;
  }
});
const emit = defineEmits(["slideOpt"]);
const props = defineProps({
  task: {
    type: Object,
    Required: true,
  },
  slidingIndex: {
    type: Number,
    Required: true,
  },
  index: {
    type: Number,
    Required: true,
  },
  afterfixW: {
    type: Number,
    Required: true,
  },
});
const liWrap = ref(null);
const touchEvent = ref("");

const iconSrc = computed(() => {
  switch (props.task.status) {
    case "进行中":
      return loadingSvg
    case "已取消":
      return loadingSvg
    case "错误":
      return errorSvg
    case "已完成":
      return finishedSvg
    default:
      return ''
  }
})

const statusClas = computed( () => {
  switch (props.task.status) {
    case "进行中":
    case "已完成":
      return "text-green-400";
    case "已取消":
      return "text-gray-500";
    case "错误":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
})
</script>
<template>
  <div
    class="taskItemWrap flex justify-end items-center fastTrans mb-4 rounded-xl"
    @pointerdown="startCal"
  >
    <div
      class="taskOverview w-full taskHeight p-2 flex items-center flex-shrink-0 gap-4"
      ref="liWrap"
    >
      <!-- poster -->
      <div class="h-full flex-shrink-0 aspect-square object-cover rounded-lg">
        <loadImg :src="task?.backdropPath" />
      </div>

      <!-- overview -->
      <div class="overview w-full h-full flex flex-col justify-around">
        <div class="w-full h-1/3 flex justify-between items-center">
          <h1
            class="sm:taskTitle font-bold text-dark-900 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ task.title }}
          </h1>
          <div class="statusArea flex items-center gap-1">
            <img
              class="h-[1em] aspect-square"
              :class="task.status == '进行中' ? 'loading' : ''"
              :src="iconSrc"
            />
            <p
              class="status w-[3em] text-base whitespace-nowrap"
              :class="statusClas"
            >
              {{ task.status }}
            </p>
          </div>
        </div>

        <p
          class="h-1/3 text-[0.8em] flex items-center text-dark-800 opacity-50"
        >
          {{ task.mediaType == "tv" ? "TV Series" : "Movie" }}
        </p>
        <div class="h-1/3 flex justify-between items-center">
          <p
            class="flex items-center overflow-hidden text-[0.8em] text-ellipsis text-dark-200"
          >
            {{ task.createdAt }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="afterfix taskHeight center flex-shrink-0 overflow-hidden"
      :style="{
        width: `calc(min(12vh * 2, ${optW}px))`,
      }"
    >
      <div
        class="w-full h-full flex items-center relative bg-red-500 overflow-hidden"
      >
        <img
          draggable="false"
          class="optIcon"
          src="/icons/remove.svg"
          alt="remove"
          @click="remove"
        />
      </div>
      <div
        class="w-full h-full flex items-center relative bg-blue-500 overflow-hidden"
      >
        <img
          draggable="false"
          class="optIcon"
          :src="refreshSvg"
          alt="remove"
          @click="remove"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/color.scss";
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  90% {
    transform: rotate(300deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
$borderW: 4px;
$borderColor: rgba(118, 118, 118, 0.3);
.taskHeight {
  height: max(12vh, 80px);
}
.taskItemWrap {
  border: $borderW solid transparent;
}
.liItem {
  height: max(12vh, 100px);
}
.taskOverview > * {
  touch-action: v-bind(touchEvent);
}
.loading {
  animation: loading 2s infinite linear;
}
.overview {
  font-size: 18px;
}
.taskTitle {
  max-width: 6em;
}
.optIcon {
  $size: 5vh;
  width: $size;
  min-width: $size;
  aspect-ratio: 1;
  position: absolute;
  left: max(3vh, calc(100% - $size) / 2);
}
</style>