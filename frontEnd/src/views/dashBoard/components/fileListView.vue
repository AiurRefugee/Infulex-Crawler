<script setup>
import { useTaskStore } from "@/stores/tasks";
import { ref, computed, watch, onMounted, nextTick, provide } from "vue";
import msgGrid from "./msgGrid.vue";
import fileItem from './fileItem.vue'
const tasks = useTaskStore();
const topFiles = computed(() => tasks.topFiles);
const topTitle = computed(() => tasks.topTitle)
const filePaths = computed(() => tasks.filePaths)
const handleClick = (file) => {
    const { file_id, type } = file
    if (type != 'folder') {
        return
    }
    console.log(file_id)
    tasks.pushFilePath(file)
}

const back = () => {
    tasks.popFilePath()
}

const updateFile = (index) => {
    if (index == filePaths.value.length - 1) return
    tasks.updateFilePaths(index)
}

const resetFilePath = () => {
    tasks.resetFilePath()
}

onMounted(async () => {
    await nextTick()
})
</script>
<template>
    <div class="msgListView">
        <div class="min-h-8 px-4 flex justify-between items-center flex-wrap">
            <div
                class="title flex gap-2 text-dark-800 text-left overflow-hidden text-ellipsis font-bold"
            > 
                <text :class="!filePaths.length ? '' : 'opacity-50'" @click="resetFilePath">全部文件</text>
                <span :class="!filePaths.length ? '' : 'opacity-50'" class="fileTitleGap center"> > </span>
                <p 
                    v-for="(file, index) in filePaths" 
                    :key="file.file_id" 
                    class="text-dark-800 center"
                    @click="updateFile(index)"
                >
                    <span class="fileTitleGap px-2 center" v-if="index"> > </span>
                    <text class="fileTitle">{{ file?.name }}</text>
                    
                </p>
            </div>
            <!-- <button class="back" @click="back">Back</button> -->
        </div>
        <div class="h-full overflow-y-auto overflow-x-hidden">
            <msgGrid class="pt-2" :handleClick="handleClick">
                <template v-slot:list>
                    <fileItem v-for="file in topFiles" :key="file.file_id" :file="file" @click="handleClick(file)"/>
                </template>
            </msgGrid>
        </div>
    </div>

</template>
<style scoped lang="scss">
.msgListView { 
  height: calc(100%);
  overflow-y: auto;
  overflow-x: hidden;
}
.back {
    color: #f59305fa;
}
.fileTitle, .fileTitleGap {
    opacity: 50%;
    cursor: pointer;
}
.title {
    p, text {
        cursor: pointer;
        
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    @media(width < 500px) {
        p, text { 
            // max-width: 100px;
        }
    }
}
.title p:last-of-type .fileTitle {
    opacity: 100%;
}
</style>