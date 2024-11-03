<script setup>
import { ref, computed } from "vue";
import { taskStore } from "@/stores/tasks";
import liItem from "@/components/common/liItem.vue";
import gsap from "gsap";
import { layoutStore } from "@/stores/layout";
import { useRouter } from "vue-router";
const router = useRouter()
const tasks = taskStore();
const layout = layoutStore()
const size = computed(() => layout.size);

const imgPrefix = "https://image.tmdb.org/t/p/original";
const emit = defineEmits(['slideOpt'])
const props = defineProps({
  task: Object,
  required: true,
});
const liWrap = ref(null);
const afterfixW = ref(0)
const touchEvent = ref('')

let start

const maxWidthRate = 0.7
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
}

const slideOpt = (value) => {
  emit("slideOpt", value);
  touchEvent.value = value ? 'none' : ''
}

function calmove(event) { 
  event.preventDefault();
  // li.setPointerCapture(event.pointerId);
  const current = event.clientX;
  const diff = Math.max(start - current, 0);
  const maxW = liWrap.value.clientWidth * maxWidthRate;
  afterfixW.value = Math.min(diff, maxW); 
}

const setTask = () => {
  tasks.setCurrentTask(props.task)
  if (size.value == 'small') {
    layout.setTabIconVisible(false)
  }
  router.push('/dashBoard/taskDetail')
}

const slideStart = (event) => {
 
  console.log(event);
  event.preventDefault();

  setTask()
  start = event.clientX;
  slideOpt(true);
  

  const li = event.target 

  document.onpointerup = () => {
    slideOpt(false)
    document.onpointermove = null;
    document.onpointerup = null
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
  <div class="taskItemWrap bgLightSecondary rounded-lg overflow-hidden">
    <liItem :liClassName="'liItem'" :afterfixW="afterfixW">
      <template v-slot:content>
        <div class="taskOverview h-full center p-3" ref="liWrap"> 
            <!-- poster -->
            <div class="poster h-full aspect-square center">
              <img
                :src="imgPrefix + task.poster_path"
                alt="poster"
                class="h-full aspect-square object-cover rounded-lg"
              />
            </div>
            <!-- overview -->
            <div class="overview w-4/5 h-full pl-4 flex flex-col justify-around"> 
                <div class="h-1/3 flex justify-between items-center">
                  <h1 class="text-[1.1em] font-bold txtDark_Primary whitespace-nowrap overflow-hidden text-ellipsis">{{ task.title }}</h1>  
                  <div class="statusArea h-full flex items-center gap-1">
                    <img class="h-[2vh] aspect-square loading" src="@/assets/icons/loading.svg" v-if="task.status === '进行中'"/>
                    <img class="h-[2vh] aspect-square" src="@/assets/icons/canceled.svg" v-if="task.status === '已取消'"/>
                    <img class="h-[2vh] aspect-square" src="@/assets/icons/error.svg" v-if="task.status === '错误'"/>
                    <p class="status w-[3em] text-base whitespace-nowrap" :class="calStatusClass()">{{ task.status }}</p>
                  </div>
                </div>
                <p class="h-1/3 txtDark_Basic opacity-50"> getLink</p>
                <p class="h-1/3 max-w-[200px] overflow-hidden text-ellipsis txtDark_Basic">{{ task.msgs?.[0]?.data }}</p> 
            </div> 
        </div>
      </template>
    </liItem>
  </div>
</template>
<style scoped lang="scss"> 
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
.overview>* {
  // touch-action: none;
}
.liItem {
  height: max(12vh, 100px);
}
.taskOverview>*{
  touch-action: v-bind(touchEvent);
}
.taskItemWrap { 
  margin-bottom: 1.2rem;
}
.loading {
  animation: loading 2s infinite linear;
}
.overview {
  font-size: 18px;
}
@media (width > 1440px) {
  .overview {
    // font-size: 24px;
  }
}
</style>