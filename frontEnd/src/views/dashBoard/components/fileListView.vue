<script setup>
import { useTaskStore } from "@/stores/tasks";
import { ref, computed, watch, onMounted, nextTick, provide } from "vue";
import fileMsg from "./fileMsg.vue";
import fileItem from './fileItem.vue'
const tasks = useTaskStore();
const topFiles = computed(() => tasks.topFiles);
const topTitle = computed(() => tasks.topTitle)

const handleClick = (file) => {
    const { file_id } = file
    console.log(file_id)
    tasks.pushFilePath(file)
}

const back = () => {
    tasks.popFilePath()
}

onMounted(async () => {
    await nextTick()
})
</script>
<template>
    <div class="msgListView">
        <div class="min-h-8 px-4 flex justify-between items-center flex-wrap">
            <p class="title text-dark-800 text-left overflow-hidden text-ellipsis font-bold">{{ topTitle }}</p>
            <button class="back" @click="back">Back</button>
        </div>
        <div class="h-full overflow-y-auto overflow-x-hidden">
            <fileMsg class="px-4 pt-2" :handleClick="handleClick">
                <template v-slot:list>
                    <fileItem v-for="file in topFiles" :key="file.file_id" :file="file" @click="handleClick(file)"/>
                </template>
            </fileMsg>
        </div>
    </div>

</template>
<style scoped>
.msgListView { 
  height: calc(100% - 120px);
}
.back {
    color: #f59305fa;
}
</style>