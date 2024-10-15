<script setup>
import liItem from "@/components/common/liItem.vue";
const imgPrefix = "https://image.tmdb.org/t/p/original";
const props = defineProps({
  task: Object,
  required: true,
});

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
</script>
<template>
  <div class="taskItemWrap bgLightSecondary rounded-lg overflow-hidden">
    <liItem :liClassName="'h-[10vh]'">
      <template v-slot:content>
        <div class="taskOverview h-full center p-3"> 
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
                <div class="h-1/4 flex justify-between items-center">
                  <h1 class="text-[1.1em] font-bold txtDark_Primary whitespace-nowrap overflow-hidden text-ellipsis">{{ task.title }}</h1>  
                  <div class="statusArea w-[4rem] h-full flex justify-between items-center gap-2">
                    <img class="h-2/3 aspect-square loading" src="@/assets/icons/loading.svg" v-if="task.status === '进行中'"/>
                    <img class="h-2/3 aspect-square" src="@/assets/icons/canceled.svg" v-if="task.status === '已取消'"/>
                    <img class="h-2/3 aspect-square" src="@/assets/icons/error.svg" v-if="task.status === '错误'"/>
                    <p class="status font-bold whitespace-nowrap" :class="calStatusClass()">{{ task.status }}</p>
                  </div>
                </div>
                <p class="type txtDark_Secondary"> getLink</p>
                <p class="max-w-[200px] overflow-hidden text-ellipsis">{{ task.msgs?.[0] }}</p> 
            </div> 
        </div>
      </template>
    </liItem>
  </div>
</template>
<style scoped lang="scss">
.poster {
  // aspect-ratio: 4/5;
} 
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
.taskItemWrap { 
  margin-bottom: 1.5rem;
}
.loading {
  animation: loading 2s infinite linear;
}
</style>