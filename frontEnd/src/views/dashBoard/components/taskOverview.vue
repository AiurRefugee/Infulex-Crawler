<script setup>
import { ref, computed } from "vue";
import { useTaskStore } from "@/stores/tasks";
import liItem from "@/components/common/liItem.vue";
import loadImg from "@/components/common/loadImg.vue";
import gsap from "gsap";
import { layoutStore } from "@/stores/layout";
import { useRouter } from "vue-router";
const router = useRouter();
const tasks = useTaskStore();
const layout = layoutStore();
const size = computed(() => layout.size); 

const imgPrefix = "https://image.tmdb.org/t/p/original";
const emit = defineEmits(["slideOpt"]);
const props = defineProps({
  task: Object,
  required: true,
});
const liWrap = ref(null);
const afterfixW = ref(0);
const touchEvent = ref("");

let start;

const maxWidthRate = 0.7;
const calStatusClass = () => {
  switch (props.task.status) {
    case "进行中":
      return "text-green-400";
    case "已取消":
      return "text-gray-500";
    case "错误":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const slideOpt = (value) => {
  emit("slideOpt", value);
  touchEvent.value = value ? "none" : "";
};

function calmove(event) {
  event.preventDefault();
  // li.setPointerCapture(event.pointerId);
  const current = event.clientX;
  const diff = Math.max(start - current, 0);
  const maxW = liWrap.value.clientWidth * maxWidthRate;
  afterfixW.value = Math.min(diff, maxW);
}

const setTask = () => {
  tasks.setCurrentTask(props.task);
  if (size.value == "small") {
    layout.setTabIconVisible(false);
  }
  router.push("/dashBoard/taskDetail");
};

const slideStart = (event) => {
  console.log(event);
  event.preventDefault();

  setTask();
  start = event.clientX;
  slideOpt(true);

  const li = event.target;

  document.onpointerup = () => {
    slideOpt(false);
    document.onpointermove = null;
    document.onpointerup = null;
    if (afterfixW.value > 20) {
      gsap.to(afterfixW, {
        value: 50,
        duration: 0.5,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(afterfixW, {
        value: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  };
};
</script>
<template>
  <div class="taskItemWrap fastTrans mb-4 rounded-xl overflow-hidden">
    <liItem :liClassName="'liItem'" :afterfixW="afterfixW">
      <template v-slot:content>
        <div class="taskOverview h-full flex items-center gap-4 p-2" ref="liWrap">
          <!-- poster -->
           <div class="h-full flex-shrink-0 aspect-square object-cover rounded-lg">
            <loadImg :src="task?.backdropPath" /> 
           </div>
           
          <!-- overview -->
          <div class="overview w-full h-full flex flex-col justify-around">
            <div class="w-full h-1/3 flex justify-between items-center">
              <h1
                class="title text-[1.2em] font-bold text-dark-900 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {{ task.title }}
              </h1>
              <div class="statusArea flex items-center gap-1">
                <img
                  class="h-[1em] aspect-square loading"
                  src="/icons/loading.svg"
                  v-if="task.status === '进行中'"
                />
                <img
                  class="h-[1em] aspect-square"
                  src="/icons/canceled.svg"
                  v-if="task.status === '已取消'"
                />
                <img
                  class="h-[1em] aspect-square"
                  src="/icons/error.svg"
                  v-if="task.status === '错误'"
                />
                <p
                  class="status w-[3em] text-base whitespace-nowrap"
                  :class="calStatusClass()"
                >
                  {{ task.status }}
                </p>
              </div>
            </div>

            <p 
              class="h-1/3 flex items-center text-dark-800 opacity-50"
            >{{ task.mediaType == 'tv' ? 'TV Series' : 'Movie' }}</p>
            <p
              class="h-1/3 flex items-center overflow-hidden text-[0.8em] text-ellipsis text-dark-200"
            >
              {{ task.createdAt }}
            </p>
          </div>
        </div>
      </template>
    </liItem>
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
.selected {
  @extend .bg-light-800;
  // border: $borderW solid $borderColor !important;  
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
.title {
  max-width: 6em;
}
@media (width > 1440px) {
  .overview {
    // font-size: 24px;
  }
}
</style>